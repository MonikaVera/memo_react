import { StyledLink } from "../../styles/styles";
import { SPSTATS, STATS } from "../../config";
import { t } from "../translation";

const StatLinks = () => {
    return (
        <ul className="navbar-nav">
            <li className="nav-item">
                <StyledLink to={STATS + '/' + SPSTATS} className="btn btn-primary m-1">
                    <i className="bi bi-table"/>
                    {t('statsPage/buttons/singlePlayer')}
                    <i className="bi bi-table"/>
                </StyledLink>
            </li>
            <li className="nav-item">
                <StyledLink to={STATS + '/8' } className="btn btn-primary m-1">
                    <i className="bi bi-trophy"/>
                    {t('statsPage/buttons/multiPlayer')}
                    <i className="bi bi-trophy"/> 
                </StyledLink>
            </li>
        </ul>
    )
}

export default StatLinks;