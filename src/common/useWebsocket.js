import React, { createContext, useContext, useEffect, useRef, useState, useCallback} from 'react';
import Stomp from 'stompjs';
import { LINK, MULTYPLAYERMODES, PLAY } from '../config';
import { useLocation } from 'react-router-dom';
import SockJS from 'sockjs-client';
import useUserInfo from './useUserInfo';
import { useAuth } from './AuthContext';

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
    const [receivedMessage, setReceivedMessage] = useState(null);
    const topicGameState = '/topic/game.state';
    const [isConnected, setConnected] = useState(false);
    const [isJoined, setJoined] = useState(false);
    const stompClientRef = useRef(null);
    const sessionId = useRef(null);
    const [subscribed, setSubscribed] = useState(false);
    const subscriptionToGame = useRef(null);
    const subscriptionToState = useRef(null);
    const errorR = useRef(null);
    const location = useLocation();
    const { error, data, getUserInfo } = useUserInfo();
    const {isAuthenticated} = useAuth();

    const onMessage = useCallback((message) => {
            const parsedMessage = JSON.parse(message.body);
            if(data.userId===parsedMessage.player1 || data.userId===parsedMessage.player2) {
                if(parsedMessage.type==='game.left') {
                    setJoined(false);
                }
                if(parsedMessage.type==='game.joined') {
                    setJoined(true);
                }
                if (parsedMessage.gameId!==null && (parsedMessage.gameId)!==sessionId.current) {
                    sessionId.current=parsedMessage.gameId;
                }
                if (parsedMessage.gameId===sessionId.current) {
                    setReceivedMessage(parsedMessage);
                }
            }
        }, [data]);

    const subscribeToTopic = useCallback((topic) => {
        const subscription = stompClientRef.current.subscribe(topic, (message) => onMessage(message))
        if(topic==="/topic/game." + sessionId.current) {
            subscriptionToGame.current = subscription;
        }
        if(topic===topicGameState) {
            subscriptionToState.current = subscription;
        }
    }, [ onMessage ]);

    useEffect(() => {
        if(isAuthenticated) {
            if(data===null) {
                getUserInfo();
            }
            if(error!=null) {
                errorR.current=error;
            }
            if(location.pathname===PLAY + "/" + MULTYPLAYERMODES && !isConnected) {
                const url = LINK + '/ws';
                const socket = new SockJS(url);
                const stompClient = Stomp.over(socket);
                setConnected(true);
                stompClient.connect({}, () => {
                    stompClientRef.current = stompClient;
                    subscribeToTopic(topicGameState);
                }, error => {
                    errorR.current = 'Error connecting to STOMP broker:' + error;
                });
            
                return () => {
                    if (stompClientRef.current) {
                        stompClientRef.current.disconnect();
                    }
                };
            }
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
            if(isConnected && location.pathname!==PLAY + "/" + MULTYPLAYERMODES) {
                if(subscriptionToGame.current!==null) {
                    subscriptionToGame.current.unsubscribe();
                }
                if(subscriptionToState.current!==null) {
                   subscriptionToState.current.unsubscribe(); 
                }
                stompClientRef.current.disconnect();
                setConnected(false);
                setReceivedMessage(null);
                setJoined(false);
                setSubscribed(false);
                sessionId.current=null;
            }
        }
    }, [subscribeToTopic, location.pathname, isConnected, subscribed,
        getUserInfo, data, isAuthenticated, receivedMessage, error])

    return (
        <WebSocketContext.Provider value={{ stompClientRef, isConnected, isJoined, receivedMessage, errorR }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => useContext(WebSocketContext);