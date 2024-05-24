import { useState } from "react";
import axios from "axios";
import { LINK } from "../../config";

/**
 * Custom hook for user registration functionality.
 * Handles sending registration data to the server and manages error and status states.
 * @returns {Object} An object containing error, status, and getRegisterData function.
 */
const useRegister = () => {
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(null);

    /**
     * Sends registration data to the server.
     * @param {string} email - The user's email address.
     * @param {string} userName - The user's username.
     * @param {string} password - The user's password.
     */
    const getRegisterData = async (email, userName, password) => {
        try {
            const response = await axios.post(LINK + '/api/register', {username: userName, email: email, password: password});
            setStatus(response.status);
        } catch (error) {
            if (error.response) {
                const responseData = error.response.data;
                setError(responseData);
            } else {
                setError("An unexpected error occurred.");
            }
        }
    };

    return { error, status, getRegisterData };
}

export default useRegister;