import { HOME, PLAY, STATS } from "../../config";
import { useAuth } from "../AuthContext";
import { t } from "../translation";
import PlayLinks from "./PlayLinks";
import HomeLinks from "./HomeLinks";
import StatLinks from "./StatLinks";
import { Link } from "react-router-dom";
import MpStatLinks from "./MpStatLinks";

/**
 * Component for rendering the content of the navigation bar.
 * @param {Object} props - The component props.
 * @param {function} props.isCurrent - Function to determine if a path is the current path.
 * @returns {JSX.Element} The rendered component.
 */
const NavbarContent = ({isCurrent}) => {
    const {isAuthenticated} = useAuth();
    return (
        <div className="d-flex w-100 justify-content-between">
            <ul className="navbar-nav">
                <li className="nav-item">
                <Link 
                    className={`nav-link ${isCurrent(HOME) ? 'active' : ''}`} 
                    to={HOME}
                >
                    {t("navbar/home")}
                </Link>
                </li>
                { isAuthenticated && 
                <li className="nav-item">
                    <Link 
                    className={`nav-link ${isCurrent(PLAY) ? 'active' : ''}`} 
                    to = {PLAY} 
                    aria-disabled={!isAuthenticated}
                    >
                    {t("navbar/game")}
                    </Link>
                </li>
                }
                { isAuthenticated && 
                <li className="nav-item">
                    <Link 
                    className={`nav-link ${isCurrent(STATS) ? 'active' : ''} cursor-pointer`} 
                    to = {STATS} 
                    aria-disabled={!isAuthenticated}
                    >
                    {t("navbar/stats")}
                    </Link>
                </li>
                }
            </ul>
            {isCurrent(PLAY) && <PlayLinks/>}
            {isCurrent(HOME) && <HomeLinks/>}
            {isCurrent(STATS) && <StatLinks/>}
            {isCurrent("Leaderboard") && <MpStatLinks/>}
        </div>
    )
}

export default NavbarContent;