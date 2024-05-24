import { useMediaQuery } from 'react-responsive';
import GameIdHeader from './GameIdHeader';
import SmScreenScore from './SmScreenScore';
import LgScreenScore from './LgScreenScore';

/**
 * Component for rendering the score section of the game.
 * @param {Object} receivedInfo - Information received from the game.
 * @param {Function} leaveGame - Function to leave the game.
 * @param {number} pairs - Number of pairs in the game.
 * @param {boolean} wantToPlayWithFriend - Indicates if the player wants to play with a friend.
 * @returns {JSX.Element} - Score component.
 */
const Score = ({receivedInfo, leaveGame, pairs, wantToPlayWithFriend}) => {
  const isMobile = useMediaQuery({ maxWidth: pairs===24 ? 675 : 875 });
  
  return ( 
    <div>
        {wantToPlayWithFriend && <GameIdHeader gameId={receivedInfo.gameId}/>}
        {isMobile ? (
            <SmScreenScore receivedInfo={receivedInfo} leaveGame={leaveGame}/>
        ) : (
            <LgScreenScore receivedInfo={receivedInfo} leaveGame={leaveGame}/>
        )}
    </div>
    
  );
}

export default Score;