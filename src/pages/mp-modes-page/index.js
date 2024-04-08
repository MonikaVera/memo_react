import PageContainer from "../../common/PageContainer";
import useMultiPlayerStart from "./useMultiPlayerStart";
import useWebSocket from "./useWebSocket";
import {LINK} from "../../config";
const MultiPlayerOptions = () => {
    const { getmultiPlayerStart } = useMultiPlayerStart();
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
    
    return (
        <PageContainer>Hi honey!
            <button onClick={() => handleJoinGame(8)}>Easy</button>
            <button onClick={() => handleOptionSelect(16)}>Medium</button>
            <button onClick={() => handleOptionSelect(24)}>Hard</button>
        </PageContainer>
    )
}

export default MultiPlayerOptions;