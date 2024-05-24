import React, { createContext, useContext, useEffect, useRef, useState, useCallback} from 'react';
import Stomp from 'stompjs';
import { LINK, MULTYPLAYERMODES, PLAY } from '../config';
import { useLocation } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { useAuth } from './AuthContext';

/** Context for managing WebSocket connections and messages. */
const WebSocketContext = createContext(null);

/**
 * Provider component for WebSocket connections.
 * @param {Object} children - Components wrapped by WebSocketProvider.
 * @returns {JSX.Element} - WebSocketProvider component.
 */
export const WebSocketProvider = ({ children }) => {
    /** Received WebSocket messages */
    const [receivedMessage, setReceivedMessage] = useState(null);
    /** WebSocket connection status */
    const [isConnected, setConnected] = useState(false);
    /** Indicates if joined a WebSocket game */
    const [isJoined, setJoined] = useState(false);
    /** Indicates if subscribed to WebSocket topics */
    const [subscribed, setSubscribed] = useState(false);
    /** WebSocket error message */
    const [errorR, setErrorR] = useState(null);
    /** Reference to the STOMP client */
    const stompClientRef = useRef(null);
    /** Session ID for WebSocket connection */
    const sessionId = useRef(null);
   
    /** Subscription to game-related WebSocket topic */
    const subscriptionToGame = useRef(null);
    /** Subscription to WebSocket state topic */
    const subscriptionToState = useRef(null);

    /** Current URL location */
    const location = useLocation();
    /** Authentication status and user ID */
    const {isAuthenticated, userId} = useAuth();

    const topicGameState = '/topic/game.state';

    /**
     * Callback function to handle incoming WebSocket messages.
     * This function parses incoming messages and updates state variables accordingly.
     * @param {Object} message - Message received from the WebSocket server.
     */
    const onMessage = useCallback((message) => {
            const parsedMessage = JSON.parse(message.body);
            if(parsedMessage.type==="error") {
                if(parsedMessage.player1===userId) {
                    setErrorR(parsedMessage.content);
                }
            } else {
                setErrorR(null);
                if(userId===parsedMessage.player1 || userId===parsedMessage.player2) {
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
            }
        }, [userId]);

    /**
     * Function to subscribe to a WebSocket topic.
     * This function subscribes to a specified topic and assigns the subscription to the appropriate ref.
     * @param {string} topic - Topic to subscribe to.
     */
    const subscribeToTopic = useCallback((topic) => {
        const subscription = stompClientRef.current.subscribe(topic, (message) => onMessage(message))
        if(topic==="/topic/game." + sessionId.current) {
            subscriptionToGame.current = subscription;
        }
        if(topic===topicGameState) {
            subscriptionToState.current = subscription;
        }
    }, [ onMessage ]);

    /**
     * Effect hook to manage WebSocket connections and subscriptions.
     * Connect to WebSocket server, subscribe to topics, and handle disconnections
     * Update state variables based on WebSocket connection status and received messages
     */
    useEffect(() => {
        if(isAuthenticated) {
            if(location.pathname===PLAY + "/" + MULTYPLAYERMODES && !isConnected) {
                const url = LINK + '/ws';
                const socket = new SockJS(url);
                const stompClient = Stomp.over(socket);
                setConnected(true);
                stompClient.connect({}, () => {
                    stompClientRef.current = stompClient;
                    subscribeToTopic(topicGameState);
                }, error => {
                    setErrorR('Error connecting to STOMP broker:' + error);
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
         isAuthenticated, receivedMessage])

    return (
        <WebSocketContext.Provider value={{ stompClientRef, isConnected, isJoined, receivedMessage, errorR }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => useContext(WebSocketContext);