import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { LINK } from '../../config';
import PageContainer from '../../common/PageContainer';
import { useAuth } from '../../common/AuthContext';
import { useCallback, useEffect, useState, useRef } from 'react';
import { CardContainer } from '../../styles/styles';
import { useInit } from './useInit';
import ReceivedInfo from './receivedInfo';
import GameCard from '../../common/GameCard';

const MultiPlayer = ({data}) => {
    const { token } = useAuth();
    const [receivedMessage, setReceivedMessage] = useState();
    const [pairs, setPairs] = useState();
    const topicGameState = '/topic/game.state';
    const [isConnected, setIsConnected] = useState(false);
    const [isJoined, setJoined] = useState(false);
    const stompClientRef = useRef(null);
    const sessionId = useRef(null);
    const [subscribed, setSubscribed] = useState(false);
    const subscriptionToGame = useRef();

    const onMessage = useCallback((topic, message) => {
            const parsedMessage = JSON.parse(message.body);
            console.log(data);
            console.log(data.userId===parsedMessage.player1);
            console.log(data.userId===parsedMessage.player2);
            if(data!==null && (data.userId===parsedMessage.player1 || data.userId===parsedMessage.player2)) {
                if(parsedMessage.type==='game.left') {
                    setJoined(false);
                }
                if (parsedMessage.gameId===sessionId.current) {
                    setReceivedMessage(parsedMessage);
                }
                if (parsedMessage.gameId!==null && (parsedMessage.gameId)!==sessionId.current) {
                    sessionId.current=parsedMessage.gameId;
                }
            }
        }, [data]);

    const subscribeToTopic = useCallback((topic) => {
        const subscription = stompClientRef.current.subscribe(topic, (message) => onMessage(topic, message))
        if(topic==="/topic/game." + sessionId.current) {
            subscriptionToGame.current = subscription;
        }
    }, [ onMessage ]);

    useInit(() => {
        const url = LINK + '/ws';
        const socket = new SockJS(url);
        const stompClient = Stomp.over(socket);
        stompClient.connect({}, () => {
            console.log('Connected to STOMP broker');
            setIsConnected(true);
            stompClientRef.current = stompClient;
            subscribeToTopic(topicGameState);
        }, error => {
            console.error('Error connecting to STOMP broker:', error);
        });
    
        return () => {
            if (stompClientRef.current) {
                stompClientRef.current.disconnect();
            }
        };
    });

    useEffect(() => {
        if(isConnected && sessionId.current!==null && !subscribed) {
            setSubscribed(true);
            subscribeToTopic("/topic/game." + sessionId.current);
        }
        if(receivedMessage && receivedMessage.gameOver) {
            setJoined(false);
            setSubscribed(false);
            sessionId.current=null;
            subscriptionToGame.current.unsubscribe();
        }
        
    }, [ subscribeToTopic, isConnected, receivedMessage, subscribed]);
   

    const joinGame = (numOfPairs) => {
        setPairs(numOfPairs);
        setJoined(true);
        const message = {
            token: token,
            numOfPairs: numOfPairs
        };
        stompClientRef.current.send('/app/game.join', {}, JSON.stringify(message));
    };

    const handleOnCardClicks = ({index}) => {
        console.log(index);
        const message = {
            senderToken: token,
            index: index,
            gameId: receivedMessage.gameId,
        };
        stompClientRef.current.send('/app/game.move', {}, JSON.stringify(message));
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
            <ReceivedInfo receivedInfo={receivedMessage} leaveGame={leaveGame} joinGame={joinGame}/> 
            {isJoined && receivedMessage && 
                <CardContainer $pairs={parseInt(pairs)} $isSp={false}>
                    {receivedMessage.board.map((num, index) => (
                        <GameCard 
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

export default MultiPlayer;


/*

import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { LINK } from '../../config';
import PageContainer from '../../common/PageContainer';
import { useAuth } from '../../common/AuthContext';
import { useCallback, useEffect, useRef, useState } from 'react';
import Card from '../sp-game-page/Card';
import { CardContainer } from '../sp-game-page/styles';

const MultiPlayer = () => {
    const { token } = useAuth();
    const [receivedMessage, setReceivedMessage] = useState();
    const [pairs, setPairs] = useState();
    const url = LINK + '/ws';
    const topicGameState = '/topic/game.state';
    const [newGameId, setnewGameId] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isJoined, setJoined] = useState(false);

    const socket = new SockJS(url);
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
        console.log('Connected to STOMP broker');
        setIsConnected(true);
        subscribeToTopic(topicGameState);
    }, error => {
        console.error('Error connecting to STOMP broker:', error);
    });


    const subscribeToTopic = useCallback((topic) => {
        const onMessage = (message) => {
            const parsedMessage = JSON.parse(message.body);
            if(parsedMessage.type==='game.left') {
                setJoined(false);
            }
    
            if (parsedMessage.senderToken === token || topic==="/topic/game." + parsedMessage.gameId) {
                setReceivedMessage(parsedMessage);
            }
    
            if (parsedMessage.gameId && ("/topic/game." + parsedMessage.gameId)!==newGameId) {
                setnewGameId("/topic/game." + parsedMessage.gameId);
            }
        };

        stompClient.subscribe(topic, onMessage)
    }, [stompClient, token, newGameId]);


    useEffect(() => {
        if(isConnected && newGameId!==null) {
            stompClient.connect({}, () => { 
                subscribeToTopic(newGameId);
            }, error => {
                console.error('Error connecting to STOMP broker:', error);
            });
        }
        
    }, [newGameId, subscribeToTopic, isConnected, stompClient]);
   

    const joinGame = (numOfPairs) => {
        setPairs(8);
        setJoined(true);
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
        <PageContainer>
            {!isJoined ?
            <div>
                <button onClick={() => joinGame(8)}>Join Easy Game</button>
                <button onClick={() => joinGame(16)}>Join Medium Game</button>
                <button onClick={() => joinGame(24)}>Join Hard Game</button>  
            </div>
            :
            <div>
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
            </div>
            }
        </PageContainer>
    )
}

export default MultiPlayer;

*/