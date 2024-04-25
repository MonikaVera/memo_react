import { StyledDiv, StyledOption } from "../../styles/styles";
import { t } from "../../common/translation";
import { useState } from "react";

const FriendCard = ({joinGame}) => {
    const [toSend, setToSend] = useState({gameId : ""});
    const handleChange = (e) => {
        const { id, value } = e.target;
        setToSend(prevData => ({
            ...prevData,
            [id]: value
        }));
    }

    return (
        <div className="card m-3 border-dark text-bg-secondary">
            <div className="card-body">
                <h2 className="card-title">{t("multiPlayerPage/join/friendCard/title")}</h2>
                <p className="card-text">{t("multiPlayerPage/join/friendCard/desc")}</p>
                <div className="d-flex flex-wrap justify-content-around">
                    <div>    
                        <h3>{t("multiPlayerPage/join/friendCard/createLobby/title")}</h3>
                        <StyledOption className="btn btn-primary fs-4 mb-3" onClick={() => joinGame(8, true, null)}>
                            <div>
                                <i className="bi bi-play-circle"/>
                                {` ${t('multiPlayerPage/join/friendCard/createLobby/button')} 8 (${t('multiPlayerPage/join/pairs')})`}
                            </div>
                        </StyledOption>
                        <StyledOption className="btn btn-primary fs-4 mb-3" onClick={() => joinGame(16, true, null)}>
                            <div>
                                <i className="bi bi-play-circle"/>
                                {` ${t('multiPlayerPage/join/friendCard/createLobby/button')} 16 (${t('multiPlayerPage/join/pairs')})`}
                            </div>
                        </StyledOption>
                        <StyledOption className="btn btn-primary fs-4 mb-3" onClick={() => joinGame(24, true, null)}>
                            <div>
                                <i className="bi bi-play-circle"/>
                                {` ${t('multiPlayerPage/join/friendCard/createLobby/button')} 24 (${t('multiPlayerPage/join/pairs')})`}
                            </div>
                        </StyledOption>
                    </div>
                    <StyledDiv $width="22.5em">
                        <h3>{t('multiPlayerPage/join/friendCard/joinLobby/title')}</h3>
                        <form className="border p-3 mb-3 border-dark">
                            <div className="mb-3">
                                <label className="form-label" htmlFor="gameId">
                                    {t('multiPlayerPage/join/friendCard/joinLobby/gameId')}
                                </label>
                                <input 
                                    className="form-control border-dark"
                                    type="text" id="gameId" 
                                    value={toSend.gameId} 
                                    onChange={handleChange}
                                    placeholder="db35a3a7-496e-4a21-971b-de22f4c2dd8c"/>
                            </div>
                            <StyledOption className="btn btn-primary fs-4" onClick={() => joinGame(null, true, toSend.gameId)}>
                                <div>
                                    <i className="bi bi-play-circle"/>
                                    {' ' + t('multiPlayerPage/join/friendCard/joinLobby/button')}
                                </div>
                            </StyledOption>
                        </form>
                    </StyledDiv>    
                </div>
            </div>
        </div>
    )
}

export default FriendCard;