
import { t } from "../common/translation";
import Card from "./Card";
import PageContainer from "../common/PageContainer";

const Home = () => {
    return (
        <PageContainer>
            <h1>
                <i className="bi bi-stars"/>
                {t('homePage/title')}
                <i className="bi bi-stars"/>
            </h1>
            <div>
                <p>{t('homePage/description')}</p>
                <h2>{t('homePage/firstSection/title')}</h2>
                <ul className="list-group list-group-numbered border-dark m-2 fs-4">
                    <li className="list-group-item border-dark list-group-item-primary">{t('homePage/firstSection/point1')}</li>
                    <li className="list-group-item border-dark list-group-item-primary">{t('homePage/firstSection/point2')}</li>
                    <li className="list-group-item border-dark list-group-item-primary">{t('homePage/firstSection/point3')}</li>
                    <li className="list-group-item border-dark list-group-item-primary">{t('homePage/firstSection/point4')}</li>
                    <li className="list-group-item border-dark list-group-item-primary">{t('homePage/firstSection/point5')}</li>
                </ul>
            </div>
            <div>
                <h2>{t('homePage/secondSection/title')}</h2>
                <Card 
                    title={t('homePage/secondSection/card1/title')}
                    description={t('homePage/secondSection/card1/description')}
                    iconClass={"bi-graph-up-arrow"}
                />
                <Card
                    title={t('homePage/secondSection/card2/title')}
                    description={t('homePage/secondSection/card2/description')}
                    iconClass={"bi-crosshair"}
                />
                <Card
                    title={t('homePage/secondSection/card3/title')}
                    description={t('homePage/secondSection/card3/description')}
                    iconClass={"bi-reception-4"}
                />
                <Card
                    title={t('homePage/secondSection/card4/title')}
                    description={t('homePage/secondSection/card4/description')}
                    iconClass={"bi-book"}
                />
                <Card
                    title={t('homePage/secondSection/card5/title')}
                    description={t('homePage/secondSection/card5/description')}
                    iconClass={"bi-chat-dots"}
                />
                <Card
                    title={t('homePage/secondSection/card6/title')}
                    description={t('homePage/secondSection/card6/description')}
                    iconClass={"bi-lightbulb"}
                />
            </div>
        </PageContainer>
    );
}

export default Home;