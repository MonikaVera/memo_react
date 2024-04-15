import { GameOverContentContainer, InfoContentContainer } from "../styles/styles";
import { t } from "../../common/translation";
import JoinCard from "./JoinCard";

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
                        <div className="d-flex flex-wrap justify-content-around">
                            <div>{receivedInfo.player1Name}</div>
                            <div>{receivedInfo.player2Name}</div>
                        </div>
                        <div className="d-flex flex-wrap justify-content-around">
                            <div>{receivedInfo.player1GuessedCards}</div>
                            <div>{receivedInfo.player2GuessedCards}</div>
                        </div>
                        <div className="d-flex flex-wrap justify-content-between">
                            <div>{receivedInfo.turn}'s turn</div>
                            <button className='btn btn-primary' onClick={() => leaveGame()}>Leave</button>  
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