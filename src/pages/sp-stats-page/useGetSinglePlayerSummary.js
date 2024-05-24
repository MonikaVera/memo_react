import { useState } from "react";
import { useAuth } from "../../common/AuthContext";
import axios from 'axios';
import { LINK } from "../../config";
import errorGetter from "../../common/errorGetter";

/**
 * Custom hook for fetching summarized single player game statistics.
 * @returns {object} An object containing error, data, and a function to fetch summarized statistics.
 */
const useGetSinglePlayerSummary = () => {
    const [errorSPSummary, setErrorSPSummary] = useState(null);
    const [dataSPSummary, setDataSPSummary] = useState(null);
    const { token } = useAuth();

    /**
     * Function to fetch summarized single player game statistics.
     */
    const getSinglePlayerSummary = async () => {
        try {
            const response = await axios.post(LINK + '/api/singlePlayerStatistics/summarized', {}, 
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setDataSPSummary(response.data);
            setErrorSPSummary(null);
        } catch (errorSPSummary) {
            setErrorSPSummary(errorGetter(errorSPSummary));
        }
    };
    return { errorSPSummary, dataSPSummary, getSinglePlayerSummary };
};

export default useGetSinglePlayerSummary;