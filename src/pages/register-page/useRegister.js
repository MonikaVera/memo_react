import { useState } from "react";
import axios from "axios";
import { LINK } from "../../config";

const useRegister = () => {
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(null);

    const getSignInData = async (email, userName, password) => {
        try {
            const response = await axios.post(LINK + '/api/register', {username: userName, email: email, password: password});
            setStatus(response.status);
        } catch (error) {
            if (error.response) {
                const responseData = error.response.data;
                setError(responseData);
            } else {
                setError(error);
            }
        }
    };

    return { error, status, getSignInData };
}

export default useRegister;