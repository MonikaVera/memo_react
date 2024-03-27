import { PLAY, SINGLEPLAYERMODES } from "../config";
import { t } from "./translation";
import { StyledLink } from "../pages/styles/styles";

const PlayLinks = () => {
    return (
        <ul className="navbar-nav">
            <li className="nav-item">
              <StyledLink 
                className="btn btn-primary m-1" 
                to={PLAY + '/' + SINGLEPLAYERMODES}>
                    <i class="bi bi-puzzle"/>
                    {t('playPage/buttons/singlePlayer')}
                    <i class="bi bi-puzzle"/>
              </StyledLink>
            </li>
            <li className="nav-item">
              <StyledLink 
                className="btn btn-primary btn-md m-1">
                    <i class="bi bi-globe-europe-africa"/>
                    {t('playPage/buttons/multiPlayer')}
                    <i class="bi bi-globe-americas"/>
              </StyledLink>
            </li>
        </ul>
    );
}

export default PlayLinks;