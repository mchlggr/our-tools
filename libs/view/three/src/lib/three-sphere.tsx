import { Sphere } from '@react-three/drei';
import { ViewSphereProps } from '@our-tools/view-shared';


export function ThreeSphere(props: ViewSphereProps) {
  return (
    <Sphere position={[1, 0, 0]} scale={[3, 3, 3]}>
      <meshPhongMaterial color={'blue'} />
    </Sphere>
  );
}

export default ThreeSphere;
