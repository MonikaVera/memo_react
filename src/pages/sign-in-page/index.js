import { useEffect, useState } from "react";
import useSignIn from "./useSignIn";
import { HOME } from "../../config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../common/AuthContext";
import { StyledFrom } from "../styles/styles";
import { t } from "../../common/translation";
import Error from "../../common/Error";

const SignIn = () => {
    const [toSend, setToSend] = useState({emailOrUsername:"", password: ""});
    const { error, data, getSignInData } = useSignIn();
    const navigate = useNavigate();
    const { handleSignIn } = useAuth(); 

    useEffect(() => {
        if(data!==null && error === null) {
            handleSignIn(data);
            navigate(HOME);
        }
    }, [data, handleSignIn, navigate, error]);

    const handleCLickOnSend = (e) => {
        e.preventDefault();
        const {emailOrUsername, password} = toSend;
        getSignInData(emailOrUsername, password);
    }
    
    const handleChange = (e) => {
        const { id, value } = e.target;
        setToSend(prevData => ({
            ...prevData,
            [id]: value
        }));
    }

    return <div>
        <div className="container">
            <h1>{t("signInPage/title")}</h1>
            <StyledFrom className="border p-3 border-primary">
                <div className="mb-3">
                    <label className="form-label" htmlFor="emailOrUsername">{t("signInPage/labelUserOrEmail")}</label>
                    <input 
                        type="text" 
                        id="emailOrUsername" 
                        value={toSend.emailOrUsername} 
                        onChange={handleChange}
                        className="form-control border-primary"/>
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="password">{t("signInPage/labelPassword")}</label>
                    <input 
                        id="password" 
                        type="password" 
                        value={toSend.password} 
                        onChange={handleChange}
                        className="form-control border-primary"/> 
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleCLickOnSend}>{t("signInPage/button")}</button>  
            </StyledFrom>
            <Error>{error}</Error>    
        </div>
    </div>
}

export default SignIn;