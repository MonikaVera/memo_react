import { useNavigate } from "react-router-dom";
import { HOME, PLAY, STATS } from "../config";
import { useAuth } from "./AuthContext";
import { useLocation} from "react-router-dom";
import { t } from "./translation";
import PlayLinks from "./PlayLinks";
import HomeLinks from "./HomeLinks";
import StatLinks from "./StatLinks";
import { Link } from "react-router-dom";

const Navbar = () => {
    const {isAuthenticated} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    //const regex = new RegExp(`^${PLAY}/${SINGLEPLAYERMODES}/(\\d+)/(\\d+)/([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$`);

    const handleOnArrowClick = () => {
      const path = location.pathname; 
      if(path===STATS || path===PLAY) {
        navigate(HOME);
      } else {
        navigate(-1);
      }
    }
    
    function isCurrent(path) {
      if(location.pathname===path) {
          return true;
      } 
      return false;
    }

    return <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      {isCurrent(HOME) ? null : (
        <button
          className="btn navbar-brand btn-dark" 
          onClick={handleOnArrowClick}
        >
          <i className="bi bi-arrow-left"/>
        </button>
      )} 
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
                  {t("navbar/play")}
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
        </div>
    </div>
  </nav>
}

export default Navbar;