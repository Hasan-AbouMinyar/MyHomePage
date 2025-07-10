import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { motion } from 'framer-motion';

function Model() {
  const { scene } = useGLTF('/codewithstar.glb');
  return <primitive object={scene} scale={2.5} position-y={-1.5} />;
}

const Hero = () => {
  return (
    <section className="h-screen w-full bg-gray-400 dark:bg-black relative flex justify-center items-center">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={1.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            <Model />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} />
          </Suspense>
        </Canvas>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative z-10 text-center"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white">Hasan Abouminyar</h1>
        <p className="text-xl md:text-2xl mt-4 font-light text-gray-800 dark:text-gray-300">Software Developer</p>
        <p className="mt-6 text-lg max-w-2xl mx-auto text-gray-700 dark:text-gray-400 italic">"Coding is just advanced Ctrl+C and Ctrl+V — with a little bit of magic in between."</p>
      </motion.div>
    </section>
  );
};

export default Hero;
