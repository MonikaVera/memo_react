import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { t } from "../../common/translation";

const Score = ({receivedInfo, leaveGame, pairs}) => {
  const isMobile = useMediaQuery({ maxWidth: pairs===24 ? 675 : 875 });

  return (
    isMobile ? (
        <div className="d-flex flex-wrap justify-content-between">
            <div className=" fs-4 badge text-bg-primary" style={{width:"100%"}}>
                <div className="d-flex flex-wrap justify-content-around" style={{gap:"0.5em"}}> 
                    <div>{receivedInfo.player1Name}</div> 
                    <div className="badge rounded-pill text-bg-dark">{receivedInfo.player1GuessedCards}</div>
                </div>
            
                <div className="d-flex flex-wrap justify-content-around" style={{gap:"0.5em", marginTop:"0.5em"}}>
                    <div>{receivedInfo.player2Name}</div>
                    <div className="badge rounded-pill text-bg-dark">{receivedInfo.player2GuessedCards}</div> 
                </div>                   
            </div>
            <div className="d-flex flex-wrap justify-content-between" style={{width:"100%"}}>
                <div className="btn btn-dark m-1">{receivedInfo.turn}{t('multiPlayerPage/turn')}</div>
                <div className="d-flex flex-wrap justify-content-center m-1">
                    <button className=' btn btn-primary' onClick={() => leaveGame()}>{t('multiPlayerPage/leave')}</button> 
                </div>
            </div>
        </div>
      ) : (
        <div className="d-flex flex-wrap justify-content-between">
            <div className="d-flex flex-wrap justify-content-between fs-4 badge text-bg-primary rounded-pill" style={{width:"80%"}}>
                <div className="d-flex flex-wrap justify-content-around" style={{gap:"0.5em"}}> 
                    <div className="badge rounded-pill text-bg-dark">{receivedInfo.player1GuessedCards}</div>
                    <div>{receivedInfo.player1Name}</div> 
                </div>
                <div className="badge text-bg-dark">{receivedInfo.turn}{t('multiPlayerPage/turn')}</div>
                <div className="d-flex flex-wrap justify-content-around" style={{gap:"0.5em"}}>
                    <div>{receivedInfo.player2Name}</div>
                    <div className="badge rounded-pill text-bg-dark">{receivedInfo.player2GuessedCards}</div> 
                </div>                   
            </div>
            <div className="d-flex flex-wrap justify-content-center m-1">
                <button className=' btn btn-primary' onClick={() => leaveGame()}>{t('multiPlayerPage/leave')}</button>  
            </div>
        </div>
    )
  );
}

export default Score;