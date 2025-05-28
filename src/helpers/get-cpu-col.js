function cpuMove(grid, cpuPlayer) {
  const validColumns = [];

  for (let col = 0; col < grid[0].length; col++) {
    const row = getAvailableRow(grid, col);
    if (row === -1) continue;

    // simulates the play
    const tempGrid = grid.map(r => [...r]);
    tempGrid[row][col] = cpuPlayer;

    if (checkWinner(tempGrid, cpuPlayer, row, col)) {
      return col; // win immediately
    }

    validColumns.push(col); // stores the valid columns
  }

  if (validColumns.length === 0) return null;

  // if no immediate win, choose a random valid column
  return validColumns[Math.floor(Math.random() * validColumns.length)];
}

function getAvailableRow(grid, col) {
  for (let row = grid.length - 1; row >= 0; row--) {
    if (grid[row][col] === null) return row;
  }
  return -1;
}
