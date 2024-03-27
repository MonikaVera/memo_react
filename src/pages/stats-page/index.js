import { Navigate } from "react-router-dom";
import { useAuth } from "../../common/AuthContext";
import { HOME } from "../../config";
import { t } from "../../common/translation";

const Stats = () => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? (<div className="container">
            <h1>{t('statsPage/title')}</h1>
            <div className="row">
                <p className="col">{t('statsPage/description')}</p>
            </div>    
            <div className="row">
                <h2>
                    <i className="bi bi-table"/>
                    {t('statsPage/singlePlayer/subtitle')}
                    <i className="bi bi-table"/>
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