import { useState, useEffect, useRef} from "react";
import { CardContainer} from "../../styles/styles";
import useGetCards from "./useGetCards";
import GameOver from "./GameOver";
import GameCard from "../../common/GameCard";
import InfoContainer from "./InfoContainer";
import { useParams } from "react-router-dom";
import useGetRemainingTime from "./useGetRemainingTime";
import Error from "../../common/Error";
import PageContainer from "../../common/PageContainer";
import useLeaveGame from "./useLeaveGame";
import { useNavigate } from "react-router-dom";
import useIsPlayValid from "./useIsPlayValid";

/**
 * Component for managing a single-player game session.
 * @returns {JSX.Element} SinglePlayerGame component
 */
const SinglePlayerGame = () => {
    const navigate = useNavigate();
    const { pairs, time, sessionId } = useParams();

    /** Time left in seconds */
    const [timeSec, setTime] = useState(time * 60);
    /** Indicates whether the player is able to turn cards up*/
    const [isTurn, setTurn] = useState(true);
    /** Represents the game board */
    const [board, setBoard] = useState(new Array(pairs*2).fill(null));
    /** Number of pairs guessed by the player */
    const [numOfGuessed, setNumOfGuessed] = useState(0);
    /** Represents the cards which should be turned up, but they are not guessed yet */
    const [cards, setCards] = useState(null);

    /** Tracks if cards are clickable */
    const isClickable = useRef(true);
    /** Tracks if it's an even second */
    const evenForSec = useRef(true);
    /** Indicates if game data has been validated */
    const [isValidated, setIsValidated] = useState(false);

    /** Fetches data for turning flipping a card*/
    const { error, data, getCards } = useGetCards();
    /** Fetches remaining time */
    const { dataRT, getRemainingTime } = useGetRemainingTime();
    /** Leaves the game */
    const { errorLG, dataLG, getLeaveGameData} = useLeaveGame();
    /** Validates game play */
    const {dataIV, getIsPlayValid} = useIsPlayValid();
    
    /** Effect to update game state based on fetched data */
    useEffect(() => {
        if (data !== null) {
            setTime(data.remainingTime);
            setBoard(data.guessedBoard);
            setNumOfGuessed(data.numOfGuessed);
            setCards(data.cards);
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

    /** Effect to update timer */
    useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);
            
        return function cleanup() {
            clearInterval(timerID);
        };
    });

    /** Effects to handle game logic and navigation */
    useEffect(() => {
        if(dataIV==null) {
            getIsPlayValid(sessionId);
        }
        if(dataIV && !dataIV.isValid) {
            navigate(-1);
        }
        if(dataIV && dataIV.isValid && !isValidated) {
            setBoard(dataIV.guessedBoard);
            setTime(dataIV.remainingTime);
            setNumOfGuessed(dataIV.numOfGuessed);
            setCards(dataIV.cards);
            setIsValidated(true);
        }
        if(timeSec===0 && dataRT==null) {
            getRemainingTime(sessionId);
        }
        if(dataLG==="success") {
            navigate(-1);
        }
    },  [timeSec, sessionId, getRemainingTime, dataRT, dataLG, navigate, dataIV, getIsPlayValid, isValidated]);

    /** 
     * Function to handle card clicks.
     * @param {Object} param - Object containing the index of the clicked card.
     */
    const handleOnCardClicks = async ({index}) => {
        if(isClickable.current) {
            getCards(sessionId, index);
        }
    }

    /** Function to update game state based on timer tick */
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

    /** 
     * Function to determine if a card is active.
     * @param {number} index - Index of the card.
     * @returns {boolean} - Indicates if the card is active.
     */
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

    /** 
     * Function to get the number on a card.
     * @param {number | null} num - Number on the card.
     * @param {number} index - Index of the card.
     * @returns {number | null} - Number on the card if available, otherwise null.
     */
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

    /** Function to leave the game */
    const leaveGame = () => {
        getLeaveGameData(sessionId);
    }
    
    return (
        (data==null || (data.ended!==null && data.ended===false)) && (dataRT==null || dataRT.remainingTime!==0)? (
                <PageContainer>
                    <InfoContainer timeSec={timeSec} pairs={pairs} leaveGame={leaveGame} guessed={numOfGuessed}/>
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
            </PageContainer>
        )     
    );
}

export default SinglePlayerGame;