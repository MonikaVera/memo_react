import PageContainer from '../../common/PageContainer';
import { useAuth } from '../../common/AuthContext';
import { useState } from 'react';
import { CardContainer } from '../../styles/styles';
import Error from '../../common/Error';
import ReceivedInfo from './ReceivedInfo';
import GameCard from '../../common/GameCard';
import { useWebSocket } from '../../common/useWebsocket';

/**
 * Component for the multiplayer game.
 * @returns {JSX.Element} MultiPlayerGame component
 */
const MultiPlayerGame = () => {

    /** Destructuring authentication data and WebSocket hook values. */
    const { token, userName } = useAuth();
    const { stompClientRef, isJoined, receivedMessage, errorR } = useWebSocket();
    
    /** State hook for indicating whether the player wants to play with a friend. */
    const [ wantToPlayWithFriend, setWantToPlayWithFriend] = useState();

    /**
     * Function to join the game.
     * @param {number} numOfPairs - Number of pairs for the game.
     * @param {boolean} wantToPlayWithFriend - Indicates if the player wants to play with a friend.
     * @param {string} friendRoomId - Game ID of the friend.
     */
    const joinGame = (numOfPairs, wantToPlayWithFriend, friendRoomId) => {
        setWantToPlayWithFriend(wantToPlayWithFriend);
        const message = {
            token: token,
            numOfPairs: numOfPairs,
            wantToPlayWithFriend: wantToPlayWithFriend,
            friendRoomId: friendRoomId
        };
        stompClientRef.current.send('/app/game.join', {}, JSON.stringify(message));
    };

    /**
     * Function to handle clicking on cards.
     * @param {object} param0 - Index of the clicked card.
     */
    const handleOnCardClicks = ({index}) => {
        if(receivedMessage.turn===userName && receivedMessage.gameStarted) {
            const message = {
                senderToken: token,
                index: index,
                gameId: receivedMessage.gameId,
            };
            stompClientRef.current.send('/app/game.move', {}, JSON.stringify(message));
        }
    }

    /**
     * Function to leave the game.
     */
    const leaveGame = () => {
        const message = {
            token: token,
        };
        stompClientRef.current.send('/app/game.leave', {}, JSON.stringify(message));
    }

    /**
     * Checks if a card is active.
     * @param {number} index - Index of the card.
     * @returns {boolean} - True if the card is active, otherwise false.
     */
    function isActiveCard(index) {
        let isActive = false;
        const lastMove = receivedMessage.lastMove;
        if (lastMove!==null && (index.toString() in lastMove)) {
            isActive = true;
        }
        return isActive;
    }

    /**
     * Retrieves the number displayed on a card.
     * @param {number} num - Number displayed on the card.
     * @param {number} index - Index of the card.
     * @returns {number|null} - Number displayed on the card, or null if not available.
     */
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
            <ReceivedInfo 
                receivedInfo={receivedMessage} 
                leaveGame={leaveGame} 
                joinGame={joinGame} 
                wantToPlayWithFriend={wantToPlayWithFriend}
            /> 
            {isJoined && receivedMessage && 
                <CardContainer $pairs={parseInt(receivedMessage.board.length/2)}>
                    {receivedMessage.board.map((num, index) => (
                        <GameCard 
                            key={index} 
                            index={index} 
                            num={getNum(num, index)} 
                            handleOnCardClicks={handleOnCardClicks} 
                            pairs={parseInt(receivedMessage.board.length/2)}
                            isClickable={true}
                            isActive={isActiveCard(index)}
                        />
                    ))}
                </CardContainer>
            }
            <Error>{errorR}</Error>
        </PageContainer>
    )
}

export default MultiPlayerGame;