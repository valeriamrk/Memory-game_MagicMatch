import { useCallback, useEffect, useRef, useState } from "react";

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  return `${minutes < 10 ? "0" + minutes : minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
};

export const useCountdown = (time) => {
  const [countdown, setCountdown] = useState(time);
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const intervalRef = useRef(null);

  const startTimer = useCallback(() => {
    if (intervalRef.current !== null) return;

    const startTime = Date.now();
    setIsCountdownActive(true);

    const tick = () => {
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
      const remainingTime = time - elapsedTime;

      setCountdown(remainingTime);

      if (remainingTime > 0) {
        intervalRef.current = requestAnimationFrame(tick);
      } else {
        pauseTimer();
      }
    };

    intervalRef.current = requestAnimationFrame(tick);
  }, [time]);

  const pauseTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      cancelAnimationFrame(intervalRef.current);
      intervalRef.current = null;
      setIsCountdownActive(false);
    }
  }, []);

  const resetTimer = useCallback(() => {
    pauseTimer();
    setCountdown(time);
  }, [pauseTimer, time]);

  useEffect(() => {
    return () => pauseTimer();
  }, [pauseTimer]);

  return {
    countdown,
    isCountdownActive,
    timer: formatTime(countdown),
    startTimer,
    pauseTimer,
    resetTimer,
  };
};
