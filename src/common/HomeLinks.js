import { StyledLink, StyledButton } from "../pages/styles/styles";
import { REGISTER, SIGNIN } from "../config";
import { useAuth } from "./AuthContext";
import { t } from "./translation";

const HomeLinks = () => {
    const {isAuthenticated, handleSignOut} = useAuth();

    return ( 
        isAuthenticated ? (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <StyledButton className="btn btn-primary m-1" onClick={handleSignOut}>
                        <i className="bi bi-door-closed"/>
                        {t('homePage/buttons/signOut')}
                        <i className="bi bi-door-closed"/>
                    </StyledButton>
                </li>
            </ul>   
        ) : (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <StyledLink className="btn btn-primary m-1" to={SIGNIN}>
                        <i className="bi bi-door-open"/>
                        {t('homePage/buttons/signIn')}
                        <i className="bi bi-door-open"/>
                    </StyledLink>  
                </li>
                <li className="nav-item">
                    <StyledLink className="btn btn-primary m-1" to={REGISTER}>
                        <i className="bi bi-pen"/>
                        {t('homePage/buttons/register')}
                        <i className="bi bi-envelope-paper"/>
                    </StyledLink> 
                </li>
            </ul>
        )
    )
}

export default HomeLinks;