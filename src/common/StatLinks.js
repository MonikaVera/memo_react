import { StyledLink } from "../pages/styles/styles";
import { SPSTATS, STATS } from "../config";
import { t } from "./translation";

const StatLinks = () => {
    return (
        <ul className="navbar-nav">
            <li className="nav-item">
                <StyledLink to={STATS + '/' + SPSTATS} className="btn btn-primary m-1">
                    <i class="bi bi-award"/>
                    {t('statsPage/buttons/singlePlayer')}
                    <i class="bi bi-award"/>
                </StyledLink>
            </li>
            <li className="nav-item">
                <StyledLink className="btn btn-primary m-1">
                    <i class="bi bi-trophy"/>
                    {t('statsPage/buttons/multiPlayer')}
                    <i class="bi bi-trophy"/> 
                </StyledLink>
            </li>
        </ul>
    )
}

export default StatLinks;