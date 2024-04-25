import { useState } from "react";
import axios from "axios";
import { LINK } from '../../config';
import { useAuth } from "../../common/AuthContext";

const useLeaveGame = () => {
    const [errorLG, setError] = useState(null);
    const [dataLG, setData] = useState(null);
    const { token } = useAuth();

    const getLeaveGameData = async (sessionId) => {
        try {
            await axios.post(LINK + '/api/singlePlayer/leaveGame/' + sessionId, {},
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setData("success");
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
    return {errorLG, dataLG, getLeaveGameData};
}

export default useLeaveGame;