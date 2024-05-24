import { StyledDiv } from "../styles/styles";

/**
 * Component to display error messages.
 * @param {string} children - Error message to display.
 * @returns {JSX.Element|null} - Error message component.
 */
const Error = ({children}) => {
    return children!==null ? (
        <StyledDiv className="alert alert-danger mt-2 border-danger" role="alert" $width='fit-content'>
            <i className="bi bi-x-circle"/> {children}
        </StyledDiv>
    ) : null
}

export default Error;