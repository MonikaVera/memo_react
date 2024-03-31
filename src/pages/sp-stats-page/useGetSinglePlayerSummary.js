import { useState } from "react";
import { useAuth } from "../../common/AuthContext";
import axios from 'axios';
import { LINK } from "../../config";

const useGetSinglePlayerSummary = () => {
    const [errorSPSummary, setErrorSPSummary] = useState(null);
    const [dataSPSummary, setDataSPSummary] = useState(null);
    const { token } = useAuth();

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
            if (errorSPSummary.response) {
                const responseData = errorSPSummary.response.data;
                const { status, error } = responseData;
                setErrorSPSummary(status + " " + error);
            } else {
                setErrorSPSummary("An unexpected error occurred.");
            }
        }
    };
    return { errorSPSummary, dataSPSummary, getSinglePlayerSummary };
};

export default useGetSinglePlayerSummary;