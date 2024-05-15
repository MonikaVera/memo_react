import { useState, useEffect } from "react";
import useRegister from "./useRegister";
import { SIGNIN } from "../../config";
import { useNavigate } from "react-router-dom";
import { t } from "../../common/translation";
import Error from "../../common/Error";
import PageContainer from "../../common/PageContainer";
import { SmallContentContainer } from "../../styles/styles";

const Register = () => {
    const [toSend, setToSend] = useState({email:"", username:"", password: ""});
    const { error, status, getRegisterData } = useRegister();
    const [ clientError, setClientError ] = useState(null);
    const EMAIL_REGEX = /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/;
    const navigate = useNavigate();

    useEffect(() => {
        if(status===200) {
            navigate(SIGNIN);
        }
    }, [navigate, status]);

    const handleCLickOnSend = (e) => {
        e.preventDefault();
        const {email, username, password} = toSend;

        if(username.length<4) setClientError("Username must be at least 4 characters long!");
        else if(password.length<6) setClientError("Password must be at least 6 characters long!");
        else if(/\s/.test(username)) setClientError("Username must not contain whitespaces!");
        else if(/\s/.test(password)) setClientError("Password must not contain whitespaces!");
        else if(!EMAIL_REGEX.test(email)) setClientError("Incorrect email format!");
        else getRegisterData(email, username, password);
    }
    
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
                <h1>{t("registerPage/title")}</h1>
                <form className="border p-3 mb-3 border-dark">
                    <div className="mb-3">
                        <label className="form-label" htmlFor="email">{t("registerPage/labelEmail")}</label>
                        <input 
                            className="form-control border-dark"
                            type="text" 
                            id="email" 
                            value={toSend.email} 
                            onChange={handleChange}
                            placeholder="example@stmail.com"/>  
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="username">{t("registerPage/labelUser")}</label>
                        <input 
                            className="form-control border-dark"
                            type="text" id="username" 
                            value={toSend.username} 
                            onChange={handleChange}
                            placeholder="john_doe_0720"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="password">{t("registerPage/labelPassword")}</label>
                        <input 
                            className="form-control border-dark"
                            id="password" 
                            type="password" 
                            value={toSend.password} 
                            onChange={handleChange}/>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleCLickOnSend}>{t("registerPage/button")}</button>
                </form>
                <Error>{error}</Error>
                <Error>{clientError}</Error>
            </SmallContentContainer>
        </PageContainer>
    );
}

export default Register;