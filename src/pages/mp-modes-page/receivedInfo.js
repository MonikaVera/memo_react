import { ContentContainer, InfoContentContainer } from "../../styles/styles";
import { t } from "../../common/translation";
import JoinCard from "./JoinCard";
import Score from "./Score";
import MpResult from "./MpResult";

const ReceivedInfo = ({receivedInfo, leaveGame, joinGame}) => {
    return (
        receivedInfo && !receivedInfo.gameOver ? (
            <InfoContentContainer $pairs={parseInt(receivedInfo.board.length)/2}>
                <h1 className="fs-3">{t('multiPlayerPage/players')}</h1>
                <Score receivedInfo={receivedInfo} leaveGame={leaveGame} pairs={parseInt(receivedInfo.board.length)/2}/>           
            </InfoContentContainer>
        ) : (
            <ContentContainer className='d-flex flex-column align-items-center'>
                <MpResult receivedInfo={receivedInfo}/>
                <JoinCard title={t('multiPlayerPage/join/easy/title')} desc={t('multiPlayerPage/join/easy/description')} joinGame={joinGame} pairs={8}/>
                <JoinCard title={t('multiPlayerPage/join/medium/title')} desc={t('multiPlayerPage/join/medium/description')} joinGame={joinGame} pairs={16}/>
                <JoinCard title={t('multiPlayerPage/join/hard/title')} desc={t('multiPlayerPage/join/hard/description')} joinGame={joinGame} pairs={24}/> 
            </ContentContainer>
        )
    )
}

export default ReceivedInfo;