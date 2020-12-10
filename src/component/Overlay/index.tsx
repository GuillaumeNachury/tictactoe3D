import React from "react";
import "./overlay.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { GAME_STATES } from "../../constants";

import { boardState, endGameState, cellsSelector } from "../../states";

export const Overlay = () => {
  const [gameState, setGameState] = useRecoilState(boardState);
  const endGame = useRecoilValue(endGameState);
  const [cells, setCells] = useRecoilState(cellsSelector("all"));

  if (gameState.state === GAME_STATES.PLAYING) return null;

  let msg: string | undefined = undefined;

  if (gameState.state === GAME_STATES.END) {
    if (endGame.isADraw) {
      msg = "It's a draw !";
    } else {
      msg = endGame.winner + " player won !";
    }
  }

  return (
    <div
      className="overlay_wrapper"
      onClick={() => {
        setGameState({
          board: ["", "", "", "", "", "", "", "", ""],
          turn: "X",
          state: GAME_STATES.PLAYING,
        });
        setCells("reset");
      }}
    >
      {msg && <h1>{msg}</h1>}

      <h3>Click to start a new game</h3>
    </div>
  );
};
