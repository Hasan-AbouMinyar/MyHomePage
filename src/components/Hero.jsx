import React, { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

function Model({ darkMode }) {
  const { scene } = useGLTF('/codewithstar.glb');

  useEffect(() => {
    scene.traverse((child) => {
      // Modify 3D meshes so they are visible in light mode (e.g. indigo/purple color)
      if (child.isMesh) {
        if (child.material) {
          // Backup original color and emissive properties if not already backed up
          if (!child.userData.originalColor) {
            child.userData.originalColor = child.material.color.clone();
            if (child.material.emissive) {
              child.userData.originalEmissive = child.material.emissive.clone();
            }
          }

          if (!darkMode) {
            // Light mode: Set to elegant classic dark gray/slate
            child.material.color.set('#4b5563');
            if (child.material.emissive) {
              child.material.emissive.set('#1f2937');
            }
          } else {
            // Dark mode: Set to elegant glowing white/silver
            child.material.color.set('#ffffff');
            if (child.material.emissive) {
              child.material.emissive.set('#334155');
            }
          }
        }
      }

      // Modify particle points (stars/dust) so they are visible in light mode
      if (child.isPoints) {
        if (child.material) {
          if (!child.userData.originalColor) {
            child.userData.originalColor = child.material.color.clone();
          }

          if (!darkMode) {
            // Light mode: Make particles a soft, comfortable neutral gray
            child.material.color.set('#9ca3af');
          } else {
            // Dark mode: Make particles a soft glowing silver-white (like real stars)
            child.material.color.set('#f1f5f9');
          }
        }
      }
    });
  }, [scene, darkMode]);

  return <primitive object={scene} scale={2.5} position-y={-1.5} />;
}

const Hero = ({ darkMode }) => {
  const { t } = useLanguage();

  return (
    <section id="hero" className="h-screen w-full bg-gradient-to-b from-[#f5f5f7] via-white to-[#f5f5f7] dark:from-black dark:via-[#0c0c0e] dark:to-black relative flex justify-center items-center">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={1.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            <Model darkMode={darkMode} />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} />
          </Suspense>
        </Canvas>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.96, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        className="relative z-10 text-center px-4"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white">{t('name')}</h1>
        <p className="text-lg md:text-2xl mt-4 font-light text-zinc-700 dark:text-zinc-300 max-w-3xl mx-auto">{t('title')}</p>
        <p className="mt-6 text-base md:text-lg max-w-2xl mx-auto text-zinc-500 dark:text-zinc-400 italic">{t('quote')}</p>
      </motion.div>
    </section>
  );
};

export default Hero;
