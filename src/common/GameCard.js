import { StyledCard } from "../styles/styles";

/**
 * Component representing a game card.
 * @param {Object} props - Props passed to the component.
 * @param {number} props.index - Index of the card.
 * @param {number|null} props.num - Number on the card. Null if not revealed.
 * @param {Function} props.handleOnCardClicks - Callback function for card clicks.
 * @param {boolean} props.isClickable - Indicates if the card is clickable.
 * @param {boolean} props.isActive - Indicates if the card is active.
 * @param {number} props.pairs - Number of pairs in the game.
 * @returns {JSX.Element} - JSX element representing the game card.
 */
const GameCard = ({index, num, handleOnCardClicks, isClickable, isActive, pairs}) => {
    let isFound = true;
    if(num===null) {
        isFound=false;
    };
    const onClickHandler = (isClickable && (num===null)) ? () => handleOnCardClicks({ index: index }) : null;
    return (
        <StyledCard 
            onClick={onClickHandler} 
            $num={num} 
            $isFound={isFound} 
            $isActive={isActive} 
            $pairs={pairs}
        />
    )
};

export default GameCard;