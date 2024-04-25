import { StyledOption } from "../../styles/styles";
import { t } from "../../common/translation";

const JoinCard = ({title, desc, joinGame, pairs}) => {
    return (
        <div className="card m-3 border-dark text-bg-secondary">
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p className="card-text">{desc}</p>
                <StyledOption className="btn btn-primary fs-4" onClick={() => joinGame(pairs, false, null)}>
                    <div>
                        <i className="bi bi-play-circle"/>
                        {` ${t('multiPlayerPage/join/join')} (${pairs} ${t('multiPlayerPage/join/pairs')})`}
                    </div>
                </StyledOption>
            </div>
        </div>
    )
}

export default JoinCard;