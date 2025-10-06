import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface YogaAvatar3DProps {
  pose: string;
}

// Avatar body parts
const AvatarBody = ({ pose }: { pose: string }) => {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const torsoRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Group>(null);
  const rightLegRef = useRef<THREE.Group>(null);

  // Target rotations for different poses
  const poseRotations = {
    tree: {
      leftArm: { x: 0, y: 0, z: -2.5 },
      rightArm: { x: 0, y: 0, z: 2.5 },
      leftLeg: { x: 0.3, y: 0.5, z: 0 },
      rightLeg: { x: 0, y: 0, z: 0 },
      torso: { x: 0, y: 0, z: 0 }
    },
    cat: {
      leftArm: { x: 0, y: 0, z: 0 },
      rightArm: { x: 0, y: 0, z: 0 },
      leftLeg: { x: 0, y: 0, z: 0 },
      rightLeg: { x: 0, y: 0, z: 0 },
      torso: { x: 0.5, y: 0, z: 0 }
    },
    warrior: {
      leftArm: { x: 0, y: 0, z: -1.8 },
      rightArm: { x: 0, y: 0, z: 1.8 },
      leftLeg: { x: 0.5, y: -0.3, z: 0 },
      rightLeg: { x: -0.3, y: 0, z: 0 },
      torso: { x: 0, y: 0, z: 0 }
    },
    "downward-dog": {
      leftArm: { x: -0.8, y: 0, z: 0 },
      rightArm: { x: -0.8, y: 0, z: 0 },
      leftLeg: { x: -0.8, y: 0, z: 0 },
      rightLeg: { x: -0.8, y: 0, z: 0 },
      torso: { x: 0.8, y: 0, z: 0 }
    }
  };

  const targetRotations = poseRotations[pose as keyof typeof poseRotations] || poseRotations.tree;

  // Smooth transition animation
  useFrame(() => {
    if (!leftArmRef.current || !rightArmRef.current || !leftLegRef.current || !rightLegRef.current || !torsoRef.current) return;

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const lerpSpeed = 0.05;

    // Smoothly transition arms
    leftArmRef.current.rotation.x = lerp(leftArmRef.current.rotation.x, targetRotations.leftArm.x, lerpSpeed);
    leftArmRef.current.rotation.y = lerp(leftArmRef.current.rotation.y, targetRotations.leftArm.y, lerpSpeed);
    leftArmRef.current.rotation.z = lerp(leftArmRef.current.rotation.z, targetRotations.leftArm.z, lerpSpeed);

    rightArmRef.current.rotation.x = lerp(rightArmRef.current.rotation.x, targetRotations.rightArm.x, lerpSpeed);
    rightArmRef.current.rotation.y = lerp(rightArmRef.current.rotation.y, targetRotations.rightArm.y, lerpSpeed);
    rightArmRef.current.rotation.z = lerp(rightArmRef.current.rotation.z, targetRotations.rightArm.z, lerpSpeed);

    // Smoothly transition legs
    leftLegRef.current.rotation.x = lerp(leftLegRef.current.rotation.x, targetRotations.leftLeg.x, lerpSpeed);
    leftLegRef.current.rotation.y = lerp(leftLegRef.current.rotation.y, targetRotations.leftLeg.y, lerpSpeed);
    leftLegRef.current.rotation.z = lerp(leftLegRef.current.rotation.z, targetRotations.leftLeg.z, lerpSpeed);

    rightLegRef.current.rotation.x = lerp(rightLegRef.current.rotation.x, targetRotations.rightLeg.x, lerpSpeed);
    rightLegRef.current.rotation.y = lerp(rightLegRef.current.rotation.y, targetRotations.rightLeg.y, lerpSpeed);
    rightLegRef.current.rotation.z = lerp(rightLegRef.current.rotation.z, targetRotations.rightLeg.z, lerpSpeed);

    // Smoothly transition torso
    torsoRef.current.rotation.x = lerp(torsoRef.current.rotation.x, targetRotations.torso.x, lerpSpeed);
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Head */}
      <mesh ref={headRef} position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color="#ffdbac" />
      </mesh>

      {/* Torso */}
      <mesh ref={torsoRef} position={[0, 0.7, 0]}>
        <boxGeometry args={[0.6, 1.2, 0.4]} />
        <meshStandardMaterial color="#4A90E2" />
      </mesh>

      {/* Left Arm */}
      <group ref={leftArmRef} position={[-0.4, 1.2, 0]}>
        <mesh position={[0, -0.4, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.8, 16]} />
          <meshStandardMaterial color="#ffdbac" />
        </mesh>
      </group>

      {/* Right Arm */}
      <group ref={rightArmRef} position={[0.4, 1.2, 0]}>
        <mesh position={[0, -0.4, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.8, 16]} />
          <meshStandardMaterial color="#ffdbac" />
        </mesh>
      </group>

      {/* Left Leg */}
      <group ref={leftLegRef} position={[-0.2, 0, 0]}>
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 1, 16]} />
          <meshStandardMaterial color="#2C3E50" />
        </mesh>
      </group>

      {/* Right Leg */}
      <group ref={rightLegRef} position={[0.2, 0, 0]}>
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 1, 16]} />
          <meshStandardMaterial color="#2C3E50" />
        </mesh>
      </group>
    </group>
  );
};

export const YogaAvatar3D = ({ pose }: YogaAvatar3DProps) => {
  return (
    <div className="w-full h-full rounded-xl overflow-hidden bg-gradient-to-b from-primary/10 to-accent/10">
      <Canvas camera={{ position: [0, 1, 4], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <directionalLight position={[-5, 3, -5]} intensity={0.4} />
        <AvatarBody pose={pose} />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};
