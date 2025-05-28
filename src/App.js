 import {useEffect, useState} from "react";
  import "./assets/styles/App.css";
  import NomeJogadores from "./components/game-panel/NomeJogadores";
  import ControlPanel from "./components/tabuleiro/tabuleiro";
  import { useDualTurnTimers } from "./helpers/timer";
  import { insertPiece } from "./helpers/insert-piece";
  import { checkWinner } from "./helpers/check-winner";


  function App() {

    const [gameStarted, setGameStarted] = useState(false);
    const [selectedLevel, setSelectedLevel] = useState(0);
    const [grid, setGrid] = useState(
      Array.from({ length: 6 }, () => Array(7).fill(null))
    );

    const [currentPlayer, setCurrentPlayer] = useState(1);
    const {timeLeft1, timeLeft2, resetTimers} = useDualTurnTimers(currentPlayer, gameStarted,nextPlayer);

  function nextPlayer() {
    setCurrentPlayer((prev) => (prev === 1 ? 2 : 1));
    resetTimers();
  }


    function handleGameStart(){
      setGrid(Array.from({ length: 6 }, () => Array(7).fill(null))); // restart the grid
      setCurrentPlayer(Math.random() < 0.5 ? 1 : 2); // a random player starts
      setGameStarted(true);
      resetTimers();
    }
    
    function processMove(colIndex, player) {
      const { updatedGrid, success, rowInserted } = insertPiece(grid, colIndex, player);
      if (!success) return;

      setGrid(updatedGrid);

      const won = checkWinner(updatedGrid, player, rowInserted, colIndex);
      if (won) {
        alert(`O jogador ${player === 1 ? jogador1 : jogador2} venceu!`);
        setGameStarted(false);
        return;
      }

      nextPlayer();
    }

    function handleColumnClick(colIndex) {
      if (!gameStarted) return;
      if (selectedLevel === 1 && currentPlayer === 2) return; // avoid clicking in CPU turn
      processMove(colIndex, currentPlayer);
    }

    useEffect(() => {
      console.log('Here 1');
      if (!gameStarted || selectedLevel !== 1 || currentPlayer !== 2) {
        console.log("Condições não satisfeitas:", { gameStarted, selectedLevel, currentPlayer });
        return
      };

      const timeout = setTimeout(() => {
        const cpuCol = cpuMove(grid, 2);
        console.log("CPU escolheu coluna:", cpuCol);
        if (cpuCol !== null) {
          processMove(cpuCol, 2);
        } else {
          console.log("Nenhuma coluna válida para CPU.");
        }
      }, 2000); // delay to look more natural
      
      return () => clearTimeout(timeout);
    }, [currentPlayer, gameStarted, selectedLevel, grid]);


    function cpuMove(grid, cpuPlayer) {
      const validColumns = [];

      for (let col = 0; col < grid[0].length; col++) {
        const row = getAvailableRow(grid, col);
        if (row === -1) continue;

        const tempGrid = grid.map(r => [...r]);
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


    const [jogador1, setJogador1] = useState("PLAYER 1");
    const [jogador2, setJogador2] = useState("PLAYER 2");


    return (
      <div id="container">
        <main>
          <NomeJogadores
            setJogador1={setJogador1}
            setJogador2={setJogador2}
            onGameStart={handleGameStart}
            setSelectedLevel={setSelectedLevel}
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
          />
          
        </main>
      </div>
    );
  }
  export default App;