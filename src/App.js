import "./assets/styles/App.css";
import NomeJogadores from "./components/game-panel/NomeJogadores";
import ControlPanel from "./components/tabuleiro/tabuleiro";
import {useState} from "react";


function App() {

  const [gameStarted , setGameStarted] = useState(false);
  const [selectedLevel,setSelectedLevel] = useState(0);
  const [mostrarModal, setMostrarModal] = useState(false);

  function handleGameStart(){
    setGameStarted(!gameStarted);
  }

  function handleLevelChange(evento){
    const nivelSelecionado = evento.curretnTarget.value;
    setSelectedLevel(nivelSelecionado);
  }

  return (
    <div id="container">
      <main>
        <ControlPanel 
        gameStarted={gameStarted}
        onGameStart={handleGameStart}
        selectedLevel={selectedLevel}
        onLevelChange={handleLevelChange} />
        <NomeJogadores />
        
      </main>
    </div>
  );
}
export default App;
