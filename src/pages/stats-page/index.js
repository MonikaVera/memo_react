import { Navigate } from "react-router-dom";
import { useAuth } from "../../common/AuthContext";
import { HOME } from "../../config";
import { useNavigate } from "react-router-dom";
import { SPSTATS } from "../../config";
import { StyledButton } from "../styles/styles";
import { t } from "../../common/translation";

const Stats = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleClickOnAllGame = () => {
        console.log("jhDSBMC")
        navigate(SPSTATS);
    }

    return isAuthenticated ? (<div className="container">
            <h1>{t('statsPage/title')}</h1>
            <div className="row">
                <p className="col">{t('statsPage/description')}</p>
                <div className="col">
                    <StyledButton className="btn btn-primary btn-lg" onClick={handleClickOnAllGame}>
                        <i class="bi bi-award"/>
                        {t('statsPage/buttons/singlePlayer')}
                        <i class="bi bi-award"/>
                    </StyledButton>
                    <StyledButton className="btn btn-primary btn-lg" > 
                        <i class="bi bi-trophy"/>
                        {t('statsPage/buttons/multiPlayer')}
                        <i class="bi bi-trophy"/>
                    </StyledButton>  
                </div>
            </div>    
            <div className="row">
                <h2>
                    <i class="bi bi-award"/>
                    {t('statsPage/singlePlayer/subtitle')}
                    <i class="bi bi-award"/>
                </h2>
                <p>{t('statsPage/singlePlayer/subDescription')}</p>
                <h2>
                    <i class="bi bi-trophy"/>
                    {t('statsPage/multiPlayer/subtitle')}
                    <i class="bi bi-trophy"/>
                </h2>
                <p>{t('statsPage/multiPlayer/subDescription')}</p> 
            </div>
            <p>{t('statsPage/conclusion')}</p>
        </div>   
    ) : (
        <Navigate to={HOME}/>
    )
}

export default Stats;