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
