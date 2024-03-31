import { useState } from "react";
import { useAuth } from "../../common/AuthContext";
import axios from 'axios';
import { LINK } from "../../config";

const useGetSinglePlayerAllGames = () => {
    const [errorSPAll, setErrorSPAll] = useState(null);
    const [dataSPAll, setDataSPAll] = useState(null);
    const { token } = useAuth();

    const getSinglePlayerAllGames = async (page, size) => {
        try {
            const response = await axios.post(LINK + '/api/singlePlayerStatistics/all', 
            null,
            {
                params: {
                    page: page,
                    size: size
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setDataSPAll(response.data);
            setErrorSPAll(null);
        } catch (errorSPAll) {
            if (errorSPAll.response) {
                const responseData = errorSPAll.response.data;
                setErrorSPAll(responseData);
            } else {
                setErrorSPAll("An unexpected error occurred.");
            }
        }
    };
    return { errorSPAll, dataSPAll, getSinglePlayerAllGames };
};

export default useGetSinglePlayerAllGames;