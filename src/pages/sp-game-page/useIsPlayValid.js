import { useState } from "react";
import axios from "axios";
import { LINK } from '../../config';
import { useAuth } from "../../common/AuthContext";

const useIsPlayValid = () => {
    const [errorIV, setError] = useState(null);
    const [dataIV, setData] = useState(null);
    const { token } = useAuth();

    const getIsPlayValid = async (sessionId) => {
        try {
            const response = await axios.post(LINK + '/api/singlePlayer/isPlayValid/' + sessionId, {},
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setData(response.data);
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
    return {dataIV, errorIV, getIsPlayValid}; 
}

export default useIsPlayValid;