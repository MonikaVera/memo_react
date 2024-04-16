import { useState } from "react";
import axios from "axios";
import { LINK } from "../config";

const useSignOut = () => {
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const getSignOutData = async (token) => {
        try {
            const response = await axios.post(LINK + '/api/signOut', {},
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setData(response);
        } catch (errorSO) {
            if (errorSO.response) {
                const responseData = errorSO.response.data;
                const { status, error } = responseData;
                setError(status + " " + error);
            } else {
                setError("An unexpected error occurred.");
            }
        }
    };

    return { error, data, getSignOutData };
}

export default useSignOut;