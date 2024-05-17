import { useState } from "react";
import axios from "axios";
import { LINK } from "../../config";
import errorGetter from "../../common/errorGetter";

const useMultiPlayerStart = () => {
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const getmultiPlayerStart = async (numOfPairs) => {
        try {
            const response = await axios.post(LINK + '/api/multiplayer/index', numOfPairs, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
                setData(response.data);
        } catch (error) {
            setError(errorGetter(error));
        }
    }
    return {data, error, getmultiPlayerStart};
}

export default useMultiPlayerStart;