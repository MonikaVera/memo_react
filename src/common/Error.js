import { StyledDiv } from "../styles/styles";

const Error = ({children}) => {
    return children!==null ? (
        <StyledDiv className="alert alert-danger mt-2 border-danger" role="alert" $width='fit-content'>
            <i className="bi bi-x-circle"/> {children}
        </StyledDiv>
    ) : null
}

export default Error;