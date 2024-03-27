import { Navigate, useNavigate } from "react-router-dom";
import {StyledButton } from "../styles/styles";
import { HOME, SINGLEPLAYERMODES } from "../../config";
import { useAuth } from "../../common/AuthContext";
import { t } from "../../common/translation";

const Play = () => {
    const navigate = useNavigate();
    const {isAuthenticated} = useAuth();

    const handleClick = (path) => {
        navigate(path);
    };

    return (
        isAuthenticated ? (<div className="container">
            <h1 className="row">{t('playPage/title')}</h1>
            <div className="row">
                <p className="col-md-8">{t('playPage/description')}</p>
                <div className="col-md-4">
                    <StyledButton 
                        className="btn btn-primary btn-lg" 
                        onClick={() => handleClick(SINGLEPLAYERMODES)}>
                            <i class="bi bi-puzzle"/>
                            {t('playPage/buttons/singlePlayer')}
                            <i class="bi bi-puzzle"/>
                    </StyledButton>
                    <StyledButton 
                        className="btn btn-primary btn-lg">
                            <i class="bi bi-globe-europe-africa"/>
                            {t('playPage/buttons/multiPlayer')}
                            <i class="bi bi-globe-americas"/>
                    </StyledButton>
                </div> 
            </div>
            <div className="row">
                <h2>
                    <i class="bi bi-puzzle"/>
                    {t('playPage/singlePlayer/subtitle')}
                    <i class="bi bi-puzzle"/>
                </h2>
                <p>{t('playPage/singlePlayer/subDescription')}</p>
                <h2>
                    <i class="bi bi-globe-europe-africa"/>
                    {t('playPage/multiPlayer/subtitle')}
                    <i class="bi bi-globe-americas"/>
                </h2>
                <p>{t('playPage/multiPlayer/subDescription')}</p>
            </div>
        </div>) : <Navigate to={HOME}/>
    );
}

export default Play;