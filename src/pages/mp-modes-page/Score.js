import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { t } from "../../common/translation";
import { StyledDiv } from '../../styles/styles';

const Score = ({receivedInfo, leaveGame, pairs}) => {
  const isMobile = useMediaQuery({ maxWidth: pairs===24 ? 675 : 875 });

  return (
    isMobile ? (
        <div className="d-flex flex-wrap justify-content-between">
            <StyledDiv className=" fs-4 badge text-bg-primary" $width="100%">
                <div className="d-flex flex-wrap justify-content-between m-1"> 
                    <div>{receivedInfo.player1Name}</div> 
                    <div className="badge rounded-pill text-bg-dark">{receivedInfo.player1GuessedCards}</div>
                </div>
            
                <div className="d-flex flex-wrap justify-content-between m-1">
                    <div>{receivedInfo.player2Name!==null ? receivedInfo.player2Name : 'waiting...'}</div>
                    <div className="badge rounded-pill text-bg-dark">{receivedInfo.player2GuessedCards}</div> 
                </div>                   
            </StyledDiv>
            <StyledDiv className="d-flex flex-wrap justify-content-between" $width="100%">
                <div className="btn btn-dark m-1">{receivedInfo.turn}{t('multiPlayerPage/turn')}</div>
                <div className="d-flex flex-wrap justify-content-center m-1">
                    <button className=' btn btn-primary' onClick={() => leaveGame()}>{t('multiPlayerPage/leave')}</button> 
                </div>
            </StyledDiv>
        </div>
      ) : (
        <div className="d-flex flex-wrap justify-content-between">
            <StyledDiv className="d-flex flex-wrap justify-content-between fs-4 badge text-bg-primary rounded-pill" $width="80%">
                <div className="d-flex flex-wrap justify-content-around" > 
                    <div className="badge rounded-pill text-bg-dark m-1">{receivedInfo.player1GuessedCards}</div>
                    <div className='m-1'>{receivedInfo.player1Name}</div> 
                </div>
                <div className="badge text-bg-dark m-1">{receivedInfo.turn}{t('multiPlayerPage/turn')}</div>
                <div className="d-flex flex-wrap justify-content-around">
                    <div className='m-1'>{receivedInfo.player2Name!==null ? receivedInfo.player2Name : 'waiting...'}</div>
                    <div className="badge rounded-pill text-bg-dark m-1">{receivedInfo.player2GuessedCards}</div> 
                </div>                   
            </StyledDiv>
            <div className="d-flex flex-wrap justify-content-center m-1">
                <button className=' btn btn-primary' onClick={() => leaveGame()}>{t('multiPlayerPage/leave')}</button>  
            </div>
        </div>
    )
  );
}

export default Score;