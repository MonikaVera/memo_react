import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { LINK } from '../../config';
import PageContainer from '../../common/PageContainer';
import { useAuth } from '../../common/AuthContext';

const NewMultiPlayer = () => {
    const { token } = useAuth();
    console.log(token);
    const url = LINK + '/ws';
    const topics = ['/topic/game.state']; // Add your topics here

    const socket = new SockJS(url);
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
    console.log('Connected to STOMP broker');
    
        topics.forEach(topic => {
            stompClient.subscribe(topic, message => {
            console.log(`Received message on topic ${topic}:`, message.body);
            });
        });
    }, error => {
    console.error('Error connecting to STOMP broker:', error);
    });

    const sendMessage = (topic, message) => {
        stompClient.send(topic, {}, message);
    };

    const joinGame = () => {
        const message = {
            token: token,
            numOfPairs: 8
        };
        stompClient.send('/app/game.join', {}, JSON.stringify(message));
    };

    return (
        <PageContainer>
            <button onClick={joinGame}>Join Game</button>
        </PageContainer>
    )
}

export default NewMultiPlayer;