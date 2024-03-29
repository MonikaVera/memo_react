import { StyledLink } from "../styles/styles";
import { HOME, SINGLEPLAYERMODES, PLAY } from "../../config";
import { t } from "../../common/translation";

const GameOver = ({won}) => {
    return <div className="d-flex flex-column align-items-center m-3">
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
    </div>
}

export default GameOver;