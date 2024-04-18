import { useState } from "react";
import axios from "axios";
import { LINK } from "../../config";
import { useAuth } from "../../common/AuthContext";

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
                console.log(response.data);
                setData(response.data);
        } catch (error) {
            if (error.response) {
                const responseData = error.response.data;
                setError(responseData);
            } else {
                setError("An unexpected error occurred.");
            }
        }
    }
    return {data, error, getLeaderboard};
}

export default useLeaderboard;