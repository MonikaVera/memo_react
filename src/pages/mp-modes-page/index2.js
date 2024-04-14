import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { LINK } from '../../config';
import PageContainer from '../../common/PageContainer';
import { useAuth } from '../../common/AuthContext';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const NewMultiPlayer = () => {
    const { token } = useAuth();
    const [receivedMessage, setReceivedMessage] = useState();
    const [pairs, setPairs] = useState();
    const url = LINK + '/ws';
    const topicGameState = '/topic/game.state';
    const [topicGamePlay, setTopicGamePlay] = useState(null);
    //const [isJoined, setJoined] = useState(false);
    const navigate = useNavigate();
    //const socket = new SockJS(url);
    //const stompClient = Stomp.over(socket);
    const stompClientRef = useRef(null);

    useEffect(() => {
        const socket = new SockJS(url);
        const stompClient = Stomp.over(socket);
        stompClientRef.current = stompClient; 

        stompClient.connect({}, () => {
            console.log('Connected to STOMP broker');
            stompClient.subscribe(topicGameState, message => {
                console.log("sub here")
                const parsedMessage = JSON.parse(message.body);

                if (parsedMessage.senderToken === token) {
                    setReceivedMessage(parsedMessage);
                }

                if (parsedMessage.gameId && (parsedMessage.gameId)!==topicGamePlay) {
                    setTopicGamePlay(parsedMessage.gameId);
                }
            });
        }, error => {
            console.error('Error connecting to STOMP broker:', error);
        });

        return () => {
            if (stompClientRef.current) {
                stompClientRef.current.disconnect();
            }
        };
    }, [url, token, topicGameState, topicGamePlay]);

    const joinGame = (numOfPairs) => {
        setPairs(numOfPairs);
        const message = {
            token: token,
            numOfPairs: numOfPairs
        };
        stompClientRef.current.send('/app/game.join', {}, JSON.stringify(message));
    };

    useEffect(() => {
        if(receivedMessage && receivedMessage.senderToken === token) {
            console.log("Why")
            navigate(`${pairs}/${receivedMessage.gameId}`);
        }
    }, [navigate, token, pairs, receivedMessage])

    return (
        <PageContainer>
            
            <div>
                <button onClick={() => joinGame(8)}>Join Easy Game</button>
                <button onClick={() => joinGame(16)}>Join Medium Game</button>
                <button onClick={() => joinGame(24)}>Join Hard Game</button>  
            </div>
        
        </PageContainer>
    )
}

export default NewMultiPlayer;