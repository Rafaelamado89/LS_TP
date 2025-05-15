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
