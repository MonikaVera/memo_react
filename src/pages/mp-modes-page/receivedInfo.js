import { GameOverContentContainer, InfoContentContainer } from "../styles/styles";
import { t } from "../../common/translation";
import JoinCard from "./JoinCard";
import Score from "./Score";

const ReceivedInfo = ({receivedInfo, leaveGame, joinGame}) => {
    return (
        receivedInfo ? (
            <div>
                {receivedInfo.gameOver ? (
                    <GameOverContentContainer className='d-flex flex-column align-items-center'>
                        <div>Winner: {receivedInfo.winner}</div>
                        <JoinCard title={t('multiPlayerPage/join/easy/title')} desc={t('multiPlayerPage/join/easy/description')} joinGame={joinGame} pairs={8}/>
                        <JoinCard title={t('multiPlayerPage/join/medium/title')} desc={t('multiPlayerPage/join/medium/description')} joinGame={joinGame} pairs={16}/>
                        <JoinCard title={t('multiPlayerPage/join/hard/title')} desc={t('multiPlayerPage/join/hard/description')} joinGame={joinGame} pairs={24}/> 
                    </GameOverContentContainer>
                ) : (
                    <InfoContentContainer>
                        <h1 className="fs-3">Players</h1>
                        <div className="d-flex flex-wrap justify-content-between">
                            <Score receivedInfo={receivedInfo}/>
                            <div className="d-flex flex-wrap justify-content-center m-1">
                                <button className=' btn btn-primary' onClick={() => leaveGame()}>Leave</button>  
                            </div>           
                        </div>
                    </InfoContentContainer>
                )}
            </div>
        ) : (
            <GameOverContentContainer className='d-flex flex-column align-items-center'>
                <JoinCard title={t('multiPlayerPage/join/easy/title')} desc={t('multiPlayerPage/join/easy/description')} joinGame={joinGame} pairs={8}/>
                <JoinCard title={t('multiPlayerPage/join/medium/title')} desc={t('multiPlayerPage/join/medium/description')} joinGame={joinGame} pairs={16}/>
                <JoinCard title={t('multiPlayerPage/join/hard/title')} desc={t('multiPlayerPage/join/hard/description')} joinGame={joinGame} pairs={24}/> 
            </GameOverContentContainer>
        )
    )
}

export default ReceivedInfo;