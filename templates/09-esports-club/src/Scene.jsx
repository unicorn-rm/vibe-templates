import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Float, Lightformer } from "@react-three/drei";
import * as THREE from "three";

/* The club crest as an enamel pin: an extruded shield, a stripe inlay and a star.
   Built from Shapes, so you can redraw the crest in code — no model files. */
function shield(w = 1.6, h = 2) {
  const s = new THREE.Shape();
  s.moveTo(-w / 2, h / 2);
  s.lineTo(w / 2, h / 2);
  s.lineTo(w / 2, -h * 0.05);
  s.quadraticCurveTo(w / 2, -h * 0.38, 0, -h / 2);
  s.quadraticCurveTo(-w / 2, -h * 0.38, -w / 2, -h * 0.05);
  s.closePath();
  return s;
}
function star(r = 0.32) {
  const s = new THREE.Shape();
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2 + Math.PI / 2, rr = i % 2 ? r * 0.45 : r;
    i ? s.lineTo(Math.cos(a) * rr, Math.sin(a) * rr) : s.moveTo(Math.cos(a) * rr, Math.sin(a) * rr);
  }
  return s;
}

function Crest() {
  const ref = useRef();
  const geo = useMemo(() => ({
    rim: new THREE.ExtrudeGeometry(shield(1.8, 2.2), { depth: 0.18, bevelEnabled: true, bevelSize: 0.04, bevelThickness: 0.04, bevelSegments: 3 }),
    face: new THREE.ExtrudeGeometry(shield(1.5, 1.88), { depth: 0.08, bevelEnabled: false }),
    star: new THREE.ExtrudeGeometry(star(), { depth: 0.06, bevelEnabled: true, bevelSize: 0.015, bevelThickness: 0.015 }),
  }), []);
  useFrame((state, dt) => {
    const { x, y } = state.pointer;
    ref.current.rotation.y += ((x * 0.7 + Math.sin(state.clock.elapsedTime * 0.5) * 0.35) - ref.current.rotation.y) * Math.min(1, dt * 3);
    ref.current.rotation.x += (-y * 0.35 - ref.current.rotation.x) * Math.min(1, dt * 3);
  });
  return (
    <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.5}>
      <group ref={ref}>
        <mesh geometry={geo.rim} position={[0, 0, -0.1]}>
          <meshStandardMaterial color="#c9c4b5" metalness={0.9} roughness={0.28} />
        </mesh>
        <mesh geometry={geo.face} position={[0, 0, 0.12]}>
          <meshStandardMaterial color="#00704a" roughness={0.35} />
        </mesh>
        {/* orange stripe inlay */}
        <mesh position={[0, 0.05, 0.215]}>
          <boxGeometry args={[0.36, 1.7, 0.02]} />
          <meshStandardMaterial color="#f26522" roughness={0.4} />
        </mesh>
        <mesh geometry={geo.star} position={[0, 0.62, 0.22]}>
          <meshStandardMaterial color="#e9e4d4" metalness={0.8} roughness={0.25} />
        </mesh>
      </group>
    </Float>
  );
}

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 5.2], fov: 40 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={2.2} />
      {/* local studio lighting — no HDR download */}
      <Environment resolution={256}>
        <Lightformer intensity={3} position={[0, 4, 3]} scale={[8, 2, 1]} />
        <Lightformer intensity={1.5} position={[-4, 0, 2]} scale={[2, 6, 1]} />
        <Lightformer intensity={1.2} position={[4, -1, 2]} scale={[2, 6, 1]} color="#f26522" />
      </Environment>
      <Crest />
      <ContactShadows position={[0, -1.6, 0]} opacity={0.35} scale={6} blur={2.4} far={3} />
    </Canvas>
  );
}
