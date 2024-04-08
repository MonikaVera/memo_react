import { StyledOption } from "../styles/styles";
import { t } from "../../common/translation";

const Option = ({title, pairs, min, handleOptionSelect, description}) => {
    return ( 
        <div className="card m-3 border-dark text-bg-secondary" style={{width: "20em"}}>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p className="card-text">{description}</p>
                <StyledOption className="btn btn-primary fs-4" onClick={() => handleOptionSelect(pairs, min)}>
                    <div>
                        <i className="bi bi-play-circle"></i>
                        {` Start (${pairs} ${t('singlePlayerModesPage/pairs')} ${min} ${t('singlePlayerModesPage/min')})`}
                    </div>
                </StyledOption>
            </div>
        </div>
    );
}

export default Option;