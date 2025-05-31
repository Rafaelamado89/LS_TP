import { useEffect, useRef, useState } from "react";

/**
 * Hook personalizado que implementa um sistema de temporizadores para um jogo de turnos.
 * 
 * Cada jogador tem 10 segundos para fazer sua jogada. O temporizador:
 * - Começa a contar quando o jogo inicia
 * - Alterna entre os jogadores automaticamente
 * - Para quando o jogo termina
 * - Reseta quando uma jogada é feita
 * - Força a troca de turno quando chega a zero
 * 
 * O tempo é mostrado no formato "ss:cc" onde:
 * - ss: segundos (00-10)
 * - cc: centésimos de segundo (00-99)
 * 
 * @param {number} currentPlayer - Jogador atual (1 ou 2)
 * @param {boolean} gameStarted - Indica se o jogo está em andamento
 * @param {Function} onTimeout - Função chamada quando o tempo de um jogador acaba
 * @param {number} initialTime - Tempo inicial em segundos (padrão: 10.0)
 * @returns {Object} Objeto com os temporizadores e função de reset
 * @returns {string} returns.timeLeft1 - Tempo do jogador 1 (formato "ss:cc")
 * @returns {string} returns.timeLeft2 - Tempo do jogador 2 (formato "ss:cc")
 * @returns {Function} returns.resetTimers - Reseta ambos os temporizadores para o tempo inicial
 */
export function useDualTurnTimers(currentPlayer, gameStarted, onTimeout, initialTime = 10.0) {
  const [timer1, setTimer1] = useState(initialTime * 100); // 100 = 10.00s
  const [timer2, setTimer2] = useState(initialTime * 100);

  const intervalRef = useRef(null);

  useEffect(() => {
    if (!gameStarted) return;

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (currentPlayer === 1) {
        setTimer1((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            onTimeout();
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
