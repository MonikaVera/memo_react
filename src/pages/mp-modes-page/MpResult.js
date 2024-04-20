import { t } from "../../common/translation";

const MpResult = ({receivedInfo}) => {
    return receivedInfo.gameStarted ?
        <div className="card m-3 border-dark text-bg-secondary" style={{width: "100%"}}>
            <div className="card-body">
                <h2 className="card-title">
                    <i class="bi bi-stars"/>
                    {' ' + t('multiPlayerPage/result/title') + ' '}
                    <i class="bi bi-stars"/>
                </h2>
                {receivedInfo.winner==='draw' ? 
                    <div className="card-text">{receivedInfo.winner}</div>
                :
                    <div className="card-text">
                        {t('multiPlayerPage/result/winner') + ' '}
                        <i class="bi bi-trophy"/>
                        {' ' + receivedInfo.winner + ' '}
                        <i class="bi bi-trophy"/>
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
        
    : null
}

export default MpResult;