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

const MultiPlayer = () => {
    const { token } = useAuth();
    const [receivedMessage, setReceivedMessage] = useState();
    const [pairs, setPairs] = useState();
    const topicGameState = '/topic/game.state';
    const [topicGamePlay, setTopicGamePlay] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isJoined, setJoined] = useState(false);
    const stompClientRef = useRef(null);

    const subscribeToTopic = useCallback((topic) => {
        const onMessage = (message) => {
            const parsedMessage = JSON.parse(message.body);
            if(parsedMessage.type==='game.left') {
                setJoined(false);
            }
    
            if (parsedMessage.senderToken === token || topic==="/topic/game." + parsedMessage.gameId) {
                setReceivedMessage(parsedMessage);
            }
    
            if (parsedMessage.gameId && ("/topic/game." + parsedMessage.gameId)!==topicGamePlay) {
                setTopicGamePlay("/topic/game." + parsedMessage.gameId);
            }
        };

        stompClientRef.current.subscribe(topic, onMessage)
    }, [ token, topicGamePlay]);

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
        if(isConnected && topicGamePlay!==null) {
            subscribeToTopic(topicGamePlay);
        }
        if(receivedMessage && receivedMessage.gameOver) {
            setJoined(false);
        }
        
    }, [topicGamePlay, subscribeToTopic, isConnected, receivedMessage]);
   

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
    const [topicGamePlay, setTopicGamePlay] = useState(null);
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
    
            if (parsedMessage.gameId && ("/topic/game." + parsedMessage.gameId)!==topicGamePlay) {
                setTopicGamePlay("/topic/game." + parsedMessage.gameId);
            }
        };

        stompClient.subscribe(topic, onMessage)
    }, [stompClient, token, topicGamePlay]);


    useEffect(() => {
        if(isConnected && topicGamePlay!==null) {
            stompClient.connect({}, () => { 
                subscribeToTopic(topicGamePlay);
            }, error => {
                console.error('Error connecting to STOMP broker:', error);
            });
        }
        
    }, [topicGamePlay, subscribeToTopic, isConnected, stompClient]);
   

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