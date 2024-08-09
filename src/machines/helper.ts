export const generateWinningPatterns = (
  size: number,
  winLength: number,
): number[][] => {
  const patterns: number[][] = [];

  // Rows and columns
  for (let i = 0; i < size; i++) {
    for (let j = 0; j <= size - winLength; j++) {
      const rowPattern = [];
      const colPattern = [];
      for (let k = 0; k < winLength; k++) {
        rowPattern.push(i * size + j + k); // Horizontal
        colPattern.push((j + k) * size + i); // Vertical
      }
      patterns.push(rowPattern, colPattern);
    }
  }

  // Diagonals
  for (let i = 0; i <= size - winLength; i++) {
    for (let j = 0; j <= size - winLength; j++) {
      const diag1Pattern = [];
      const diag2Pattern = [];
      for (let k = 0; k < winLength; k++) {
        diag1Pattern.push((i + k) * size + (j + k)); // Top-left to bottom-right
        diag2Pattern.push((i + k) * size + (j + winLength - k - 1)); // Top-right to bottom-left
      }
      patterns.push(diag1Pattern, diag2Pattern);
    }
  }

  return patterns;
};
