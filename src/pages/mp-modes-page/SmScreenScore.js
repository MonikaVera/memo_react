import { t } from "../../common/translation";
import { StyledDiv } from '../../styles/styles';

const SmScreenScore = ({receivedInfo, leaveGame}) => {
    return (
        <div className="d-flex flex-wrap justify-content-between">
            <StyledDiv className="d-flex flex-wrap justify-content-between mb-1 mt-1" $width="100%">
                <div className="btn btn-dark">{receivedInfo.turn}{t('multiPlayerPage/turn')}</div>
                <div className="d-flex flex-wrap justify-content-center">
                    <button className='btn btn-primary' onClick={() => leaveGame()}>{t('multiPlayerPage/leave')}</button> 
                </div>
            </StyledDiv>
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
        </div>
    )
}

export default SmScreenScore;