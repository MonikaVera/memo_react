import { useState } from 'react';
import axios from 'axios';
import { LINK } from "../../config";
import { useAuth } from "../../common/AuthContext";
import errorGetter from '../../common/errorGetter';

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
            setError(errorGetter(errorCards));
        }
    };

    return { error, data, getCards };
};

export default useGetCards;