/**
 * Insere uma peça na primeira posição disponível de uma coluna do tabuleiro.
 * 
 * O processo de inserção simula a gravidade:
 * 1. A peça é sempre colocada na posição mais baixa disponível
 * 2. Se a coluna estiver cheia, a inserção falha
 * 3. O tabuleiro original não é modificado, uma nova cópia é retornada
 * 
 * Exemplo de uso:
 * ```javascript
 * const result = insertPiece(grid, 3, 1);
 * if (result.success) {
 *   // Peça foi inserida na coluna 3
 *   console.log(`Inserida na linha ${result.rowInserted}`);
 * } else {
 *   // Coluna 3 está cheia
 * }
 * ```
 * 
 * @param {Array<Array<number|null>>} grid - Estado atual do tabuleiro
 * @param {number} colIndex - Índice da coluna onde a peça será inserida (0-6)
 * @param {number} player - Número do jogador (1 = azul, 2 = vermelho)
 * @returns {Object} Resultado da operação
 * @returns {Array<Array<number|null>>} returns.updatedGrid - Novo estado do tabuleiro
 * @returns {boolean} returns.success - true se a peça foi inserida, false se a coluna está cheia
 * @returns {number|null} returns.rowInserted - Linha onde a peça foi inserida, ou null se falhou
 */
export function insertPiece(grid, colIndex, player) {
    // Clone the grid to avoid mutating the original state directly
    const newGrid = grid.map(row => [...row]);

    // Start from the bottom row and find the first empty cell in the selected column
    for (let row = newGrid.length - 1; row >= 0; row--) {
        if (newGrid[row][colIndex] === null) {

            // Insert the player's piece in the first available row
            newGrid[row][colIndex] = player;

            // Return the updated grid, success flag, and the inserted row index
            return {
                updatedGrid: newGrid,
                success: true,
                rowInserted: row,
            };
        }
    }

    // If the column is full, return the original grid and indicate failure
    return {
        updatedGrid: grid,
        success: false,
        rowInserted: null,
    };
}
