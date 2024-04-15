import React from 'react';
import { useMediaQuery } from 'react-responsive';

const Score = ({receivedInfo}) => {
  const isMobile = useMediaQuery({ maxWidth: 675 });

  return (
    isMobile ? (
        <div className=" fs-4 badge text-bg-primary" style={{width:"100%"}}>
            <div className="d-flex flex-wrap justify-content-around" style={{gap:"0.5em"}}> 
                <div>{receivedInfo.player1Name}</div> 
                <div className="badge rounded-pill text-bg-dark">{receivedInfo.player1GuessedCards}</div>
            </div>
           
            <div className="d-flex flex-wrap justify-content-around" style={{gap:"0.5em"}}>
            <div>{receivedInfo.player2Name}</div>
                <div className="badge rounded-pill text-bg-dark">{receivedInfo.player2GuessedCards}</div> 
            </div>                   
             <div className="badge text-bg-dark">{receivedInfo.turn}'s turn</div>
        </div>
      ) : (
        <div className="d-flex flex-wrap justify-content-between fs-4 badge text-bg-primary rounded-pill" style={{width:"80%"}}>
            <div className="d-flex flex-wrap justify-content-around" style={{gap:"0.5em"}}> 
                <div className="badge rounded-pill text-bg-dark">{receivedInfo.player1GuessedCards}</div>
                <div>{receivedInfo.player1Name}</div> 
            </div>
            <div className="badge text-bg-dark">{receivedInfo.turn}'s turn</div>
            <div className="d-flex flex-wrap justify-content-around" style={{gap:"0.5em"}}>
                <div>{receivedInfo.player2Name}</div>
                <div className="badge rounded-pill text-bg-dark">{receivedInfo.player2GuessedCards}</div> 
            </div>                   
        </div>
    )
  );
}

export default Score;