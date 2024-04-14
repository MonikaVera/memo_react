import { useState } from 'react';
import { useAuth } from '../../common/AuthContext';
import Card from '../sp-game-page/Card';
import { CardContainer } from '../sp-game-page/styles';
import { Navigate, useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { LINK, MULTYPLAYERMODES, PLAY } from '../../config';
import PageContainer from '../../common/PageContainer';

const MultiPlayerGamePage = () => {
    const { pairs, gameId} = useParams();
    const topicGamePlay = "/topic/game." + gameId;
    const { token } = useAuth();
    const [receivedMessage, setReceivedMessage] = useState();
    const [isJoined, setJoined] = useState(false);
    const url = LINK + '/ws';

    const socket = new SockJS(url);
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
        console.log('Connected to STOMP broker');
        stompClient.subscribe(topicGamePlay, message => {
            const parsedMessage = JSON.parse(message.body);
            if(parsedMessage.type==='game.left') {
                setJoined(false);
            }

            if (topicGamePlay==="/topic/game." + parsedMessage.gameId) {
                setReceivedMessage(parsedMessage);
            }

        });
    }, error => {
        console.error('Error connecting to STOMP broker:', error);
    });


    const handleOnCardClicks = ({index}) => {
        console.log(index);
        const message = {
            senderToken: token,
            index: index,
            gameId: receivedMessage.gameId,
        };
        stompClient.send('/app/game.move', {}, JSON.stringify(message));
    }

    const leaveGame = () => {
        const message = {
            token: token,
        };
        stompClient.send('/app/game.leave', {}, JSON.stringify(message));
    }

    function isActiveCard(index) {
        let isActive = false;
        const lastMove = receivedMessage.lastMove;
        if (lastMove!==null && (index.toString() in lastMove)) {
            isActive = true;
        }
        return isActive;
    }

    function getNum(num, index) {
        if(num!==null) {
            return num;
        }
        const lastMove = receivedMessage.lastMove;
        if(lastMove!==null && lastMove.hasOwnProperty(index.toString())) {
            return lastMove[index.toString()];
        }
        return null;
    }

    return (
        isJoined ?  
        <PageContainer>
            <button onClick={() => leaveGame()}>Leave</button>
            {receivedMessage && 
                <div>
                    <div>{JSON.stringify(receivedMessage)}</div>
                    <CardContainer $pairs={parseInt(pairs)}>
                        {receivedMessage.board.map((num, index) => (
                            <Card 
                                key={index} 
                                index={index} 
                                num={getNum(num, index)} 
                                handleOnCardClicks={handleOnCardClicks} 
                                pairs={parseInt(pairs)}
                                isClickable={true}
                                isActive={isActiveCard(index)}
                            />
                        ))}
                    </CardContainer>         
                </div>
            }  
        </PageContainer>
        :
        <Navigate to={PLAY + '/' + MULTYPLAYERMODES}/>
    )
}

export default MultiPlayerGamePage;