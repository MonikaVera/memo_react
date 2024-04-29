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
import useLeaveGame from "./useLeaveGame";
import { useNavigate } from "react-router-dom";
import useIsPlayValid from "./useIsPlayValid";

const SinglePlayerGame = () => {
    const navigate = useNavigate();
    const { pairs, time, sessionId } = useParams();

    const [timeSec, setTime] = useState(time * 60);
    const [isTurn, setTurn] = useState(true);
    const [board, setBoard] = useState(new Array(pairs*2).fill(null));
    const [numOfGuessed, setNumOfGuessed] = useState(0);
    const [cards, setCards] = useState(null);

    const isClickable = useRef(true);
    const evenForSec = useRef(true);

    const { error, data, getCards } = useGetCards();
    const { errorRT, dataRT, getRemainingTime } = useGetRemainingTime();
    const { errorLG, dataLG, getLeaveGameData} = useLeaveGame();
    const {dataIV, errorIV, getIsPlayValid} = useIsPlayValid();
    
    useEffect(() => {
        if (data !== null) {
            setTime(data.remainingTime);
            setBoard(data.guessedBoard);
            setNumOfGuessed(data.numOfGuessed);
            setCards(data.cards);
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
        if(dataIV==null) {
            getIsPlayValid(sessionId);
        }
        if(dataIV && !dataIV.isValid) {
            navigate(-1);
        }
        if(dataIV && dataIV.isValid && data===null) {
            setBoard(dataIV.guessedBoard);
            setTime(dataIV.remainingTime);
            setNumOfGuessed(dataIV.numOfGuessed);
            setCards(dataIV.cards);
        }
        if(timeSec===0 && dataRT==null) {
            getRemainingTime(sessionId);
        }
        if(dataLG==="success") {
            navigate(-1);
        }
    },  [timeSec, sessionId, getRemainingTime, dataRT, dataLG, navigate, dataIV, getIsPlayValid, data]);

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
        if(cards!==null) {
            const numOfCards = Object.keys(cards).length;
            if ((index.toString() in cards) && ((numOfCards===2 && isTurn) || (numOfCards===1))) {
                isActive = true;
            }
        }
        return isActive;
    }

    function getNum(num, index) {
        if(num!==null) {
            return num;
        }
        if(cards!==null) {
            const numOfCards = Object.keys(cards).length;
            if((cards.hasOwnProperty(index.toString())) && ((numOfCards===2 && isTurn) || (numOfCards===1))) {
                return cards[index.toString()];
            }
        }
        return null;
    }

    const leaveGame = () => {
        getLeaveGameData(sessionId);
    }
    
    return (
        (data==null || (data.ended!==null && data.ended===false)) && (dataRT==null || dataRT.remainingTime!==0)? (
                <PageContainer>
                    <GameTimer timeSec={timeSec} sessionId={sessionId} pairs={pairs} leaveGame={leaveGame} guessed={numOfGuessed}/>
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
                    <Error>{errorLG}</Error>
                </PageContainer>
            ) : (
            <PageContainer>
                <GameOver won={(data!=null && data.won)}></GameOver>
                <Error>{errorRT}</Error>
                <Error>{errorIV}</Error>
            </PageContainer>
        )     
    );
}

export default SinglePlayerGame;