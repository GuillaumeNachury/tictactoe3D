import * as THREE from "three";
import React, { useMemo } from "react";
import { useLoader, useUpdate } from "react-three-fiber";

import { COLORS } from "../../constants";

export default function ({
  children,
  vAlign = "center",
  hAlign = "center",
  size = 1,
  color = "#000000",
  ...props
}) {
  const font = useLoader(THREE.FontLoader, "/fonts/bold.blob");
  const config = useMemo(
    () => ({
      font,
      size: 40,
      height: 30,
      curveSegments: 32,
      bevelEnabled: true,
      bevelThickness: 6,
      bevelSize: 2.5,
      bevelOffset: 0,
      bevelSegments: 8,
    }),
    [font]
  );
  const mesh = useUpdate(
    (self: any) => {
      const size = new THREE.Vector3();
      self.geometry.computeBoundingBox();
      self.geometry.boundingBox.getSize(size);
      self.position.x =
        hAlign === "center" ? -size.x / 2 : hAlign === "right" ? 0 : -size.x;
      self.position.y =
        vAlign === "center" ? -size.y / 2 : vAlign === "top" ? 0 : -size.y;
    },
    [children]
  );
  return (
    <group {...props} scale={[0.15 * size, 0.15 * size, 0.1 * size]}>
      <mesh ref={mesh}>
        <textGeometry attach="geometry" args={[children, config]} />
        <meshStandardMaterial color={COLORS.GEORGES_BLUE} />
      </mesh>
    </group>
  );
}
