import { MULTYPLAYERMODES, PLAY, SINGLEPLAYERMODES } from "../config";
import { t } from "./translation";
import { StyledLink } from "../pages/styles/styles";

const PlayLinks = () => {
    return (
        <ul className="navbar-nav">
            <li className="nav-item">
              <StyledLink 
                className="btn btn-primary m-1" 
                to={PLAY + '/' + SINGLEPLAYERMODES}>
                    <i className="bi bi-puzzle"/>
                    {t('playPage/buttons/singlePlayer')}
                    <i className="bi bi-puzzle"/>
              </StyledLink>
            </li>
            <li className="nav-item">
              <StyledLink 
                className="btn btn-primary btn-md m-1"
                to={PLAY + '/' + MULTYPLAYERMODES}>
                    <i className="bi bi-globe-europe-africa"/>
                    {t('playPage/buttons/multiPlayer')}
                    <i className="bi bi-globe-americas"/>
              </StyledLink>
            </li>
        </ul>
    );
}

export default PlayLinks;