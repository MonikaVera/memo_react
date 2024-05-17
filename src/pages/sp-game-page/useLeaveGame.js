import { useState } from "react";
import axios from "axios";
import { LINK } from '../../config';
import { useAuth } from "../../common/AuthContext";
import errorGetter from "../../common/errorGetter";

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
            setError(errorGetter(errorSO));
        }
    };
    return {errorLG, dataLG, getLeaveGameData};
}

export default useLeaveGame;