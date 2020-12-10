export const checkEndGame = (board) => {
  const translatedBoard = board.map((cell) => {
    switch (cell) {
      case "":
        return 0;
      case "X":
        return 1;
      case "O":
        return 10;
    }
  });

  //checking rows
  for (let c = 0; c < 3; c++) {
    const r =
      translatedBoard[c * 3] +
      translatedBoard[c * 3 + 1] +
      translatedBoard[c * 3 + 2];
    if (r === 3 || r === 30)
      return {
        cells: [c * 3, c * 3 + 1, c * 3 + 2],
        winner: r === 3 ? "X" : "O",
      };
  }

  //checking columns
  for (let c = 0; c < 3; c++) {
    const r =
      translatedBoard[c] + translatedBoard[c + 3] + translatedBoard[c + 6];
    if (r === 3 || r === 30)
      return { cells: [c, c + 3, c + 6], winner: r === 3 ? "X" : "O" };
  }

  //Diag top left to bottom right
  let d = translatedBoard[0] + translatedBoard[4] + translatedBoard[8];
  if (d === 3 || d === 30)
    return { cells: [0, 4, 8], winner: d === 3 ? "X" : "O" };

  //Diag top right to bottom left

  d = translatedBoard[2] + translatedBoard[4] + translatedBoard[6];
  if (d === 3 || d === 30)
    return { cells: [2, 4, 6], winner: d === 3 ? "X" : "O" };

  if (translatedBoard.some((v) => v === 0)) return;
  else {
    return { draw: true };
  }
};
