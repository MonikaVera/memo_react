import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { LINK } from '../../config';
import PageContainer from '../../common/PageContainer';
import { useAuth } from '../../common/AuthContext';
import { useCallback, useEffect, useState } from 'react';
import Card from '../sp-game-page/Card';
import { CardContainer } from '../sp-game-page/styles';

const NewMultiPlayer = () => {
    const { token } = useAuth();
    const [receivedMessage, setReceivedMessage] = useState();
    const [pairs, setPairs] = useState();
    const url = LINK + '/ws';
    const [topics, setTopics] = useState(['/topic/game.state']);
    const [isConnected, setIsConnected] = useState(false);

    const socket = new SockJS(url);
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
        console.log('Connected to STOMP broker');
        setIsConnected(true);
    }, error => {
        console.error('Error connecting to STOMP broker:', error);
    });

    /*const sendMessage = (topic, message) => {
        stompClient.send(topic, {}, message);
    };*/
    const subscribeToTopic = useCallback((topic) => {
        stompClient.subscribe(topic, message => {
            console.log(`Received message on topic ${topic}:`, message.body);
            const parsedMessage = JSON.parse(message.body);

            if (parsedMessage.senderToken === token) {
                setReceivedMessage(parsedMessage);
            }

            if (parsedMessage.gameId) {
                if (!topics.includes("/topic/game." + parsedMessage.gameId)) {
                    setTopics(prevTopics => [...prevTopics, "/topic/game." + parsedMessage.gameId]);
                }
            }
        });
    }, [stompClient, token, topics]);


    useEffect(() => {
        if(isConnected) {
            stompClient.connect({}, () => { 
                topics.forEach(topic => subscribeToTopic(topic));
            }, error => {
                console.error('Error connecting to STOMP broker:', error);
            });
        }
        
    }, [topics, subscribeToTopic, isConnected, stompClient]);
   

    const joinGame = (numOfPairs) => {
        setPairs(8);
        const message = {
            token: token,
            numOfPairs: numOfPairs
        };
        stompClient.send('/app/game.join', {}, JSON.stringify(message));
    };

    const handleOnCardClicks = ({index}) => {
        console.log(index);
        const message = {
            senderToken: token,
            index: index,
            gameId: receivedMessage.gameId,
        };
        stompClient.send('/app/game.move', {}, JSON.stringify(message));
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
            <button onClick={() => joinGame(8)}>Join Easy Game</button>
            <button onClick={() => joinGame(16)}>Join Medium Game</button>
            <button onClick={() => joinGame(24)}>Join Hard Game</button>
            {receivedMessage && 
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
            }
        </PageContainer>
    )
}

export default NewMultiPlayer;