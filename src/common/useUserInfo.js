import { useState } from "react";
import axios from 'axios';
import { LINK } from "../config";

/**
 * Custom hook for fetching user information from the server.
 * This hook handles the API request to retrieve user information.
 * @returns {object} - Object containing error state, user data, and function to fetch user info.
 */
const useUserInfo = () => {
    const [errorUser, setError] = useState(null);
    const [data, setData] = useState(null);

    /**
     * Function to fetch user information from the server.
     * This function sends a request to the server to retrieve user information.
     * @param {string} newToken - User authentication token.
     */
    const getUserInfo = async (newToken) => {
        try {
            const response = await axios.post(LINK + '/api/getUserInfo',
                null,
                {
                    headers: {
                        'Authorization': `Bearer ${newToken}`
                    }
                });
                setData(response.data);
            } catch (errorU) {
                if (errorU.response) {
                    const responseData = errorU.response.data;
                    const { error } = responseData;
                    setError(error);
                } else {
                    setError("An unexpected error occurred.");
                }
            }
        };
    return { errorUser, data, getUserInfo };
}

export default useUserInfo;