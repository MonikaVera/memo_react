import { StyledLink, SmallContentContainer } from "../../styles/styles";
import { HOME, SINGLEPLAYERMODES, PLAY } from "../../config";
import { t } from "../../common/translation";

/**
 * Component to display game over screen.
 * @param {boolean} won - Indicates whether the player won the game.
 * @returns {JSX.Element} GameOver component
 */
const GameOver = ({won}) => {
    return <SmallContentContainer className="d-flex flex-column align-items-center" $smallMT='9.5em'>
        <h2>
            <i className="bi bi-stars"/>
            {' ' + t('multiPlayerPage/result/title') + ' '}
            <i className="bi bi-stars"/>
        </h2>
        {won ? <div>{t('singlePlayerGamePage/won')}</div> : null}
        {!won ? <div>{t('singlePlayerGamePage/lost')}</div> : null}
        <StyledLink 
            className="btn btn-primary m-1" 
            to={PLAY + '/' + SINGLEPLAYERMODES}>
                {t('singlePlayerGamePage/newGame')}
        </StyledLink>
        <StyledLink 
            className="btn btn-primary m-1" 
            to={HOME}>
                {t('singlePlayerGamePage/home')}
        </StyledLink>
    </SmallContentContainer>
}

export default GameOver;