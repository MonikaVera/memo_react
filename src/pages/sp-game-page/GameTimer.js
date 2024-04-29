import { InfoContentContainer } from "../../styles/styles";
import { useMediaQuery } from 'react-responsive';
import { t } from "../../common/translation";

const GameTimer = ({timeSec, sessionId, pairs, leaveGame, guessed}) => {
    const isMobile = useMediaQuery({ maxWidth: pairs===24 ? 675 : 875 });
    const minutes = Math.floor(timeSec / 60);
    const seconds = timeSec % 60;
  
    return (
      <InfoContentContainer $pairs={parseInt(pairs)}>
        {isMobile ?
          <div>
            <div className="fs-4 mb-2 text-center">{t('singlePlayerGamePage/guessed')} <div className="badge rounded-pill text-bg-dark">{guessed}</div></div>
            <div className="d-flex flex-wrap justify-content-evenly">
                <div className="btn btn-dark ms-2 me-2">{`${minutes} : ${seconds}`}</div>
                <button className='btn btn-primary ms-2 me-2' onClick={() => leaveGame()}>{t('singlePlayerGamePage/leave')}</button> 
            </div>
          </div>
        :
          <div className="row">
            <div className="fs-4 col">{t('singlePlayerGamePage/guessed')} <div className="badge rounded-pill text-bg-dark">{guessed}</div></div>
            <div className="col text-center">
              <div className="btn btn-dark">{`${minutes} : ${seconds}`}</div>
            </div>
            <div className="col text-end">
              <button className='btn btn-primary' onClick={() => leaveGame()}>{t('singlePlayerGamePage/leave')}</button> 
            </div> 
          </div>
        }  
      </InfoContentContainer>
    );
}

export default GameTimer;