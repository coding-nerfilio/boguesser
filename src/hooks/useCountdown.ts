import { useState, useEffect, useRef } from "react";

const useCountdown = (seconds: number, onCountdownEnd: () => any) => {
  const [intervalId, setIntervalId] = useState<any>(null);
  const [displayText, setDisplayText] = useState(seconds.toString());
  const [remainingSeconds, setRemainingSeconds] = useState(seconds);
  const callbackRef = useRef(onCountdownEnd);

  useEffect(() => {
    callbackRef.current = onCountdownEnd;
  }, [onCountdownEnd]);

  const tick = () => {
    setRemainingSeconds((previousValue) => {
      const newValue = previousValue - 1;
      console.log(newValue);
      if (newValue === 0) {
        pause();
        callbackRef.current();
      }
      setDisplayText(newValue.toString());
      return newValue;
    });
  };

  const start = () => {
    setIntervalId(setInterval(tick, 1000));
  };

  const pause = () => {
    clearInterval(intervalId!);
    setIntervalId(null);
  };

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId!);
      }
    };
  }, [intervalId]);

  return {
    displayText,
    remainingSeconds,
    start,
    pause,
  };
};

export default useCountdown;
