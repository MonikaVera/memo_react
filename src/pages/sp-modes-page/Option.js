import { StyledOption } from "../../styles/styles";
import { t } from "../../common/translation";
import { StyledDiv } from "../../styles/styles";

/**
 * Component for rendering an option for selecting game difficulty in single player mode.
 * @param {object} props - The props passed to the component.
 * @param {string} props.title - The title of the game difficulty.
 * @param {number} props.pairs - The number of pairs for the game difficulty.
 * @param {number} props.min - The time limit in minutes for the game difficulty.
 * @param {function} props.handleOptionSelect - The function to handle option selection.
 * @param {string} props.description - The description of the game difficulty.
 * @returns {JSX.Element} Option component
 */
const Option = ({title, pairs, min, handleOptionSelect, description}) => {
    return ( 
        <StyledDiv className="card m-3 border-dark text-bg-secondary" $width="20em">
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p className="card-text">{description}</p>
                <StyledOption className="btn btn-primary fs-4" onClick={() => handleOptionSelect(pairs, min)}>
                    <div>
                        <i className="bi bi-play-circle"></i>
                        {` ${t('singlePlayerModesPage/start')} (${pairs} ${t('singlePlayerModesPage/pairs')} ${min} ${t('singlePlayerModesPage/min')})`}
                    </div>
                </StyledOption>
            </div>
        </StyledDiv>
    );
}

export default Option;