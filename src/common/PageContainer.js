import { HOME, REGISTER, SIGNIN } from "../config";
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

    return isPageAvailable() ? <div>
        <BackgroundContainer/>
        <ContentContainer className="container">
            {children}
        </ContentContainer>
    </div> : <Navigate to={HOME}/>
}

export default PageContainer;