import { useEffect, useState, useCallback, useRef } from "react";
import "./assets/styles/App.css";
import NomeJogadores from "./components/game-panel/NomeJogadores";
import ControlPanel from "./components/control-panel/ControlPanel";
import { useDualTurnTimers } from "./helpers/timer";
import { insertPiece } from "./helpers/insert-piece";
import { checkWinner } from "./helpers/check-winner";

function createEmptyGrid() {
  return Array.from({ length: 6 }, () => Array(7).fill(null));
}

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(0);
  const [grid, setGrid] = useState(createEmptyGrid());
  const [winner, setWinner] = useState(null);
  const [hideButtons, setHideButtons] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [bonusCells, setBonusCells] = useState([]);
  const [jogador1, setJogador1] = useState("PLAYER 1");
  const [jogador2, setJogador2] = useState("PLAYER 2");
  const resetTimersRef = useRef(null);

  const nextPlayer = useCallback(() => {
    setCurrentPlayer((prev) => (prev === 1 ? 2 : 1));
    resetTimersRef.current?.();
  }, []);

  const { timeLeft1, timeLeft2, resetTimers } = useDualTurnTimers(
    currentPlayer,
    gameStarted,
    nextPlayer
  );

  useEffect(() => {
    resetTimersRef.current = resetTimers;
  }, [resetTimers]);

  function generateBonusCells() {
    const positions = new Set();
    while (positions.size < 5) {
      const row = Math.floor(Math.random() * 6); // 6 rows
      const col = Math.floor(Math.random() * 7); // 7 cols
      positions.add(`${row}-${col}`);
    }
    return Array.from(positions);
  }

  function handleGameStart() {
    setGrid(createEmptyGrid());
    setCurrentPlayer(Math.random() < 0.5 ? 1 : 2);
    setGameStarted(true);
    setBonusCells(generateBonusCells());
    resetTimers();
  }

  function processMove(colIndex) {
    const { updatedGrid, success, rowInserted } = insertPiece(
      grid,
      colIndex,
      currentPlayer
    );
    if (!success) return;

    setGrid(updatedGrid);

    const won = checkWinner(updatedGrid, currentPlayer, rowInserted, colIndex);
    if (won) {
      setWinner(currentPlayer);
      setGameStarted(false);
      return;
    }

    const key = `${rowInserted}-${colIndex}`;
    const isBonus = bonusCells.includes(key);

    if (!isBonus) {
      nextPlayer();
    } else {
      resetTimers();
    }
  }

  function handleColumnClick(colIndex) {
    if (!gameStarted) return;
    if (selectedLevel === 1 && currentPlayer === 2) return;
    processMove(colIndex);
  }

  useEffect(() => {
    if (!gameStarted || selectedLevel !== 1 || currentPlayer !== 2) return;

    const timeout = setTimeout(() => {
      const cpuCol = cpuMove(grid, 2);
      if (cpuCol !== null) {
        processMove(cpuCol);
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [currentPlayer, gameStarted, selectedLevel, grid]);

  function cpuMove(grid, cpuPlayer) {
    const validColumns = [];

    for (let col = 0; col < grid[0].length; col++) {
      const row = getAvailableRow(grid, col);
      if (row === -1) continue;

      const tempGrid = grid.map((r) => [...r]);
      tempGrid[row][col] = cpuPlayer;

      if (checkWinner(tempGrid, cpuPlayer, row, col)) {
        return col;
      }

      validColumns.push(col);
    }

    if (validColumns.length === 0) return null;

    return validColumns[Math.floor(Math.random() * validColumns.length)];
  }

  function getAvailableRow(grid, col) {
    for (let row = grid.length - 1; row >= 0; row--) {
      if (grid[row][col] === null) return row;
    }
    return -1;
  }

  function resetGame() {
    setGrid(createEmptyGrid());
    setCurrentPlayer(1);
    setGameStarted(false);
    setWinner(null);
    setHideButtons(false);
    resetTimers();
  }

  return (
    <div id="container">
      <main>
        <NomeJogadores
          setJogador1={setJogador1}
          setJogador2={setJogador2}
          onGameStart={handleGameStart}
          setSelectedLevel={setSelectedLevel}
          hideButtons={hideButtons}
          setHideButtons={setHideButtons}
        />
        <ControlPanel
          gameStarted={gameStarted}
          onGameStart={handleGameStart}
          grid={grid}
          currentPlayer={currentPlayer}
          onColumnClick={handleColumnClick}
          jogador1={jogador1}
          jogador2={jogador2}
          timeLeft1={timeLeft1}
          timeLeft2={timeLeft2}
          bonusCells={bonusCells}
        />

        {winner && (
          <div className="modal">
            <div className="modal-content">
              <h2>{winner === 1 ? jogador1 : jogador2} Ganhou!</h2>
              <button onClick={resetGame}>Jogar de Novo</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
