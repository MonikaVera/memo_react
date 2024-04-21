import { useState } from "react";
import axios from 'axios';
import { LINK } from "../config";
import { useAuth } from "./AuthContext";

const useUserInfo = () => {
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const { token } = useAuth();
    const getUserInfo = async () => {
        try {
            const response = await axios.post(LINK + '/api/getUserInfo',
            null,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setData(response.data);
        } catch (errorUser) {
            if (errorUser.response) {
                const responseData = errorUser.response.data;
                const { error } = responseData;
                setError(error);
            } else {
                setError("An unexpected error occurred.");
            }
        }
    };

    return { error, data, getUserInfo };
}

export default useUserInfo;