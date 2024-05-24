import { useState } from "react";
import { useAuth } from "../../common/AuthContext";
import axios from 'axios';
import { LINK } from "../../config";
import errorGetter from "../../common/errorGetter";

/**
 * Custom hook for fetching all single player games.
 * @returns {object} An object containing error, data, and a function to fetch all single player games.
 */
const useGetSinglePlayerAllGames = () => {
    const [errorSPAll, setErrorSPAll] = useState(null);
    const [dataSPAll, setDataSPAll] = useState(null);
    const { token } = useAuth();

    /**
     * Function to fetch all single player games.
     * @param {number} page - The page number for pagination.
     * @param {number} size - The number of items per page.
     */
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
            setErrorSPAll(errorGetter(errorSPAll));
        }
    };
    return { errorSPAll, dataSPAll, getSinglePlayerAllGames };
};

export default useGetSinglePlayerAllGames;