import { useState } from "react";
import axios from "axios";
import { LINK } from "../../config";
import { useAuth } from "../../common/AuthContext";
import errorGetter from "../../common/errorGetter";

const useLeaderboard = () => {
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const { token } = useAuth();

    const getLeaderboard = async (numOfPairs) => {
        try {
            const response = await axios.post(LINK + '/api/multiPlayerStatistics',
            null, 
            {
                params: {
                    pairs: numOfPairs
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
                setData(response.data);
        } catch (error) {
            setError(errorGetter(error));
        }
    }
    return {data, error, getLeaderboard};
}

export default useLeaderboard;