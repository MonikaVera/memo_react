import { useState } from 'react';
import axios from 'axios';
import { LINK } from "../../config";
import { useAuth } from "../../common/AuthContext";

const useStartSinglePlayer = () => {
    const [error, setError] = useState(null);
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
        } catch (error) {
            setError(error);
        }
    };
    return { error, data, getSinglePlayerStart };
};

export default useStartSinglePlayer;