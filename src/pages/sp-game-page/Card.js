import { StyledCard } from "./styles";
const Card = ({index, num, handleOnCardClicks, isClickable, isActive, pairs}) => {
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
        >{num}</StyledCard>
    )
};

export default Card;