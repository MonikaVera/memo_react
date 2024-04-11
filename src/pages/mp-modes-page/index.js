import PageContainer from "../../common/PageContainer";
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
    
    useWebSocket(LINK + '/ws', handleMessage);*/
    

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

    /*const onConnect = () => {
        console.log('Connected to server');
        setConnected(true);
    };*/

    

    
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