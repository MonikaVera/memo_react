import { STATS } from "../../config";
import { StyledLink } from "../../styles/styles";
import { t } from "../translation";

/**
 * Component for rendering multiplayer stats page links in the navigation bar.
 * @returns {JSX.Element} The rendered component.
 */
const MpStatLinks = () => {
    return (
        <ul className="navbar-nav">
            <li className="nav-item">
                <StyledLink 
                className="btn btn-primary m-1" 
                to={STATS + '/8'}>
                    {t('multiPlayerStatsPage/links/easy')}
                </StyledLink>
            </li>
            <li className="nav-item">
                <StyledLink 
                className="btn btn-primary btn-md m-1"
                to={STATS + '/16'}>
                    {t('multiPlayerStatsPage/links/medium')}
                </StyledLink>
            </li>
            <li className="nav-item">
                <StyledLink 
                className="btn btn-primary btn-md m-1"
                to={STATS + '/24'}>
                    {t('multiPlayerStatsPage/links/hard')}
                </StyledLink>
            </li>
        </ul>
    );
}

export default MpStatLinks;