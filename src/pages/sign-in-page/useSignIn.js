import { useState } from "react";
import axios from "axios";
import { LINK } from "../../config";
import errorGetter from "../../common/errorGetter";

const useSignIn = () => {
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const getSignInData = async (emailOrUsername, password) => {
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
            setError(null);
        } catch (error) {
            setError(errorGetter(error));
        }
    };

    return { error, data, getSignInData };
}

export default useSignIn;