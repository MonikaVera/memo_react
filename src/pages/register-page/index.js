import { useState, useEffect } from "react";
import useRegister from "./useRegister";
import { SIGNIN } from "../../config";
import { useNavigate } from "react-router-dom";
import { StyledFrom } from "../styles/styles";
import { t } from "../../common/translation";
import Error from "../../common/Error";

const Register = () => {
    const [toSend, setToSend] = useState({email:"", username:"", password: ""});
    const { error, status, getSignInData } = useRegister();
    const navigate = useNavigate();

    useEffect(() => {
        if(status===200) {
            navigate(SIGNIN);
        }
    }, [navigate, status]);

    const handleCLickOnSend = (e) => {
        e.preventDefault();
        const {email, username, password} = toSend;
        getSignInData(email, username, password);
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
            <h1>{t("registerPage/title")}</h1>
            <StyledFrom className="border p-3 border-dark">
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
            </StyledFrom>
            <Error>{error}</Error>
        </div>
    </div>
}

export default Register;