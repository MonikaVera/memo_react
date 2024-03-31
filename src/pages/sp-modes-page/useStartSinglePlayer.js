import { useState } from 'react';
import axios from 'axios';
import { LINK } from "../../config";
import { useAuth } from "../../common/AuthContext";

const useStartSinglePlayer = () => {
    const [errorStartSP, setErrorStartSP] = useState(null);
    const [dataStartSP, setDataStartSP] = useState(null);
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
            setDataStartSP(response.data);
            setErrorStartSP(null);
        } catch (errorStartSP) {
            if (errorStartSP.response) {
                const responseData = errorStartSP.response.data;
                const { status, error } = responseData;
                setErrorStartSP(status + " " + error);
            } else {
                setErrorStartSP("An unexpected error occurred.");
            }
        }
    };
    return { errorStartSP, dataStartSP, getSinglePlayerStart };
};

export default useStartSinglePlayer;