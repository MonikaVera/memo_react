import { useState } from 'react';
import axios from 'axios';
import { LINK } from "../../config";
import { useAuth } from "../../common/AuthContext";

const useGetCards = () => {
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const { token } = useAuth();

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
            if (errorCards.response) {
                const responseData = errorCards.response.data;
                const { status, error } = responseData;
                setError(status + " " + error);
            } else {
                setError("An unexpected error occurred.");
            }
        }
    };

    return { error, data, getCards };
};

export default useGetCards;