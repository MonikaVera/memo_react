import { useState } from 'react';
import axios from 'axios';
import { LINK } from "../../config";
import { useAuth } from "../../common/AuthContext";

const useStartSinglePlayer = () => {
    const [errorR, setError] = useState(null);
    const [data, setData] = useState(null);
    const { token } = useAuth();

    const getSinglePlayerStart = async (pairs, time) => {
        try {
            const response = await axios.post(LINK + '/api/singlePlayer/startSinglePlayer', 
            { 
                initialTime: time * 60, 
                numberOfPairs: pairs 
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setData(response.data);
            setError(null);
        } catch (errorR) {
            if (errorR.response) {
                const responseData = errorR.response.data;
                const { status, error } = responseData;
                setError(status + " " + error);
            } else {
                setError("An unexpected error occurred.");
            }
        }
    };
    return { errorR, data, getSinglePlayerStart };
};

export default useStartSinglePlayer;