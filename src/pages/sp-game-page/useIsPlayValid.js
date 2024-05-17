import { useState } from "react";
import axios from "axios";
import { LINK } from '../../config';
import { useAuth } from "../../common/AuthContext";
import errorGetter from "../../common/errorGetter";

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
            setError(errorGetter(errorSO));
        }
    };
    return {dataIV, errorIV, getIsPlayValid}; 
}

export default useIsPlayValid;