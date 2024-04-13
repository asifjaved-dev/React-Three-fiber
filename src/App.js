import './App.css';
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Header from "./components/Header";
import React, { useRef, Suspense } from 'react'


const Table = () => {
  const gltf = useLoader(GLTFLoader, "./woodenTable.gltf");
  return (
    <>
      <primitive
        object={gltf.scene}
        scale={0.03}
        position={[0, -4, 0]}
      />
    </>
  );
};
const Chair = () => {
  const gltf = useLoader(GLTFLoader, "./armchairRed.gltf");
  return (
    <>
      <primitive
        object={gltf.scene}
        scale={0.05}
        position={[0, -4, -3]}
      />
    </>
  );
};

const Chair2 = () => {
  const chairRef = useRef();
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    chairRef.current.rotation.y = elapsedTime / 4;
  });
  const gltf = useLoader(GLTFLoader, "./rockingChair.gltf");
  return (
    <>
      <primitive
      ref={chairRef}
        object={gltf.scene}
        scale={3}
        position={[0, -0.5, 0]}
        rotation={[0, 0, 0]}
      />
    </>
  );
};




const Lights = () => {
  
  return (
    <>
      {/* Ambient Light illuminates lights for all objects */}
      <ambientLight intensity={0.3} />
      {/* Diretion light */}
      <directionalLight position={[10, 10, 5]} intensity={1} />
      {/* <directionalLight
        castShadow
        position={[0, 10, 0]}
        intensity={1.5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      /> */}
      {/* Spotlight Large overhead light */}
      <spotLight intensity={1} position={[1000, 0, 0]} castShadow />
    </>
  );
};


function App() {

  return (
    <>
      {/* <Header /> */}
      <Canvas>
        <Suspense fallback={null}>
          <Lights />
          {/* <Table /> */}
          {/* <Chair /> */}
          <Chair2 />
          <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} zoomSpeed={0.6} panSpeed={0.5} rotateSpeed={0.4} />
          {/* <Environment preset="sunset" background /> */}
        </Suspense>
      </Canvas>

    </>
  );
}

export default App;
