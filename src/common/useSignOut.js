import { useState } from "react";
import axios from "axios";
import LINK from "../../config";
import { useAuth } from "../../common/AuthContext";

const useSignOut = () => {
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const { token } = useAuth();

    const getSignOutData = async () => {
        try {
            const response = await axios.post(LINK + '/api/signOut', {},
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setData(response.data);
        } catch (error) {
            setError(error);
        }
    };

    return { error, data, getSignOutData };
}

export default useSignOut;