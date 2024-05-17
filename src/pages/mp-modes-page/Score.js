import { useMediaQuery } from 'react-responsive';
import GameIdHeader from './GameIdHeader';
import SmScreenScore from './SmScreenScore';
import LgScreenScore from './LgScreenScore';


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