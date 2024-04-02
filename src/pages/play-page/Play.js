import { Navigate } from "react-router-dom";
import { HOME } from "../../config";
import { useAuth } from "../../common/AuthContext";
import { t } from "../../common/translation";
import PageContainer from "../../common/PageContainer";

const Play = () => {
    const {isAuthenticated} = useAuth();

    return (
        isAuthenticated ? (<PageContainer>
            <h1 className="row">{t('playPage/title')}</h1>
            <div className="row">
                <p>{t('playPage/description')}</p>
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
        </PageContainer>) : <Navigate to={HOME}/>
    );
}

export default Play;