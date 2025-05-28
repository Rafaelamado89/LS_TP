 import {useEffect, useState} from "react";
  import "./assets/styles/App.css";
  import NomeJogadores from "./components/game-panel/NomeJogadores";
  import ControlPanel from "./components/tabuleiro/tabuleiro";
  import { useDualTurnTimers } from "./helpers/timer";
  import { insertPiece } from "./helpers/insert-piece";
  import { checkWinner } from "./helpers/check-winner";


  function App() {

    const [gameStarted , setGameStarted] = useState(false);
    const [selectedLevel,setSelectedLevel] = useState(0);
    const [grid, setGrid] = useState(
      Array.from({ length: 6 }, () => Array(7).fill(null))
    );

    const [currentPlayer, setCurrentPlayer] = useState(1);
    const {
      timeLeft1,
      timeLeft2,
      resetTimers,
    } = useDualTurnTimers(
      currentPlayer,
      gameStarted,
      nextPlayer
  );

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
    
    function handleColumnClick(colIndex) {
      const { updatedGrid, success, rowInserted } = insertPiece(grid, colIndex, currentPlayer);
      if (!success) return; // Return if column is full

      setGrid(updatedGrid);
      nextPlayer();

      // Check for a winner
      const won = checkWinner(updatedGrid, currentPlayer, rowInserted, colIndex);
      if (won) {
        alert(`O jogador ${currentPlayer === 1 ? jogador1 : jogador2} venceu!`);
        setGameStarted(false);
        return;
      }
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