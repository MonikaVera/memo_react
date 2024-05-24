import { useState } from "react";
import axios from "axios";
import { LINK } from '../../config';
import { useAuth } from "../../common/AuthContext";
import errorGetter from "../../common/errorGetter";

/**
 * Custom hook to check if a single player game session is valid.
 * @returns {object} An object containing errorIV, dataIV, and getIsPlayValid function.
 */
const useIsPlayValid = () => {
    const [errorIV, setError] = useState(null);
    const [dataIV, setData] = useState(null);
    const { token } = useAuth();

    /**
     * Function to check if a single player game session is valid.
     * @param {string} sessionId - Session ID of the game.
     */
    const getIsPlayValid = async (sessionId) => {
        try {
            const response = await axios.post(LINK + '/api/singlePlayer/isPlayValid/' + sessionId, {},
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setData(response.data);
        } catch (errorSO) {
            setError(errorGetter(errorSO));
        }
    };
    return {dataIV, errorIV, getIsPlayValid}; 
}

export default useIsPlayValid;