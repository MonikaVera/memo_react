import { useState } from "react";
import axios from 'axios';
import { LINK } from "../config";
const useUserInfo = () => {
    const [errorUser, setError] = useState(null);
    const [data, setData] = useState(null);
    const getUserInfo = async (newToken) => {
        try {
            const response = await axios.post(LINK + '/api/getUserInfo',
                null,
                {
                    headers: {
                        'Authorization': `Bearer ${newToken}`
                    }
                });
                setData(response.data);
            } catch (errorU) {
                if (errorU.response) {
                    const responseData = errorU.response.data;
                    const { error } = responseData;
                    setError(error);
                } else {
                    setError("An unexpected error occurred.");
                }
            }
        };
    return { errorUser, data, getUserInfo };
}

export default useUserInfo;