import { t } from "../../common/translation";

/**
 * Component for rendering multiplayer game results.
 * @param {Object} receivedInfo - Information received from the game.
 * @returns {JSX.Element} - Multiplayer game result component.
 */
const MpResult = ({receivedInfo}) => {
    return receivedInfo && receivedInfo.gameStarted ?
        <div className="w-100 p-3">
            <div className="card border-dark text-bg-secondary w-100">
                <div className="card-body">
                    <h2 className="card-title">
                        <i className="bi bi-stars"/>
                        {' ' + t('multiPlayerPage/result/title') + ' '}
                        <i className="bi bi-stars"/>
                    </h2>
                    {receivedInfo.winner==='draw' ? 
                        <div className="card-text">
                            <i className="bi bi-trophy"/>
                            {' ' + receivedInfo.winner + ' '}
                            <i className="bi bi-trophy"/>
                        </div>
                    :
                        <div className="card-text">
                            {t('multiPlayerPage/result/winner') + ' '}
                            <i className="bi bi-trophy"/>
                            {' ' + receivedInfo.winner + ' '}
                            <i className="bi bi-trophy"/>
                        </div>
                    }
                    <div className="card-text">{receivedInfo.player1Name} {t('multiPlayerPage/result/guessed')} {receivedInfo.player1GuessedCards} {t('multiPlayerPage/result/pairs')}</div>
                    <div className="card-text">{receivedInfo.player2Name} {t('multiPlayerPage/result/guessed')} {receivedInfo.player2GuessedCards} {t('multiPlayerPage/result/pairs')}</div>
                    {receivedInfo.type==='game.left' && 
                        <div>
                            {receivedInfo.player1Name===receivedInfo.winner ? 
                                receivedInfo.player2Name 
                            : 
                                receivedInfo.player1Name
                            }
                            {t('multiPlayerPage/result/left')}
                        </div>
                    }
                </div>
            </div>       
        </div>
    : null
}

export default MpResult;