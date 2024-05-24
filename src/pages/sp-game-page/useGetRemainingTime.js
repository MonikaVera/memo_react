import { useState } from 'react';
import axios from 'axios';
import { LINK } from "../../config";
import { useAuth } from "../../common/AuthContext";
import errorGetter from '../../common/errorGetter';

/**
 * Custom hook to fetch remaining time for a single player game.
 * @returns {object} An object containing errorRT, dataRT, and getRemainingTime function.
 */
const useGetRemainingTime = () => {
    const [errorRT, setError] = useState(null);
    const [dataRT, setData] = useState(null);
    const { token } = useAuth();

    /**
     * Function to fetch remaining time data for a single player game.
     * @param {string} sessionId - Session ID of the game.
     */
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
            setError(errorGetter(errorRT));
        }
    };

    return { errorRT, dataRT, getRemainingTime };
};

export default useGetRemainingTime;