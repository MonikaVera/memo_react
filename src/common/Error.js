import { StyledDiv } from "../pages/styles/styles";

const Error = ({children}) => {
    return children!==null ? (
        <StyledDiv className="alert alert-danger mt-2 border-danger" role="alert">
            <i className="bi bi-x-circle"/> {children}
        </StyledDiv>
    ) : null
}

export default Error;