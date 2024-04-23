import { HOME, PLAY, STATS } from "../../config";
import { useAuth } from "../AuthContext";
import { useLocation} from "react-router-dom";
import { t } from "../translation";
import PlayLinks from "./PlayLinks";
import HomeLinks from "./HomeLinks";
import StatLinks from "./StatLinks";
import { Link } from "react-router-dom";
import MpStatLinks from "./MpStatLinks";

const Navbar = () => {
    const {isAuthenticated} = useAuth();
    const location = useLocation();
    
    function isCurrent(path) {
      if(location.pathname===path) {
        return true;
      } 
      if(path==="Leaderboard") {
        const regex = new RegExp(`^${STATS}/(\\d+)`)
        return regex.test(location.pathname);
      }
      return false;
    }

    return <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div className="container-fluid">
      <div className="collapse navbar-collapse d-flex flex-wrap justify-content-between" id="navbarNav">
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
    </div>
  </nav>
}

export default Navbar;