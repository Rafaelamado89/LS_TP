import React, { useState } from "react";
import Celula from "../celula/Celula";
import "./ControlPanel.css";

function ControlPanel({
  gameStarted,
  grid,
  currentPlayer,
  onColumnClick,
  jogador1,
  jogador2,
  timeLeft1,
  timeLeft2,
  bonusCells = []
}) {
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
        {/* Hover overlay for entire board height */}
        <div className="hover-column-overlay">
          {Array(7).fill(null).map((_, colIndex) => (
            <div
              key={colIndex}
              className="hover-column"
              onMouseEnter={() => gameStarted && setHoveredCol(colIndex)}
              onMouseLeave={() => setHoveredCol(null)}
              onClick={() => gameStarted && onColumnClick(colIndex)}
            >
              {hoveredCol === colIndex && gameStarted && (
                <div className={`hover-piece jogador${currentPlayer}`} />
              )}
            </div>
          ))}
        </div>

        {/* Board */}
        <div className="board">
          {grid.map((row, rowIndex) => (
            <div className="row" key={rowIndex}>
              {row.map((cellValue, colIndex) => {
                const key = `${rowIndex}-${colIndex}`;
                const isBonus = bonusCells.includes(key);

                return (
                  <div className="cell" key={colIndex}>
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
  );
}

export default ControlPanel;
