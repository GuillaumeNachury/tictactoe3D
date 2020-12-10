import React, { useRef, useState, Suspense } from "react";
import { Canvas, useThree, useFrame } from "react-three-fiber";
import * as Three from "three";
import {
  RecoilRoot,
  useRecoilValue,
  useRecoilBridgeAcrossReactRoots_UNSTABLE,
} from "recoil";
import { Cell } from "../Cell";
import { boardState } from "../../states";
import { GAME_STATES } from "../../constants";

export const BoardScene = () => {
  const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE();
  return (
    <Canvas>
      <RecoilBridge>
        <Board />
      </RecoilBridge>
    </Canvas>
  );
};

const Board = () => {
  const gameState = useRecoilValue(boardState);
  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={null}>
        <BoardGeometry waiting={gameState.state === GAME_STATES.WAITING} />
      </Suspense>
    </>
  );
};

type BoardGeometryProps = {
  waiting: boolean;
};

const BoardGeometry = (props: BoardGeometryProps) => {
  const boardGroup = useRef<Three.Group>();

  useFrame(() => {
    if (boardGroup.current) {
      if (props.waiting) {
        boardGroup.current.rotation.z -= 0.0005;
      } else {
        boardGroup.current.rotation.z = 0;
      }
    }
  });

  return (
    <group rotation={new Three.Euler(-Math.PI / 4, 0, 0)} ref={boardGroup}>
      <Cell position={new Three.Vector3(-1.2, 1.2, 0)} id={1} />
      <Cell position={new Three.Vector3(0, 1.2, 0)} id={2} />
      <Cell position={new Three.Vector3(1.2, 1.2, 0)} id={3} />

      <Cell position={new Three.Vector3(-1.2, 0, 0)} id={4} />
      <Cell position={new Three.Vector3(0, 0, 0)} id={5} />
      <Cell position={new Three.Vector3(1.2, 0, 0)} id={6} />

      <Cell position={new Three.Vector3(-1.2, -1.2, 0)} id={7} />
      <Cell position={new Three.Vector3(0, -1.2, 0)} id={8} />
      <Cell position={new Three.Vector3(1.2, -1.2, 0)} id={9} />
    </group>
  );
};
