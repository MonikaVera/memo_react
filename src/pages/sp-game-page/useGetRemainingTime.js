import { useState } from 'react';
import axios from 'axios';
import { LINK } from "../../config";
import { useAuth } from "../../common/AuthContext";

const useGetRemainingTime = () => {
    const [errorRT, setError] = useState(null);
    const [dataRT, setData] = useState(null);
    const { token } = useAuth();

    const getRemainingTime = async (sessionId) => {
        try {
            const response = await axios.post(LINK + '/api/singlePlayer/getRemainingTime/' + sessionId, {},
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setData(response.data);
        } catch (errorRT) {
            if (errorRT.response) {
                const responseData = errorRT.response.data;
                const { status, error } = responseData;
                setError(status + " " + error);
            } else {
                setError("An unexpected error occurred.");
            }
        }
    };

    return { errorRT, dataRT, getRemainingTime };
};

export default useGetRemainingTime;