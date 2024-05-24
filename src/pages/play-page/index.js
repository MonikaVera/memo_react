import { t } from "../../common/translation";
import PageContainer from "../../common/PageContainer";

/**
 * Play Component
 * Renders the game play options page with various sections including titles, subtitles, and descriptions.
 * This page provides users with information on single player and multiplayer game modes.
 *
 * Usage:
 * ```jsx
 * <Play />
 * ```
 *
 * Each section uses translations for multilingual support, pulling text strings from a central resource.
 */
const Play = () => {
    return (
        <PageContainer>
            <div className="row">
                <h1 className="text-center">{t('playPage/title')}</h1>
                <p>{t('playPage/description')}</p>
            </div>
            <div className="row">
                <h2>
                    <i className="bi bi-puzzle"/>
                    {t('playPage/singlePlayer/subtitle')}
                    <i className="bi bi-puzzle"/>
                </h2>
                <p>{t('playPage/singlePlayer/subDescription')}</p>
                <h2>
                    <i className="bi bi-globe-europe-africa"/>
                    {t('playPage/multiPlayer/subtitle')}
                    <i className="bi bi-globe-americas"/>
                </h2>
                <p>{t('playPage/multiPlayer/subDescription')}</p>
            </div>
            <div className="row">
                <p>{t('playPage/summary')}</p>
            </div>
        </PageContainer>
    );
}

export default Play;