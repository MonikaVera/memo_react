/*import PageContainer from "../../common/PageContainer";
//import useMultiPlayerStart from "./useMultiPlayerStart";
//import useWebSocket from "./useWebSocket";
import {LINK} from "../../config";
import SockJsClient from 'react-stomp';
import { useState, useRef } from "react";

const MultiPlayerOptions = () => {
    const stompClientRef = useRef(null);
    /*const { getmultiPlayerStart } = useMultiPlayerStart();
    const handleOptionSelect = (newPairs) => {
        getmultiPlayerStart(newPairs);
    };
    
    const handleMessage = (event) => {
        console.log('Message from server ', event.data);
        // Do something with the received message
    };
    const { sendTestMessage, joinGame } = useWebSocket(LINK + '/ws', handleMessage);
    const handleJoinGame = (num) => {
        joinGame(num);
    };
    
    useWebSocket(LINK + '/ws', handleMessage);
    

    const [connected, setConnected] = useState(true);
    const [playerName, setPlayerName] = useState('');

    const onMessage = (msg) => {
        if (msg && msg.body) {
            console.log('Received message:', msg.body);
            // Assuming msg.body contains the data you're interested in
            const data = JSON.parse(msg.body);
            // Now you can access properties or process data
            // Example:
            console.log('Player:', data.player);
            console.log('Number of pairs:', data.numOfPairs);
        } else {
            console.log('Received invalid message:', msg);
        }
        
    };

    const onError = (err) => {
        console.error('Error:', err);
    };

    const connectHandler = () => {
        setConnected(true);
    };

    const disconnectHandler = () => {
        setConnected(false);
    };

    const joinGame = () => {
        const message = {
            player: playerName,
            numOfPairs: 8
        };
        stompClientRef.current.sendMessage('/app/game.join', JSON.stringify(message));
    };

    

    
    return (
        <PageContainer>Hi honey!
            <input type="text" value={playerName} onChange={(e) => setPlayerName(e.target.value)} />
            <button onClick={connectHandler} disabled={connected}>Connect</button>
            <button onClick={disconnectHandler} disabled={!connected}>Disconnect</button>
            <button onClick={joinGame} disabled={!connected}>Join Game</button>
            <SockJsClient 
                topics={['/topic/game.state']}
                ref={stompClientRef}
                url={LINK + '/ws'}
                onMessage={(msg) => onMessage(msg)}
                onError={onError}
                debug={true} />
        </PageContainer>
    )
}

export default MultiPlayerOptions;
*/


import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { LINK } from '../../config';
import PageContainer from '../../common/PageContainer';
import { useAuth } from '../../common/AuthContext';
import { useCallback, useEffect, useState, useRef } from 'react';
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
    const stompClientRef = useRef(null);

    useEffect(() => {
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
    }, []);


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


    useEffect(() => {
        if(isConnected && topicGamePlay!==null) {
            subscribeToTopic(topicGamePlay);
        }
        if(receivedMessage && receivedMessage.gameOver) {
            setJoined(false);
        }
        
    }, [topicGamePlay, subscribeToTopic, isConnected, receivedMessage]);
   

    const joinGame = (numOfPairs) => {
        setPairs(8);
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
            {(receivedMessage && receivedMessage.gameOver) &&
                <div>Winner: {receivedMessage.winner}</div>
            }
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
                        <div>Players:</div>
                        <div>{receivedMessage.player1Name}</div>
                        <div>{receivedMessage.player2Name}</div>
                        <div>{receivedMessage.turn}'s turn</div>
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