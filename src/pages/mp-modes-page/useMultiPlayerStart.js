import { useState } from "react";
import axios from "axios";
import { LINK } from "../../config";

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
                console.log(response.data); // Do something with the data
                setData(response.data);
        } catch (error) {
            if (error.response) {
                const responseData = error.response.data;
                setError(responseData);
            } else {
                setError("An unexpected error occurred.");
            }
        }
    }
    return {data, error, getmultiPlayerStart};
}

export default useMultiPlayerStart;