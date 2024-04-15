import { HOME, REGISTER, SIGNIN, PLAY, SINGLEPLAYERMODES, MULTYPLAYERMODES } from "../config";
import { ContentContainer, BackgroundContainer } from "../pages/styles/styles";
import { useAuth } from "./AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const PageContainer = ({children}) => {
    const {isAuthenticated} = useAuth();
    const location = useLocation();

    function isPageAvailable() {
        if(isAuthenticated ||
            location.pathname===HOME ||
            location.pathname===REGISTER ||
            location.pathname===SIGNIN) {
            return true;
        } 
        return false;
    }

    function isGamePage() {
        const regex = new RegExp(`^${PLAY}/${SINGLEPLAYERMODES}/(\\d+)/(\\d+)/([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$`);
        const regex2 = new RegExp(`^${PLAY}/${MULTYPLAYERMODES}`)
        return (regex.test(location.pathname) || regex2.test(location.pathname));
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