import PageContainer from '../../common/PageContainer';
import { useAuth } from '../../common/AuthContext';
import { useState } from 'react';
import { CardContainer } from '../../styles/styles';
import Error from '../../common/Error';
import ReceivedInfo from './receivedInfo';
import GameCard from '../../common/GameCard';
import { useWebSocket } from '../../common/useWebsocket';

const MultiPlayerGame = () => {
    const { token, userName } = useAuth();
    const { stompClientRef, isJoined, receivedMessage, errorR } = useWebSocket();
    const [ wantToPlayWithFriend, setWantToPlayWithFriend] = useState();

    const joinGame = (numOfPairs, wantToPlayWithFriend, friendRoomId) => {
        setWantToPlayWithFriend(wantToPlayWithFriend);
        const message = {
            token: token,
            numOfPairs: numOfPairs,
            wantToPlayWithFriend: wantToPlayWithFriend,
            friendRoomId: friendRoomId
        };
        stompClientRef.current.send('/app/game.join', {}, JSON.stringify(message));
    };

    const handleOnCardClicks = ({index}) => {
        if(receivedMessage.turn===userName && receivedMessage.gameStarted) {
            const message = {
                senderToken: token,
                index: index,
                gameId: receivedMessage.gameId,
            };
            stompClientRef.current.send('/app/game.move', {}, JSON.stringify(message));
        }
    }

    const leaveGame = () => {
        const message = {
            token: token,
        };
        stompClientRef.current.send('/app/game.leave', {}, JSON.stringify(message));
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
        <PageContainer>
            <ReceivedInfo 
                receivedInfo={receivedMessage} 
                leaveGame={leaveGame} 
                joinGame={joinGame} 
                wantToPlayWithFriend={wantToPlayWithFriend}
            /> 
            {isJoined && receivedMessage && 
                <CardContainer $pairs={parseInt(receivedMessage.board.length/2)}>
                    {receivedMessage.board.map((num, index) => (
                        <GameCard 
                            key={index} 
                            index={index} 
                            num={getNum(num, index)} 
                            handleOnCardClicks={handleOnCardClicks} 
                            pairs={parseInt(receivedMessage.board.length/2)}
                            isClickable={true}
                            isActive={isActiveCard(index)}
                        />
                    ))}
                </CardContainer>
            }
            <Error>{errorR}</Error>
        </PageContainer>
    )
}

export default MultiPlayerGame;