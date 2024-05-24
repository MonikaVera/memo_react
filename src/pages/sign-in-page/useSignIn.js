import { useState } from "react";
import axios from "axios";
import { LINK } from "../../config";
import errorGetter from "../../common/errorGetter";

/**
 * Custom hook for handling user sign-in functionality.
 * Sends a POST request to the server to authenticate the user.
 * @returns {object} An object containing error state, data state, and a function to retrieve sign-in data.
 */
const useSignIn = () => {
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    /**
     * Sends a POST request to the server to authenticate the user.
     * @param {string} emailOrUsername - The user's email or username.
     * @param {string} password - The user's password.
     */
    const getSignInData = async (emailOrUsername, password) => {
        let email = null;
        let userName = null;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmail = emailRegex.test(emailOrUsername);
        if(isEmail) {
            email = emailOrUsername;
        } else {
            userName = emailOrUsername;
        }
        try {
            const response = await axios.post(LINK + '/api/signIn', {username: userName, email: email, password: password});
            setData(response.data);
            setError(null);
        } catch (error) {
            setError(errorGetter(error));
        }
    };

    return { error, data, getSignInData };
}

export default useSignIn;