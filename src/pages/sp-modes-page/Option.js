import { StyledOption } from "../../styles/styles";
import { t } from "../../common/translation";
import { StyledDiv } from "../../styles/styles";

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