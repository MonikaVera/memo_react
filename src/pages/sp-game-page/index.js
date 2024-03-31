import { useState, useEffect, useRef} from "react";
import { CardContainer} from "./styles";
import useGetCards from "./useGetCards";
import GameOver from "./GameOver";
import Card from "./Card";
import GameTimer from "./GameTimer";
import { Navigate, useParams } from "react-router-dom";
import useGetRemainingTime from "./useGetRemainingTime";
import { HOME } from "../../config";
import { useAuth } from "../../common/AuthContext";
import Error from "../../common/Error";

const SinglePlayerGame = () => {
    const { pairs, time, sessionId } = useParams();
    const { isAuthenticated } = useAuth();

    const [timeSec, setTime] = useState(time * 60);
    const [isTurn, setTurn] = useState(true);

    const isClickable = useRef(true);
    const evenForSec = useRef(true);

    const { error, data, getCards } = useGetCards();
    const { errorRT, dataRT, getRemainingTime } = useGetRemainingTime();
    
    useEffect(() => {
        if (data !== null) {
            console.log(JSON.stringify(data));
            if(Object.keys(data.cards).length===1) {
                setTurn(false);
            }
            if(Object.keys(data.cards).length===2) {
                if(!data.equals) {
                    isClickable.current=false;
                    evenForSec.current=false; 
                    setTurn(true);
                } else {
                    setTurn(false);
                }
            }
        }
    }, [data]);

    useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);
            
        return function cleanup() {
            clearInterval(timerID);
        };
    });

    useEffect(() => {
        if(timeSec===0 && dataRT==null) {
            getRemainingTime(sessionId);
           console.log(dataRT);
        }
    },  [timeSec, sessionId, getRemainingTime, dataRT]);

    const handleOnCardClicks = async ({index}) => {
        if(isClickable.current) {
            getCards(sessionId, index);
        }
    }
    
    function tick() {
        setTime(prevTime => prevTime - 1);
        if(isTurn) {
            if(evenForSec.current===false) {
                evenForSec.current=true;
            } else {
                setTurn(false);
                isClickable.current=true;
            }   
        }
    }

    function isActiveCard(index) {
        let isActive = false;
        const numOfCards = Object.keys(data.cards).length;
        if ((index.toString() in data.cards) && ((numOfCards===2 && isTurn) || (numOfCards===1))) {
            isActive = true;
        }
        return isActive;
    }

    function getNum(num, index) {
        if(num!==null) {
            return num;
        }
        const numOfCards = Object.keys(data.cards).length;
        if((data.cards.hasOwnProperty(index.toString())) && ((numOfCards===2 && isTurn) || (numOfCards===1))) {
            return data.cards[index.toString()];
        }
        return null;
    }
    
    return isAuthenticated ? (<div>
        {(data==null || (data.ended!==null && data.ended===false)) && (dataRT==null || dataRT.remainingTime!==0)? (
            <div>
                <CardContainer $pairs={parseInt(pairs)}>
                    <GameTimer timeSec={timeSec} sessionId={sessionId}/>
                    {data ? (data.guessedBoard.map((num, index) => (
                        <Card 
                            key={index} 
                            index={index} 
                            num={getNum(num, index)} 
                            isActive={isActiveCard(index)} 
                            isClickable={isClickable.current} 
                            handleOnCardClicks={handleOnCardClicks} 
                            pairs={parseInt(pairs)}
                        />
                    ))) : 
                    (new Array(pairs*2).fill(null)).map((num, index) => (
                        <Card 
                            key={index} 
                            index={index} 
                            num={num} 
                            isActive={false} 
                            isClickable={isClickable.current} 
                            handleOnCardClicks={handleOnCardClicks} 
                            pairs={parseInt(pairs)}
                        />
                    ))}
                </CardContainer>
            </div>
        ) : (
            <GameOver won={(data!=null && data.won)}></GameOver>)}
        <Error>{error}</Error>
        <Error>{errorRT}</Error>
    </div>) : <Navigate to={HOME}/>
}

export default SinglePlayerGame;