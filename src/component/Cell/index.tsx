import React, { useRef, useState, Suspense } from "react";
import Text from "../Text";
import * as Three from "three";

import { useRecoilState, useRecoilValue } from "recoil";
import { cellState, turnState, boardState, endGameState } from "../../states";
import { COLORS, GAME_STATES } from "../../constants";

type BoxProps = {
  position: Three.Vector3;
  id: number;
  color?: string;
};

export const Cell = (props: BoxProps) => {
  const [cell, setCell] = useRecoilState(cellState(props.id));
  const [board, setBoard] = useRecoilState(boardState);
  const endGame = useRecoilValue(endGameState);
  const [turn, setTurn] = useRecoilState(turnState);

  let color = cell.color;

  if (board.state === GAME_STATES.END) {
    if (!endGame.isADraw) {
      if (endGame.cells.includes(props.id - 1)) color = COLORS.GEORGES_RED;
    }
  }

  return (
    <mesh
      position={props.position}
      onClick={() => {
        if (cell.inputValue === "") {
          setCell({ ...cell, inputValue: turn as string });
          setTurn({ turn, id: props.id });
        }
      }}
    >
      <boxGeometry args={[1, 1, 0.5]} />
      {cell.inputValue && <Text children={cell.inputValue} size={0.1} />}

      <meshStandardMaterial color={color} />
    </mesh>
  );
};
