import React, { useState } from "react";
import Celula from "../celula/Celula";
import "./tabuleiro.css";
function ControlPanel({
  gameStarted,
  onGameStart,
  selectedLevel,
  onLevelChange,
  grid,
  currentPlayer,
  onColumnClick,
  jogador1,
  jogador2,
  timeLeft1,
  timeLeft2,
  bonusCells = []
}) {

  const estiloParaDL = gameStarted ? "gameStarted" : "";
  const [openWindow, setOpenWindow] = useState(false);
  const [hoveredCol, setHoveredCol] = useState(null);
  return (
      <div className="game-container">
        {/* Painel jogador 1 */}
        <div className={`player-panel ${currentPlayer === 1 ? "active-blue" : ""}`}>
          <div className="player-card">
            <div className="player-face">
              <img src="/assets/images/peca-azul.png" alt="Player Face" />
            </div>
            <div className="player-name">{jogador1}</div>
            <div className="player-time">{timeLeft1}</div>
          </div>
        </div>
        
        {/* Game board and controls */}
        <div className="board-wrapper">
          {/* Dynamic board rendering based on grid state */}
          
            {/* Transparent overlay for hovered columns */}
            <div className="hover-column-overlay">
              {Array(7).fill(null).map((_, colIndex) => (
                <div
                  key={colIndex}
                  className="hover-column"
                  onMouseEnter={() => setHoveredCol(colIndex)}
                  onMouseLeave={() => setHoveredCol(null)}
                  onClick={() => onColumnClick(colIndex)}
                >
                  {hoveredCol === colIndex && (
                    <div className={`hover-piece jogador${currentPlayer}`} />
                  )}
                </div>
              ))}
            </div>

          <div className="board">
            {grid.map((row, rowIndex) => (
              <div className="row" key={rowIndex}>
                {row.map((cellValue, colIndex) => {
                  const key = `${rowIndex}-${colIndex}`;
                  const isBonus = bonusCells.includes(key);

                  return (
                    <div className="cell" key={colIndex} onClick={() => onColumnClick(colIndex)}>
                      <Celula
                        row={rowIndex}
                        col={colIndex}
                        value={cellValue}
                        isBonus={isBonus}
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          
          {!gameStarted && <div className="board-blocker" />}
        </div>
        
        {/* Painel jogador 2 */}
        <div className={`player-panel ${currentPlayer === 2 ? "active-red" : ""}`}>
          <div className="player-card">
            <div className="player-face">
              <img src="/assets/images/peca-vermelha.png" alt="Player Face" />
            </div>
            <div className="player-name">{jogador2}</div>
            <div className="player-time">{timeLeft2}</div>
          </div>
        </div>
      </div>
  )
};

export default ControlPanel;
