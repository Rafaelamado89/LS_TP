import React from "react";
import "./tabuleiro.css";
function ControlPanel({gameStarted, onGameStart,selectedLevel, onLevelChange}) {

  const estiloParaDL = gameStarted ? "gameStarted" : "";
  return (
      <div className="game-container">
        {/* Painel jogador 1 */}
        <div className="player-panel">
          <div className="player-card">
          <div className="player-face">
            <img src="/assets/images/peca-azul.png" alt="Player Face" />
          </div>
            <div className="player-name">PLAYER 1</div>
            <div className="player-score">0</div>
          </div>
        </div>
  
        {/* Área central com tabuleiro e info */}
        <div className="board-wrapper">
          <div className="board">
            {Array.from({ length: 6 }).map((_, rowIndex) => (
              <div className="row" key={rowIndex}>
                {Array.from({ length: 7 }).map((_, colIndex) => (
                  <div className="cell" key={colIndex}></div>
                ))}
              </div>
            ))}
          </div>
  
          <div className="turn-banner">PLAYER 1'S TURN</div>
          <div className="timer">24s</div>
        </div>
  
        {/* Painel jogador 2 */}
        <div className="player-panel">
          <div className="player-card">
            <div className="player-face">
              <img src="/assets/images/peca-vermelha.png" alt="Player Face" />
            </div>
            <div className="player-name">CPU</div>
            <div className="player-score">0</div>
          </div>
        </div>
      </div>
  )
};

export default ControlPanel;
