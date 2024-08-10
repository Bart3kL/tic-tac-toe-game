export const getWinningPatterns = (size: number) => {
  const patterns: number[][] = [];

  // Horizontal and Vertical patterns
  for (let i = 0; i < size; i++) {
    for (let j = 0; j <= size - 3; j++) {
      // Horizontal
      patterns.push([i * size + j, i * size + j + 1, i * size + j + 2]);
      // Vertical
      patterns.push([j * size + i, (j + 1) * size + i, (j + 2) * size + i]);
    }
  }

  // Diagonal patterns (both directions)
  for (let i = 0; i <= size - 3; i++) {
    for (let j = 0; j <= size - 3; j++) {
      // Top-left to bottom-right
      patterns.push([
        i * size + j,
        (i + 1) * size + j + 1,
        (i + 2) * size + j + 2,
      ]);
      // Bottom-left to top-right
      patterns.push([
        (i + 2) * size + j,
        (i + 1) * size + j + 1,
        i * size + j + 2,
      ]);
    }
  }

  return patterns;
};
