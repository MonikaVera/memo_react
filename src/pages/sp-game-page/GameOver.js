import { useNavigate } from "react-router-dom";
import { StyledButton } from "../styles/styles";
import { HOME } from "../../config";
import { t } from "../../common/translation";

const GameOver = ({won}) => {
    const navigate = useNavigate();

    const handleClickOnNewGame = () => {
        navigate(-1);
    };

    const handleClickOnHome = () => {
        navigate(HOME);
    }

    return <div className="d-flex flex-column align-items-center m-3">
        {won ? <div>{t('singlePlayerGamePage/won')}</div> : null}
        {!won ? <div>{t('singlePlayerGamePage/lost')}</div> : null}
        <StyledButton 
            className="btn btn-secondary" 
            onClick={handleClickOnNewGame}>
                {t('singlePlayerGamePage/newGame')}
        </StyledButton>
        <StyledButton 
            className="btn btn-secondary" 
            onClick={handleClickOnHome}>
                {t('singlePlayerGamePage/home')}
        </StyledButton>
    </div>
}

export default GameOver;