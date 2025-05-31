/**
 * Verifica se a última jogada resultou em vitória.
 * 
 * Uma vitória ocorre quando um jogador forma uma linha de 4 peças
 * consecutivas da mesma cor em qualquer direção:
 * - Horizontal (→)
 * - Vertical (↓)
 * - Diagonal descendente (↘)
 * - Diagonal ascendente (↗)
 * 
 * A verificação é otimizada pois:
 * 1. Só verifica a partir da última peça colocada
 * 2. Verifica em ambas as direções de cada linha possível
 * 3. Para assim que encontra uma sequência vencedora
 * 
 * Exemplo de uso:
 * ```javascript
 * if (checkWinner(grid, 1, 3, 4)) {
 *   console.log("Jogador 1 venceu!");
 * }
 * ```
 * 
 * @param {Array<Array<number|null>>} grid - Estado atual do tabuleiro
 * @param {number} player - Número do jogador que fez a última jogada (1 ou 2)
 * @param {number} lastRow - Linha onde a última peça foi colocada (0-5)
 * @param {number} lastCol - Coluna onde a última peça foi colocada (0-6)
 * @returns {boolean} true se o jogador venceu com esta jogada
 */
export function checkWinner(grid, player, lastRow, lastCol) {
  const directions = [
    { x: 0, y: 1 },   // horizontal
    { x: 1, y: 0 },   // vertical
    { x: 1, y: 1 },   // descending diagonal
    { x: -1, y: 1 },  // ascending diagonal
  ];

  const ROWS = grid.length;
  const COLS = grid[0].length;

  for (const { x, y } of directions) {
    let count = 1;

    // checks in one direction (ex: left to right)
    for (let i = 1; i < 4; i++) {
      const r = lastRow + i * x;
      const c = lastCol + i * y;
      if (r < 0 || r >= ROWS || c < 0 || c >= COLS || grid[r][c] !== player) break;
      count++;
    }

    // checks in the opposite direction (ex: right to left)
    for (let i = 1; i < 4; i++) {
      const r = lastRow - i * x;
      const c = lastCol - i * y;
      if (r < 0 || r >= ROWS || c < 0 || c >= COLS || grid[r][c] !== player) break;
      count++;
    }

    if (count >= 4) return true;
  }

  return false;
}
