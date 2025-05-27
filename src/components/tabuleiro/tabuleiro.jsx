import React, { useState } from "react";
import "./tabuleiro.css";
function ControlPanel({
  gameStarted,
  onGameStart,
  selectedLevel,
  onLevelChange,
  grid,
  currentPlayer,
  onColumnClick
}) {

  const estiloParaDL = gameStarted ? "gameStarted" : "";
  const [openWindow, setOpenWindow] = useState(false);
  return (
      <div className="game-container">
        {/* Painel jogador 1 */}
        <div className={`player-panel ${currentPlayer === 1 ? "active-blue" : ""}`}>
          <div className="player-card">
            <div className="player-face">
              <img src="/assets/images/peca-azul.png" alt="Player Face" />
            </div>
            <div className="player-name">PLAYER 1</div>
            <div className="player-time">00:00</div>
          </div>
        </div>
        
        {/* Game board and controls */}
        <div className="board-wrapper">
          {/* Dynamic board rendering based on grid state */}
          <div className="board">
            {grid.map((row, rowIndex) => (
              <div className="row" key={rowIndex}>
                {row.map((cellValue, colIndex) => (
                  <div
                    className="cell"
                    key={colIndex}
                    onClick={() => onColumnClick(colIndex)} // Click on a column
                  >
                    {cellValue === 1 && (
                      <img src="/assets/images/peca-azul.png" alt="P1" />
                    )}
                    {cellValue === 2 && (
                      <img src="/assets/images/peca-vermelha.png" alt="P2" />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        
        {/* Painel jogador 2 */}
        <div className={`player-panel ${currentPlayer === 2 ? "active-red" : ""}`}>
          <div className="player-card">
            <div className="player-face">
              <img src="/assets/images/peca-vermelha.png" alt="Player Face" />
            </div>
            <div className="player-name">CPU</div>
            <div className="player-time">00:00</div>
          </div>
        </div>
      </div>
  )
};

export default ControlPanel;
