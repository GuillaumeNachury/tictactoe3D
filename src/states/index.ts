import { atom, atomFamily, selector, selectorFamily } from "recoil";
import { GAME_STATES, COLORS } from "../constants";
import { checkEndGame } from "../rules";

export const cellState = atomFamily({
  key: "cell",
  default: {
    color: COLORS.GEORGES_GOLD,
    inputValue: "",
  },
});

export const cellsSelector = selectorFamily({
  key: "cellList",
  get: (id) => ({ get }) => [
    get(cellState(0)),
    get(cellState(1)),
    get(cellState(2)),
    get(cellState(3)),
    get(cellState(4)),
    get(cellState(5)),
    get(cellState(6)),
    get(cellState(7)),
    get(cellState(8)),
  ],
  set: (id) => ({ set, get, reset }, newValue) => {
    if (newValue === "reset") {
      for (let i = 0; i <= 9; i++) {
        reset(cellState(i));
      }
    }
  },
});

type BoardState = {
  state: string;
  board: string[];
  turn: string;
};

export const boardState = atom({
  key: "boardState",
  default: {
    state: GAME_STATES.WAITING,
    board: ["", "", "", "", "", "", "", "", ""],
    turn: "X",
  },
});

export const boardSelector = selector({
  key: "boardSelector",
  get: ({ get }) => get(boardState),
});

export const endGameState = atom({
  key: "endGameState",
  default: {
    isADraw: false,
    winner: "",
    cells: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
});

type TurnOption = {
  turn: string;
  id;
};

export const turnState = selector({
  key: "turn",
  get: ({ get }) => {
    const current = get(boardState).turn;
    return current === "O" ? "X" : "O";
  },
  set: ({ set, get }, newValue) => {
    const { turn, id } = newValue as TurnOption;
    const bState = get(boardState);
    const board = [...bState.board];
    board.splice(id - 1, 1, turn);
    const isGameEnded = checkEndGame(board);
    let state = bState.state;
    if (isGameEnded) {
      state = GAME_STATES.END;
      set(endGameState, {
        isADraw: !!isGameEnded.draw,
        cells: isGameEnded.cells || [],
        winner: isGameEnded.winner || "",
      });
    }

    set(boardState, { turn, board, state });
  },
});
