import { useEffect } from 'react';
import SockJS from 'sockjs-client';
import { useRef } from 'react';

function useWebSocket(url, onMessage) {
    const socketRef = useRef(null);
    useEffect(() => {
      const socket = new SockJS(url);
      socketRef.current = socket;
  
      // Connection opened
      socket.onopen = function() {
        console.log('WebSocket connection opened');
      };
  
      // Listen for messages
      socket.onmessage = onMessage;
  
      // Cleanup on component unmount
      return () => {
        socket.close();
        console.log('WebSocket connection closed');
      };
    }, [url, onMessage]);

    // Function to send a message over the WebSocket connection
    const sendMessage = (message) => {
        if (socketRef.current && socketRef.current.readyState === SockJS.OPEN) {
            socketRef.current.send(JSON.stringify(message));
        } else {
            console.error('WebSocket connection is not open');
        }
    };

    // Function to join a game
    const joinGame = (numOfPairs) => {
        sendMessage({ action: 'join_game', data: numOfPairs  });
    };

    // Function to leave a game
    const leaveGame = () => {
        sendMessage({ action: 'leave_game' });
    };

    // Function to make a move
    const makeMove = (moveData) => {
        sendMessage({ action: 'make_move', data: moveData });
    };

    const sendTestMessage = (testData) => {
        sendMessage({ action: '/game.test', data: testData });
    };

    return { joinGame, leaveGame, makeMove, sendTestMessage };
}
  
export default useWebSocket;