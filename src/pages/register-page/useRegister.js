import { useState } from "react";
import axios from "axios";
import { LINK } from "../../config";

const useRegister = () => {
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const getSignInData = async (email, userName, password) => {
        try {
            const response = await axios.post(LINK + '/api/register', {username: userName, email: email, password: password});
            setData(response.data);
        } catch (error) {
            setError(error);
        }
    };

    return { error, data, getSignInData };
}

export default useRegister;