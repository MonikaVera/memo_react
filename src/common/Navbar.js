import { useNavigate } from "react-router-dom";
import { HOME, PLAY, STATS, SINGLEPLAYERMODES } from "../config";
import { useAuth } from "./AuthContext";
import { useLocation} from "react-router-dom";
import { t } from "./translation";
import { StyledButton } from "../pages/styles/styles";

const Navbar = () => {
    const {isAuthenticated} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    //const regex = new RegExp(`^${PLAY}/${SINGLEPLAYERMODES}/(\\d+)/(\\d+)/([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$`);
    
    const handleOnOptionClick = (path) => {
      navigate(path);
    }

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
              <button 
                className={`nav-link ${isCurrent(HOME) ? 'active' : ''}`} 
                aria-current={isCurrent(HOME) ? 'page' : undefined} 
                onClick={() => handleOnOptionClick(HOME)}
              >
                {t("navbar/home")}
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${isCurrent(PLAY) ? 'active' : ''}`} 
                aria-current={isCurrent(PLAY)  ? 'page' : undefined} 
                onClick={() => handleOnOptionClick(PLAY)} 
                aria-disabled={!isAuthenticated}
              >
                {t("navbar/play")}
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${isCurrent(STATS) ? 'active' : ''} cursor-pointer`} 
                aria-current={isCurrent(STATS) ? 'page' : undefined} 
                onClick={() => handleOnOptionClick(STATS)} 
                aria-disabled={!isAuthenticated}
              >
                {t("navbar/stats")}
              </button>
            </li>
          </ul>
          {isCurrent(PLAY) && 
          <ul className="navbar-nav">
            <li className="nav-item">
            <StyledButton 
                        className="btn btn-primary btn-lg" 
                        onClick={() => handleOnOptionClick(PLAY + '/' + SINGLEPLAYERMODES)}>
                            <i class="bi bi-puzzle"/>
                            {t('playPage/buttons/singlePlayer')}
                            <i class="bi bi-puzzle"/>
            </StyledButton>
            </li>
            <li className="nav-item">
               <StyledButton 
                className="btn btn-primary btn-lg">
                    <i class="bi bi-globe-europe-africa"/>
                    {t('playPage/buttons/multiPlayer')}
                    <i class="bi bi-globe-americas"/>
            </StyledButton>
            </li>
          </ul>}
        </div>
    </div>
  </nav>
}

export default Navbar;