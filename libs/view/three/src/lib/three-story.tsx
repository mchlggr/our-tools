import * as React from 'react';
import { Vector3 } from 'three';
import { Canvas, Props, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

type ThreeStoryProps = React.PropsWithChildren<
  Props & {
  cameraFov?: number
  cameraPosition?: Vector3
  controls?: boolean
  lights?: boolean
}
>

const ThreeStory = ({
                      children,
                      cameraFov = 75,
                      cameraPosition = new Vector3(-5, 5, 5),
                      controls = true,
                      lights = true,
                      ...restProps
                    }: ThreeStoryProps) => {
  return <Canvas shadows camera={{ position: cameraPosition, fov: cameraFov }} {...restProps}   >
    {children}
    {lights && (
      <>
        <ambientLight intensity={0.8} />
        <pointLight intensity={1} position={[0, 6, 0]} />
      </>
    )}
    {controls && <OrbitControls makeDefault />}
  </Canvas>;
};

// ---

export { ThreeStory };
