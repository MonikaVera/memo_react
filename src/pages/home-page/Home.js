
import { t } from "../../common/translation";
import InfoCard from "./InfoCard";
import PageContainer from "../../common/PageContainer";

/**
 * Home Component
 * Renders the main homepage of the application with various sections including a title and multiple InfoCard components.
 * Each section displays translated text content and icons using internationalization functions.
 * 
 * This component uses `PageContainer` for consistent layout across the app and `InfoCard` to display key points or features.
 *
 * The content is dynamically translated using the `t` function which fetches translations based on keys provided,
 * ensuring the application can support multiple languages.
 *
 * Example Usage:
 * ```jsx
 * <Home />
 * ```
 */
const Home = () => {
    return (
        <PageContainer>
            <h1 className="text-center">
                <i className="bi bi-stars"/>
                {t('homePage/title')}
                <i className="bi bi-stars"/>
            </h1>
            <div>
                <p>{t('homePage/description')}</p>
                <h2>{t('homePage/firstSection/title')}</h2>
                <ul className="list-group list-group-numbered border-dark mb-2 fs-4">
                    <li className="list-group-item border-dark list-group-item-primary">{t('homePage/firstSection/point1')}</li>
                    <li className="list-group-item border-dark list-group-item-primary">{t('homePage/firstSection/point2')}</li>
                    <li className="list-group-item border-dark list-group-item-primary">{t('homePage/firstSection/point3')}</li>
                    <li className="list-group-item border-dark list-group-item-primary">{t('homePage/firstSection/point4')}</li>
                    <li className="list-group-item border-dark list-group-item-primary">{t('homePage/firstSection/point5')}</li>
                </ul>
            </div>
            <div>
                <h2>{t('homePage/secondSection/title')}</h2>
                <InfoCard 
                    title={t('homePage/secondSection/card1/title')}
                    description={t('homePage/secondSection/card1/description')}
                    iconClass={"bi-graph-up-arrow"}
                />
                <InfoCard
                    title={t('homePage/secondSection/card2/title')}
                    description={t('homePage/secondSection/card2/description')}
                    iconClass={"bi-crosshair"}
                />
                <InfoCard
                    title={t('homePage/secondSection/card3/title')}
                    description={t('homePage/secondSection/card3/description')}
                    iconClass={"bi-reception-4"}
                />
                <InfoCard
                    title={t('homePage/secondSection/card4/title')}
                    description={t('homePage/secondSection/card4/description')}
                    iconClass={"bi-book"}
                />
                <InfoCard
                    title={t('homePage/secondSection/card5/title')}
                    description={t('homePage/secondSection/card5/description')}
                    iconClass={"bi-chat-dots"}
                />
                <InfoCard
                    title={t('homePage/secondSection/card6/title')}
                    description={t('homePage/secondSection/card6/description')}
                    iconClass={"bi-lightbulb"}
                />
            </div>
        </PageContainer>
    );
}

export default Home;