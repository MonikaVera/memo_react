import { GameOverContentContainer } from "../styles/styles";

const ReceivedInfo = ({receivedInfo}) => {
    return (
        receivedInfo ? (
            <GameOverContentContainer>
                {receivedInfo.gameOver ? (
                    <div>Winner: {receivedInfo.winner}</div> 
                ) : (
                    <div>
                        <div>Players:</div>
                        <div>{receivedInfo.player1Name}</div>
                        <div>{receivedInfo.player2Name}</div>
                        <div>{receivedInfo.turn}'s turn</div>
                        <div>{receivedInfo.player1GuessedCards}</div>
                        <div>{receivedInfo.player2GuessedCards}</div>
                    </div>
                )}
            </GameOverContentContainer>
        ) : (null)
    )
}

export default ReceivedInfo;