import { TimerContainer } from "./styles";

const GameTimer = ({timeSec, sessionId}) => {
    const minutes = Math.floor(timeSec / 60);
    const seconds = timeSec % 60;
  
    return (
      <TimerContainer>
        <p>{`${minutes} : ${seconds}`}</p>
      </TimerContainer>
    );
}

export default GameTimer;