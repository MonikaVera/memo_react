import { StyledOption } from "../styles/styles";
import { t } from "../../common/translation";

const Option = ({title, pairs, min, handleOptionSelect}) => {
    return( <StyledOption className="btn btn-secondary fs-3" onClick={() => handleOptionSelect(pairs, min)}>
        <div>
            <i class="bi bi-play-circle"></i>
            {' ' + title}
        </div>
        <div className="opacity-50">({pairs} {t('singlePlayerModesPage/pairs')} {min} {t('singlePlayerModesPage/min')})</div>
    </StyledOption>);
}

export default Option;