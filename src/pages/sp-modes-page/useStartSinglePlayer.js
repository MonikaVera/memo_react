import { useState } from 'react';
import axios from 'axios';
import { LINK } from "../../config";
import { useAuth } from "../../common/AuthContext";
import errorGetter from '../../common/errorGetter';

/**
 * Custom hook for starting a single player game session.
 * @returns {object} An object containing error, data, and a function to start single player game.
 */
const useStartSinglePlayer = () => {
    const [errorStartSP, setErrorStartSP] = useState(null);
    const [dataStartSP, setDataStartSP] = useState(null);
    const { token } = useAuth();

    /**
     * Function to initiate a single player game session.
     * @param {number} pairs - Number of pairs in the game.
     * @param {number} time - Time limit in minutes for the game.
     */
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
            setErrorStartSP(errorGetter(errorStartSP));
        }
    };
    return { errorStartSP, dataStartSP, getSinglePlayerStart };
};

export default useStartSinglePlayer;