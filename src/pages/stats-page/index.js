import { t } from "../../common/translation";
import PageContainer from "../../common/PageContainer";

/**
 * Component for displaying game statistics.
 * @returns {JSX.Element} Stats component
 */
const Stats = () => {
    return (
        <PageContainer>
            <h1 className="text-center">{t('statsPage/title')}</h1>
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
                    <i className="bi bi-trophy"/>
                    {t('statsPage/multiPlayer/subtitle')}
                    <i className="bi bi-trophy"/>
                </h2>
                <p>{t('statsPage/multiPlayer/subDescription')}</p> 
            </div>
            <p>{t('statsPage/conclusion')}</p>
        </PageContainer>   
    );
}

export default Stats;