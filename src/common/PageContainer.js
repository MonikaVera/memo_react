import { HOME, REGISTER, SIGNIN, PLAY, SINGLEPLAYERMODES, MULTYPLAYERMODES } from "../config";
import { ContentContainer, BackgroundContainer } from "../styles/styles";
import { useAuth } from "./AuthContext";
import { Navigate, useLocation } from "react-router-dom";

/**
 * Container component for pages, controlling access and layout based on authentication status and current location.
 * @param {Object} children - React children components to be rendered within the container.
 * @returns {JSX.Element} - JSX element representing the page container with appropriate layout and access control.
 */
const PageContainer = ({children}) => {
    const {isAuthenticated} = useAuth();
    const location = useLocation();

    /**
     * Checks if the current page is accessible based on authentication status and location.
     * @returns {boolean} - True if the page is accessible, false otherwise.
     */
    function isPageAvailable() {
        if(isAuthenticated ||
            location.pathname===HOME ||
            location.pathname===REGISTER ||
            location.pathname===SIGNIN) {
            return true;
        } 
        return false;
    }

    /**
     * Checks if the current page is a game page.
     * @returns {boolean} - True if the page is a game page, false otherwise.
     */
    function isGamePage() {
        const regex = new RegExp(`^${PLAY}/${SINGLEPLAYERMODES}/(\\d+)/(\\d+)/([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$`);
        const regex2 = new RegExp(`^${PLAY}/${MULTYPLAYERMODES}`)
        return (regex.test(location.pathname) || regex2.test(location.pathname) 
            || location.pathname===SIGNIN || location.pathname===REGISTER);
    }

    return isPageAvailable() ? (
        isGamePage() ? (
            <div>
                <BackgroundContainer/>
                <div className="d-flex flex-column align-items-center">
                  {children}  
                </div>
            </div>
        ) : (
            <div>
                <BackgroundContainer/>
                <ContentContainer className="container">
                    {children}
                </ContentContainer>
            </div>
        )
    ) : <Navigate to={HOME}/>
}

export default PageContainer;