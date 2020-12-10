import { checkEndGame } from "../index";

describe("Checking all end game condition", () => {
  it("handles a draw", () => {
    const board = ["X", "X", "O", "O", "O", "X", "X", "O", "X"];
    const result = checkEndGame(board);

    expect(result).toStrictEqual({ draw: true });
  });

  describe("Win conditions on rows", () => {
    it("handles a win on 1st row ", () => {
      const board = ["X", "X", "X", "O", "O", "X", "O", "X", "0"];
      const result = checkEndGame(board);

      expect(result).toStrictEqual({ cells: [0, 1, 2], winner: "X" });
    });

    it("handles a win on 2nd row ", () => {
      const board = ["O", "O", "X", "X", "X", "X", "O", "X", "0"];
      const result = checkEndGame(board);

      expect(result).toStrictEqual({ cells: [3, 4, 5], winner: "X" });
    });

    it("handles a win on 3rd row ", () => {
      const board = ["O", "O", "X", "O", "O", "X", "X", "X", "X"];
      const result = checkEndGame(board);

      expect(result).toStrictEqual({ cells: [6, 7, 8], winner: "X" });
    });
  });

  describe("Win conditions on columns", () => {
    it("handles a win on 1st column ", () => {
      const board = ["O", "X", "X", "O", "O", "X", "O", "X", "O"];
      const result = checkEndGame(board);

      expect(result).toStrictEqual({ cells: [0, 3, 6], winner: "O" });
    });

    it("handles a win on 1st column ", () => {
      const board = ["O", "X", "X", "O", "O", "X", "O", "X", "O"];
      const result = checkEndGame(board);

      expect(result).toStrictEqual({ cells: [0, 3, 6], winner: "O" });
    });

    it("handles a win on 2nd column ", () => {
      const board = ["X", "O", "X", "O", "O", "X", "O", "O", "X"];
      const result = checkEndGame(board);

      expect(result).toStrictEqual({ cells: [1, 4, 7], winner: "O" });
    });

    it("handles a win on 3rd column ", () => {
      const board = ["O", "X", "O", "O", "X", "O", "X", "O", "O"];
      const result = checkEndGame(board);

      expect(result).toStrictEqual({ cells: [2, 5, 8], winner: "O" });
    });
  });

  describe("Win conditions on diagonals", () => {
    it("handles a win on diag top left to bottom right ", () => {
      const board = ["O", "X", "X", "O", "O", "X", "X", "O", "O"];
      const result = checkEndGame(board);

      expect(result).toStrictEqual({ cells: [0, 4, 8], winner: "O" });
    });

    it("handles a win on diag top right to bottom left ", () => {
      const board = ["O", "X", "X", "O", "X", "O", "X", "O", "O"];
      const result = checkEndGame(board);

      expect(result).toStrictEqual({ cells: [2, 4, 6], winner: "X" });
    });
  });
});
