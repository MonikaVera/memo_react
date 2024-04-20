import { useInit } from "./useInit";
import useUserInfo from "./useUserInfo";
import Error from '../../common/Error';
import MultiPlayer from ".";

const MultiPlayerGame = () => {
    const { error, data, getUserInfo } = useUserInfo();
    useInit(() => {
        getUserInfo();
    })

    return ( data!==null ?
        <MultiPlayer data={data}/>
        :
        <Error>{error}</Error>
    )
}

export default MultiPlayerGame;