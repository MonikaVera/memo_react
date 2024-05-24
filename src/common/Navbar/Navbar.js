import { STATS } from "../../config";
import { useLocation} from "react-router-dom";
import { useEffect, useState } from "react";
import NavbarContent from "./NavbarContent";
import { useMediaQuery } from "react-responsive";

/**
 * Component for the navigation bar.
 */
const Navbar = () => {
    const location = useLocation();
    const [isMenuOpen, setMenuOpen] = useState(false);
    const isMobile = useMediaQuery({ maxWidth: 992});

    /** Effect to close the menu when switching from mobile to desktop view.*/
    useEffect(() => {
      if(!isMobile) {
        setMenuOpen(false);
      }
    }, [isMobile])

    /** Function to handle the menu click event. */
    const handleOnMenuClick = () => {
      setMenuOpen(!isMenuOpen);
    }
    
    /**
     * Function to check if a given path is the current location.
     * @param {string} path - The path to check.
     * @returns {boolean} - True if the path matches the current location, false otherwise.
     */
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
        <button onClick={handleOnMenuClick} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <div className="navbar-toggler-icon"></div>
        </button>
        {isMenuOpen && 
          <ul className="dropdown-menu show position-static w-100 mt-2  bg-dark border-0">
            <NavbarContent isCurrent={isCurrent}/>
          </ul>
        }
      <div className="collapse navbar-collapse" id="navbarNav">
          <NavbarContent isCurrent={isCurrent}/>
      </div>
    </div>
  </nav>
}

export default Navbar;