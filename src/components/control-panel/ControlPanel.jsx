import React, { useState } from "react";
import Celula from "../celula/Celula";
import "./ControlPanel.css";

/**
 * Componente que renderiza a interface principal do jogo, incluindo:
 * - O tabuleiro interativo 6x7 onde os jogadores fazem suas jogadas
 * - Painéis laterais mostrando informações dos jogadores:
 *   - Nome do jogador
 *   - Tempo restante para a jogada atual
 *   - Indicador visual de qual jogador está ativo
 * - Preview da peça que será colocada ao passar o mouse sobre uma coluna
 * - Células bônus destacadas em laranja
 * - Botão para terminar a partida atual
 * 
 * @param {Object} props - Propriedades do componente
 * @param {boolean} props.gameStarted - Indica se o jogo está em andamento
 * @param {Array<Array<number|null>>} props.grid - Estado atual do tabuleiro
 * @param {number} props.currentPlayer - Jogador atual (1 = azul, 2 = vermelho)
 * @param {Function} props.onColumnClick - Função chamada quando uma coluna é clicada
 * @param {string} props.jogador1 - Nome do jogador 1
 * @param {string} props.jogador2 - Nome do jogador 2
 * @param {string} props.timeLeft1 - Tempo restante do jogador 1 (formato "ss:cc")
 * @param {string} props.timeLeft2 - Tempo restante do jogador 2 (formato "ss:cc")
 * @param {Array<string>} props.bonusCells - Coordenadas das células bônus ("linha-coluna")
 * @param {Function} props.onEndGame - Função para terminar o jogo atual
 */
function ControlPanel({
  gameStarted,
  grid,
  currentPlayer,
  onColumnClick,
  jogador1,
  jogador2,
  timeLeft1,
  timeLeft2,
  bonusCells = [],
  onEndGame
}) {
  const [hoveredCol, setHoveredCol] = useState(null);

  return (
    <>
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
      {gameStarted && (
        <button className="end-game-button" onClick={onEndGame}>
          Terminar Partida
        </button>
      )}
    </>
  );
}

export default ControlPanel;
