import { useEffect, useState } from "react";
import useSignIn from "./useSignIn";
import { HOME } from "../../config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../common/AuthContext";
import { t } from "../../common/translation";
import Error from "../../common/Error";
import PageContainer from "../../common/PageContainer";
import { SmallContentContainer } from "../../styles/styles";

/**
 * Component for user sign-in functionality.
 * Handles user authentication and redirects to the home page upon successful sign-in.
 * @returns {JSX.Element} The sign-in form component.
 */
const SignIn = () => {
    /* State variables for user input and sign-in data **/
    const [toSend, setToSend] = useState({emailOrUsername:"", password: ""});
    const { error, data, getSignInData } = useSignIn();
    const navigate = useNavigate();
    const { handleSignIn } = useAuth(); 

    
    /* Effect hook to handle sign-in data and redirection upon successful sign-in **/
    useEffect(() => {
        if(data!==null && error === null) {
            handleSignIn(data);
            navigate(HOME);
        }
    }, [data, handleSignIn, navigate, error]);

    /**
     * Handles the form submission to initiate sign-in process.
     * @param {Event} e - The form submit event.
     */
    const handleCLickOnSend = (e) => {
        e.preventDefault();
        const {emailOrUsername, password} = toSend;
        getSignInData(emailOrUsername, password);
    }
    
    /**
     * Handles changes in the form input fields.
     * @param {Event} e - The input change event.
     */
    const handleChange = (e) => {
        const { id, value } = e.target;
        setToSend(prevData => ({
            ...prevData,
            [id]: value
        }));
    }

    return (
        <PageContainer>
            <SmallContentContainer $smallMT='4.5em'>
                <h1>{t("signInPage/title")}</h1>
                <form className="border p-3 border-dark mb-3">
                    <div className="mb-3">
                        <label className="form-label" htmlFor="emailOrUsername">{t("signInPage/labelUserOrEmail")}</label>
                        <input 
                            type="text" 
                            id="emailOrUsername" 
                            value={toSend.emailOrUsername} 
                            onChange={handleChange}
                            className="form-control border-dark"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="password">{t("signInPage/labelPassword")}</label>
                        <input 
                            id="password" 
                            type="password" 
                            value={toSend.password} 
                            onChange={handleChange}
                            className="form-control border-dark"/> 
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleCLickOnSend}>{t("signInPage/button")}</button>  
                </form>
                <Error>{error}</Error>    
            </SmallContentContainer>
        </PageContainer>
    );
}

export default SignIn;