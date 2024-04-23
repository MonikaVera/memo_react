import { useState, useEffect, useRef} from "react";
import { CardContainer} from "../../styles/styles";
import useGetCards from "./useGetCards";
import GameOver from "./GameOver";
import GameCard from "../../common/GameCard";
import GameTimer from "./GameTimer";
import { useParams } from "react-router-dom";
import useGetRemainingTime from "./useGetRemainingTime";
import Error from "../../common/Error";
import PageContainer from "../../common/PageContainer";

const SinglePlayerGame = () => {
    const { pairs, time, sessionId } = useParams();

    const [timeSec, setTime] = useState(time * 60);
    const [isTurn, setTurn] = useState(true);
    const [board, setBoard] = useState(new Array(pairs*2).fill(null));

    const isClickable = useRef(true);
    const evenForSec = useRef(true);

    const { error, data, getCards } = useGetCards();
    const { errorRT, dataRT, getRemainingTime } = useGetRemainingTime();
    
    useEffect(() => {
        if (data !== null) {
            setTime(data.remainingTime);
            setBoard(data.guessedBoard);
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
        if(data!==null) {
            const numOfCards = Object.keys(data.cards).length;
            if ((index.toString() in data.cards) && ((numOfCards===2 && isTurn) || (numOfCards===1))) {
                isActive = true;
            }
        }
        return isActive;
    }

    function getNum(num, index) {
        if(num!==null) {
            return num;
        }
        if(data!==null) {
            const numOfCards = Object.keys(data.cards).length;
            if((data.cards.hasOwnProperty(index.toString())) && ((numOfCards===2 && isTurn) || (numOfCards===1))) {
                return data.cards[index.toString()];
            }
        }
        return null;
    }

    const leaveGame = () => {

    }
    
    return (
        (data==null || (data.ended!==null && data.ended===false)) && (dataRT==null || dataRT.remainingTime!==0)? (
                <PageContainer>
                    <GameTimer timeSec={timeSec} sessionId={sessionId} pairs={pairs} leaveGame={leaveGame} guessed={data ? data.numOfGuessed : '0'}/>
                    <CardContainer $pairs={parseInt(pairs)}>
                        {board.map((num, index) => (
                            <GameCard 
                                key={index} 
                                index={index} 
                                num={getNum(num, index)} 
                                isActive={isActiveCard(index)} 
                                isClickable={isClickable.current} 
                                handleOnCardClicks={handleOnCardClicks} 
                                pairs={parseInt(pairs)}
                            />
                        ))}
                    </CardContainer>
                    <Error>{error}</Error>
                </PageContainer>
            ) : (
            <PageContainer>
                <GameOver won={(data!=null && data.won)}></GameOver>
                <Error>{errorRT}</Error>
            </PageContainer>
        )     
    );
}

export default SinglePlayerGame;