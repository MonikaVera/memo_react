import { useState } from "react";
import axios from "axios";
import { LINK } from "../../config";

const useSignIn = () => {
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const getSignInData = async (emailOrUsername, password) => {
        console.log(emailOrUsername);
        console.log(password);
        let email = null;
        let userName = null;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmail = emailRegex.test(emailOrUsername);
        if(isEmail) {
            email = emailOrUsername;
        } else {
            userName = emailOrUsername;
        }
        try {
            const response = await axios.post(LINK + '/api/signIn', {username: userName, email: email, password: password});
            setData(response.data);
            console.log(response.data);
            setError(null);
        } catch (error) {
            if (error.response) {
                if (error.response && error.response.status === 401) {
                    const responseData = error.response.data;
                    if (responseData.isEmailOrUserNameCorrect === false) {
                        setError("Incorrect email or username.");
                    } else if (responseData.isPasswordCorrect === false) {
                        setError("Incorrect password.");
                    } else {
                        setError("An error occurred. Please try again later.");
                    }
                } else {
                    setError("Network error. Please check your connection and try again.");
                }
            }
        }
    };

    return { error, data, getSignInData };
}

export default useSignIn;