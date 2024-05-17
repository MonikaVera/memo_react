import { STATS } from "../../config";
import { useLocation} from "react-router-dom";
import { useEffect, useState } from "react";
import NavbarContent from "./NavbarContent";
import { useMediaQuery } from "react-responsive";

const Navbar = () => {
    const location = useLocation();
    const [isMenuOpen, setMenuOpen] = useState(false);
    const isMobile = useMediaQuery({ maxWidth: 992});

    useEffect(() => {
      if(!isMobile) {
        setMenuOpen(false);
      }
    }, [isMobile])

    const handleOnMenuClick = () => {
      setMenuOpen(!isMenuOpen);
    }
    
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