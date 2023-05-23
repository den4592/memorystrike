import { useStopwatch } from "react-timer-hook";
import "./index.scss";
import PlayButton from "../../../assets/svgs/play.svg";
import PauseButton from "../../../assets/svgs/pause.svg";
import { useEffect } from "react";

interface Props {
  playTimer: boolean;
  setPlayTimer: React.Dispatch<React.SetStateAction<boolean>>;
  pauseTimer: boolean;
  setPauseTimer: React.Dispatch<React.SetStateAction<boolean>>;
  setShuffledDuration: React.Dispatch<React.SetStateAction<string>>;
}

const Timer = ({
  playTimer,
  setPlayTimer,
  pauseTimer,
  setPauseTimer,
  setShuffledDuration,
}: Props) => {
  const { seconds, minutes, hours, isRunning, start, pause } = useStopwatch({
    autoStart: false,
  });

  const handlePlayButtonOnCardOpen = () => {
    playTimer ? start() : pause();
  };

  useEffect(() => {
    setShuffledDuration(`${hours}:${minutes}:${seconds}`);
  }, [hours, minutes, seconds, setShuffledDuration]);

  useEffect(() => {
    handlePlayButtonOnCardOpen();
  }, [playTimer, pauseTimer]);

  return (
    <div className="timer">
      <div className="timer-container">
        <div className="timer-container-text">{hours}</div>:
        <div className="timer-container-text">{minutes}</div>:
        <div className="timer-container-text">{seconds}</div>
        <div
          className="timer-container-btn-play"
          onClick={
            isRunning
              ? () => {
                  pause();
                  setPlayTimer(false);
                  setPauseTimer(true);
                }
              : () => {
                  start();
                  setPlayTimer(true);
                  setPauseTimer(false);
                }
          }
        >
          {isRunning ? <PauseButton /> : <PlayButton />}
        </div>
      </div>
    </div>
  );
};

export default Timer;
