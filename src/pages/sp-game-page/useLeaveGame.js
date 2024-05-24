import { useState } from "react";
import axios from "axios";
import { LINK } from '../../config';
import { useAuth } from "../../common/AuthContext";
import errorGetter from "../../common/errorGetter";

/**
 * Custom hook to leave a single player game session.
 * @returns {object} An object containing errorLG, dataLG, and getLeaveGameData function.
 */
const useLeaveGame = () => {
    const [errorLG, setError] = useState(null);
    const [dataLG, setData] = useState(null);
    const { token } = useAuth();

    /**
     * Function to leave a single player game session.
     * @param {string} sessionId - Session ID of the game.
     */
    const getLeaveGameData = async (sessionId) => {
        try {
            await axios.post(LINK + '/api/singlePlayer/leaveGame/' + sessionId, {},
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setData("success");
        } catch (errorSO) {
            setError(errorGetter(errorSO));
        }
    };
    return {errorLG, dataLG, getLeaveGameData};
}

export default useLeaveGame;