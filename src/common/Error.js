import { StyledDiv } from "../pages/styles/styles";

const Error = ({children}) => {
    return children!==null ? (
        <StyledDiv className="alert alert-danger m-1" role="alert">{children}</StyledDiv>
    ) : null
}

export default Error;