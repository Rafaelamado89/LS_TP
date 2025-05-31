import { useEffect, useState, useCallback, useRef } from "react";
import "./assets/styles/App.css";
import NomeJogadores from "./components/game-panel/NomeJogadores";
import ControlPanel from "./components/control-panel/ControlPanel";
import { useDualTurnTimers } from "./helpers/timer";
import { insertPiece } from "./helpers/insert-piece";
import { checkWinner } from "./helpers/check-winner";

/**
 * Cria uma matriz 6x7 vazia que representa o tabuleiro do jogo.
 * O tabuleiro tem 6 linhas e 7 colunas, onde cada célula pode conter:
 * - null (célula vazia)
 * - 1 (peça do jogador 1 - azul)
 * - 2 (peça do jogador 2 - vermelho)
 * 
 * @returns {Array<Array<null>>} Uma matriz 6x7 inicializada com null
 */
function createEmptyGrid() {
  return Array.from({ length: 6 }, () => Array(7).fill(null));
}

/**
 * Componente principal do jogo "4 em Linha".
 * Este componente gerencia toda a lógica do jogo, incluindo:
 * - O tabuleiro 6x7 onde os jogadores colocam suas peças
 * - Alternância entre os dois jogadores
 * - Temporizador para cada jogador (10 segundos por jogada)
 * - Células bônus que permitem jogadas extras
 * - Modo de jogo contra outro jogador ou contra a CPU
 * - Verificação de vitória (4 peças em linha)
 */
function App() {
  // Estados do jogo
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

  /**
   * Alterna o jogador atual e reinicia seu temporizador.
   * Esta função é chamada após cada jogada, exceto quando:
   * - O jogador acerta uma célula bônus (ganha jogada extra)
   * - Alguém vence o jogo
   */
  const nextPlayer = useCallback(() => {
    setCurrentPlayer((prev) => (prev === 1 ? 2 : 1));
    resetTimersRef?.current();
  }, []);

  const { timeLeft1, timeLeft2, resetTimers } = useDualTurnTimers(
    currentPlayer,
    gameStarted,
    nextPlayer
  );

  useEffect(() => {
    resetTimersRef.current = resetTimers;
  }, [resetTimers]);

  /**
   * Gera 5 posições aleatórias no tabuleiro para as células bônus.
   * Células bônus são especiais pois quando um jogador coloca uma peça
   * nelas, ele ganha uma jogada extra (não passa a vez para o outro jogador).
   * As células são identificadas no formato "linha-coluna" (ex: "2-3").
   * 
   * @returns {Array<string>} Array com 5 posições únicas no formato "linha-coluna"
   */
  function generateBonusCells() {
    const positions = new Set();
    while (positions.size < 5) {
      const row = Math.floor(Math.random() * 6);
      const col = Math.floor(Math.random() * 7);
      positions.add(`${row}-${col}`);
    }
    return Array.from(positions);
  }

  /**
   * Inicia uma nova partida do jogo.
   * - Limpa o tabuleiro
   * - Escolhe aleatoriamente qual jogador começa
   * - Gera novas células bônus
   * - Reinicia os temporizadores
   * - Ativa o estado de jogo
   */
  function handleGameStart() {
    setGrid(createEmptyGrid());
    setCurrentPlayer(Math.random() < 0.5 ? 1 : 2);
    setGameStarted(true);
    setBonusCells(generateBonusCells());
    resetTimers();
  }

  /**
   * Processa uma jogada em uma coluna específica.
   * O processamento inclui:
   * 1. Tentar inserir a peça na primeira posição disponível da coluna
   * 2. Verificar se o jogador venceu com esta jogada
   * 3. Verificar se a posição é uma célula bônus
   * 4. Passar a vez para o próximo jogador (se não for célula bônus)
   * 
   * @param {number} colIndex - Índice da coluna onde a peça será colocada (0-6)
   */
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

  /**
   * Manipula o clique em uma coluna do tabuleiro.
   * Verifica se:
   * - O jogo está em andamento
   * - Não é a vez da CPU jogar (no modo single player)
   * Se as condições forem satisfeitas, processa a jogada na coluna clicada.
   * 
   * @param {number} colIndex - Índice da coluna clicada (0-6)
   */
  function handleColumnClick(colIndex) {
    if (!gameStarted) return;
    if (selectedLevel === 1 && currentPlayer === 2) return;
    processMove(colIndex);
  }

  /**
   * Implementa a lógica de jogada da CPU no modo single player.
   * A CPU tenta:
   * 1. Vencer o jogo se possível (procura jogada vencedora)
   * 2. Se não puder vencer, faz uma jogada aleatória em uma coluna válida
   * 
   * @param {Array<Array<number|null>>} grid - Estado atual do tabuleiro
   * @param {number} cpuPlayer - Número que identifica a CPU (sempre 2)
   * @returns {number|null} Índice da coluna escolhida ou null se não houver jogadas possíveis
   */
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

  /**
   * Encontra a primeira posição disponível em uma coluna.
   * Uma posição está disponível se ela contém null.
   * A busca é feita de baixo para cima, simulando a gravidade.
   * 
   * @param {Array<Array<number|null>>} grid - Estado atual do tabuleiro
   * @param {number} col - Índice da coluna a verificar
   * @returns {number} Índice da primeira linha disponível (0-5) ou -1 se a coluna estiver cheia
   */
  function getAvailableRow(grid, col) {
    for (let row = grid.length - 1; row >= 0; row--) {
      if (grid[row][col] === null) return row;
    }
    return -1;
  }

  /**
   * Reseta o jogo para seu estado inicial.
   * Pode ser chamada em duas situações:
   * 1. Quando alguém vence (clearBonusCells = false)
   * 2. Quando o usuário termina a partida manualmente (clearBonusCells = true)
   * 
   * @param {boolean} clearBonusCells - Se true, remove as células bônus e volta ao menu inicial
   */
  function resetGame(clearBonusCells = false) {
    setGrid(createEmptyGrid());
    setCurrentPlayer(1);
    setGameStarted(false);
    setWinner(null);
    setHideButtons(false);
    if (clearBonusCells) {
      setBonusCells([]);
    }
    resetTimers();
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
          onEndGame={() => resetGame(true)}
        />

        {winner && (
          <div className="modal">
            <div className="modal-content">
              <h2>{winner === 1 ? jogador1 : jogador2} Ganhou!</h2>
              <button onClick={() => resetGame(false)}>Jogar de Novo</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
