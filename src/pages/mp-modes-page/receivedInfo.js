import { ContentContainer, InfoContentContainer } from "../../styles/styles";
import { t } from "../../common/translation";
import JoinCard from "./JoinCard";
import Score from "./Score";
import MpResult from "./MpResult";
import FriendCard from "./FriendCard";

const ReceivedInfo = ({receivedInfo, leaveGame, joinGame, wantToPlayWithFriend}) => {
    return (
        receivedInfo && !receivedInfo.gameOver ? (
            <InfoContentContainer $pairs={parseInt(receivedInfo.board.length)/2}>
                <h1 className="fs-3">{t('multiPlayerPage/players')}</h1>
                {wantToPlayWithFriend && receivedInfo.gameId}
                <Score receivedInfo={receivedInfo} leaveGame={leaveGame} pairs={parseInt(receivedInfo.board.length)/2}/>           
            </InfoContentContainer>
        ) : (
            <ContentContainer className='d-flex flex-column align-items-center'>
                <h1 className="text-center">{t('multiPlayerPage/title')}</h1>
                <MpResult receivedInfo={receivedInfo}/>
                <JoinCard title={t('multiPlayerPage/join/easy/title')} desc={t('multiPlayerPage/join/easy/description')} joinGame={joinGame} pairs={8}/>
                <JoinCard title={t('multiPlayerPage/join/medium/title')} desc={t('multiPlayerPage/join/medium/description')} joinGame={joinGame} pairs={16}/>
                <JoinCard title={t('multiPlayerPage/join/hard/title')} desc={t('multiPlayerPage/join/hard/description')} joinGame={joinGame} pairs={24}/> 
                <FriendCard joinGame={joinGame}/>
            </ContentContainer>
        )
    )
}

export default ReceivedInfo;