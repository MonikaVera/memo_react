import { useState, useEffect } from "react";
import useRegister from "./useRegister";
import { SIGNIN } from "../../config";
import { useNavigate } from "react-router-dom";
import { StyledFrom } from "../styles/styles";
import { t } from "../../common/translation";

const Register = () => {
    const [toSend, setToSend] = useState({email:"", username:"", password: ""});
    const { error, data, getSignInData } = useRegister();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(data);
        if(data!=null) {
            const {existingUsername, existingEmail, validEmailFormat } = data;
            if(!existingUsername && !existingEmail && validEmailFormat) {
                navigate(SIGNIN);
            }
        }
    }, [data, navigate]);

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
            <StyledFrom className="border p-3 border-primary">
                <div className="mb-3">
                    <label className="form-label" htmlFor="email">{t("registerPage/labelEmail")}</label>
                    <input 
                        className="form-control border-primary"
                        type="text" 
                        id="email" 
                        value={toSend.email} 
                        onChange={handleChange}
                        placeholder="example@stmail.com"/>  
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="username">{t("registerPage/labelUser")}</label>
                    <input 
                        className="form-control border-primary"
                        type="text" id="username" 
                        value={toSend.username} 
                        onChange={handleChange}
                        placeholder="john_doe_0720"/>
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="password">{t("registerPage/labelPassword")}</label>
                    <input 
                        className="form-control border-primary"
                        id="password" 
                        type="password" 
                        value={toSend.password} 
                        onChange={handleChange}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleCLickOnSend}>{t("registerPage/button")}</button>
            </StyledFrom>
            {error!=null ? null : <div>{error}</div>}
            {data!=null && data.existingEmail ? <div>Email already exists.</div> : null}
            {data!=null && data.existingUsername ? <div>Username already exists.</div> : null}
            {data!=null && !data.validEmailFormat ? <div>Invalid email format.</div> : null}
        </div>
    </div>
}

export default Register;