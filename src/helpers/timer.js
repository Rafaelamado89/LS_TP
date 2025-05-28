import { useEffect, useRef, useState } from "react";

export function useDualTurnTimers(currentPlayer, gameStarted, onTimeout, initialTime = 10.0) {
  const [timer1, setTimer1] = useState(initialTime * 100); // 100 = 10.00s
  const [timer2, setTimer2] = useState(initialTime * 100);

  const intervalRef = useRef(null);

  useEffect(() => {
    console.log(gameStarted)
    if (!gameStarted) return;

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (currentPlayer === 1) {
        setTimer1((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            onTimeout();
            console.log("here")
            return 0;
          }
          return prev - 1;
        });
      } else {
        setTimer2((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            onTimeout();
            return 0;
          }
          return prev - 1;
        });
      }
    }, 10); // 10ms per tick

    return () => clearInterval(intervalRef.current);
  }, [currentPlayer, gameStarted]);

  const format = (value) => {
    const seconds = String(Math.floor((value % 6000) / 100)).padStart(2, "0");
    const centiseconds = String(value % 100).padStart(2, "0");
    return `${seconds}:${centiseconds}`;
  };

  return {
    timeLeft1: format(timer1),
    timeLeft2: format(timer2),
    resetTimers: () => {
      setTimer1(initialTime * 100);
      setTimer2(initialTime * 100);
    },
  };
}
