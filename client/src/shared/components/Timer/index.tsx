import { useStopwatch } from "react-timer-hook";
import "./index.scss";
import PlayButton from "../../../assets/svgs/play.svg";
import PauseButton from "../../../assets/svgs/pause.svg";
import { useEffect, useCallback } from "react";

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

  const handleDuration = useCallback(() => {
    setShuffledDuration(`${hours}:${minutes}:${seconds}`);
  }, [hours, minutes, seconds, setShuffledDuration]);

  useEffect(() => {
    handleDuration();
  }, [hours, minutes, seconds, setShuffledDuration]);

  useEffect(() => {
    console.log("1");
  }, [handleDuration]);

  useEffect(() => {
    handlePlayButtonOnCardOpen();
  }, [playTimer, pauseTimer]);

  return (
    <div className="timer">
      <div className="timer-container">
        <div className="timer-container-left">
          <p className="timer-container-left-text">{hours}</p>
          <p className="timer-container-left-text">:</p>
          <p className="timer-container-left-text">{minutes}</p>
          <p className="timer-container-left-text">:</p>
          <p className="timer-container-left-text">{seconds}</p>
        </div>
        <div className="timer-container-right">
          <div
            className="timer-container-right-btn-play"
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
    </div>
  );
};

export default Timer;
