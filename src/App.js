import {useState} from "react";
import "./assets/styles/App.css";
import NomeJogadores from "./components/game-panel/NomeJogadores";
import ControlPanel from "./components/tabuleiro/tabuleiro";
import { BOARD_ROWS } from "./constants";
import { BOARD_COLS } from "./constants";
import { insertPiece } from "./helpers/insert-piece";


function App() {

  const [gameStarted , setGameStarted] = useState(false);
  const [selectedLevel,setSelectedLevel] = useState(0);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [grid, setGrid] = useState(
    Array.from({ length: 6 }, () => Array(7).fill(null))
  );

  const [currentPlayer, setCurrentPlayer] = useState(1);

  function handleGameStart(){
    setGameStarted(!gameStarted);
  }
  
  function handleColumnClick(colIndex) {
    const { updatedGrid, success } = insertPiece(grid, colIndex, currentPlayer);
    if (!success) return; // Return if column is full

    setGrid(updatedGrid);
    setCurrentPlayer(prev => (prev === 1 ? 2 : 1));
  }


  return (
    <div id="container">
      <main>
        <ControlPanel 
          gameStarted={gameStarted}
          onGameStart={handleGameStart}
          grid={grid}
          currentPlayer={currentPlayer}
          onColumnClick={handleColumnClick}
        />
        <NomeJogadores />
        
      </main>
    </div>
  );
}
export default App;
