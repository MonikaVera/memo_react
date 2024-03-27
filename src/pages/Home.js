import { useNavigate } from "react-router-dom";
import { StyledButton } from "./styles/styles";
import { PLAY, REGISTER, SIGNIN, STATS } from "../config";
import { useAuth } from "../common/AuthContext";
import { t } from "../common/translation";

const Home = () => {
    const navigate = useNavigate();
    const {isAuthenticated, handleSignOut} = useAuth();

    const handleClick = (path) => {
        navigate(path);
    };
    
    return (
        <div className="container">
            <h1>
                <i className="bi bi-stars"/>
                {t('homePage/title')}
                <i className="bi bi-stars"/>
            </h1>
            <div className="row">
                <p>{t('homePage/description')}</p>
                <h2>{t('homePage/firstSection/title')}</h2>
                <div className="col-md-8">
                    <ul className="list-group list-group-numbered border-primary m-2 fs-4">
                        <li className="list-group-item border-primary">{t('homePage/firstSection/point1')}</li>
                        <li className="list-group-item border-primary">{t('homePage/firstSection/point2')}</li>
                        <li className="list-group-item border-primary">{t('homePage/firstSection/point3')}</li>
                        <li className="list-group-item border-primary">{t('homePage/firstSection/point4')}</li>
                        <li className="list-group-item border-primary">{t('homePage/firstSection/point5')}</li>
                    </ul>
                </div>
                    {isAuthenticated ? (
                    <div className="col-md-4 d-flex flex-column align-items-center">
                        <StyledButton className="btn btn-primary btn-lg" onClick={() => handleClick(PLAY)}>
                            <i className="bi bi-puzzle"/>
                            {t('homePage/buttons/play')}
                            <i className="bi bi-puzzle"/>
                        </StyledButton>
                        <StyledButton className="btn btn-primary btn-lg" onClick={handleSignOut}>
                            <i className="bi bi-door-closed"/>
                            {t('homePage/buttons/signOut')}
                            <i className="bi bi-door-closed"/>
                        </StyledButton>
                        <StyledButton className="btn btn-primary btn-lg" onClick={() => handleClick(STATS)}>
                            <i className="bi bi-table"/>
                            {t('homePage/buttons/stats')}
                            <i className="bi bi-table"/>
                        </StyledButton>
                    </div>  
                    ) : (
                    <div className="col-md-4 d-flex flex-column align-items-center">
                        <StyledButton className="btn btn-primary btn-lg" onClick={() => handleClick(SIGNIN)}>
                            <i className="bi bi-door-open"/>
                            {t('homePage/buttons/signIn')}
                            <i className="bi bi-door-open"/>
                        </StyledButton>
                        <StyledButton className="btn btn-primary btn-lg" onClick={() => handleClick(REGISTER)}>
                            <i className="bi bi-pen"/>
                            {t('homePage/buttons/register')}
                            <i className="bi bi-envelope-paper"/>
                        </StyledButton> 
                    </div>
                    )}
            </div>
            <h2>{t('homePage/secondSection/title')}</h2>
            <div className="row">
                <div className="card col m-2 border-primary">
                    <h3>
                        <i class="bi bi-graph-up-arrow"/>
                        {t('homePage/secondSection/card1/title')}
                        <i class="bi bi-graph-up-arrow"/>
                    </h3>
                    <p>{t('homePage/secondSection/card1/description')}</p>
                </div>
                <div className="card col m-2 border-primary">
                <h3>
                    <i class="bi bi-crosshair"/>
                    {t('homePage/secondSection/card2/title')}
                    <i class="bi bi-crosshair"/>
                </h3>
                    <p>{t('homePage/secondSection/card2/description')}</p>
                </div>
            </div>
            <div className="row">
                <div className="card col m-2 border-primary">
                    <h3>
                        <i class="bi bi-reception-4"/>
                        {t('homePage/secondSection/card3/title')}
                        <i class="bi bi-reception-4"/>
                    </h3>
                    <p>{t('homePage/secondSection/card3/description')}</p>
                </div>
                <div className="card col m-2 border-primary">
                    <h3>
                        <i class="bi bi-book"/>
                        {t('homePage/secondSection/card4/title')}
                        <i class="bi bi-book"/>
                    </h3>
                    <p>{t('homePage/secondSection/card4/description')}</p>
                </div>
            </div>
            <div className="row">
                <div className="card col m-2 border-primary">
                    <h3>
                        <i class="bi bi-chat-dots"/>
                        {t('homePage/secondSection/card5/title')}
                        <i class="bi bi-chat-dots"/>
                    </h3>
                    <p>{t('homePage/secondSection/card5/description')}</p>
                </div>
                <div className="col card m-2 border-primary">
                    <h3>
                        <i class="bi bi-lightbulb"/>
                        {t('homePage/secondSection/card6/title')}
                        <i class="bi bi-lightbulb"/>
                    </h3>
                    <p>{t('homePage/secondSection/card6/description')}</p>
                </div>
            </div>
        </div>
    );
}

export default Home;