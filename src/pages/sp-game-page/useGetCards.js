import { useState } from 'react';
import axios from 'axios';
import { LINK } from "../../config";
import { useAuth } from "../../common/AuthContext";
import errorGetter from '../../common/errorGetter';

/**
 * Custom hook to fetch data when making a move in a single player game.
 * @returns {object} An object containing error, data, and getCards function.
 */
const useGetCards = () => {
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const { token } = useAuth();

    /**
     * Function to fetch fetch data when making a move in a single player game.
     * @param {string} sessionId - Session ID of the game.
     * @param {number} index - Index of the card to fetch.
     */
    const getCards = async (sessionId, index) => {
        try {
            const response = await axios.post(LINK + '/api/singlePlayer/getCard/' + sessionId,
            { 
                index: index
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setData(response.data);
        } catch (errorCards) {
            setError(errorGetter(errorCards));
        }
    };

    return { error, data, getCards };
};

export default useGetCards;