// src/components/Sphere360.tsx
import { useLoader } from '@react-three/fiber';
import { TextureLoader, BackSide } from 'three';
import { Sphere } from '@react-three/drei';
interface Sphere360Props {
  imageUrl: string;
}

const Sphere360: React.FC<Sphere360Props> = ({ imageUrl }) => {
  const texture = useLoader(TextureLoader, imageUrl);

  return (
    <>


      <Sphere args={[500, 60, 40]} scale={[1, 1, 1]}>
        <meshBasicMaterial
          map={texture}
          side={BackSide} // Render inside of sphere
        />
      </Sphere>

      {/* Optional ambient light for better visibility */}
      <ambientLight intensity={0.5} />
    </>
  );
};

export default Sphere360;