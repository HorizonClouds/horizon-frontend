import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Loader2, Cog, Zap } from 'lucide-react';
// import './WIP.css';

const ExaggeratedWorkInProgress = () => {
  const [progress, setProgress] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => (prevProgress + 1) % 101);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    controls.start({
      scale: [1, 1.2, 1],
      rotate: [0, 360],
      transition: { duration: 2, repeat: Infinity },
    });
  }, [controls]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="relative text-center text-4xl md:text-6xl lg:text-8xl font-bold glitch-text-container">
        <div className="glitch-text" data-text="WORK IN PROGRESS">
          <span className="block">WORK</span>
          <span className="block">IN</span>
          <span className="block">PROGRESS</span>
        </div>
      </div>
      <br></br>
      <div className=" inset-0 cosmic-background"></div>
      <motion.div
        className="items-center flex items-center justify-center w-64 h-64 md:w-96 md:h-96 lg:w-128 lg:h-128 rounded-full"
        style={{ background: `conic-gradient(from 0deg, #00ffff ${progress}%, #ff00ff ${progress}% 100%)` }}
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        <motion.div className="flex items-center justify-center w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 rounded-full bg-gray-800" animate={controls}>
          <Loader2 className="animate-spin text-white w-1/2 h-1/2" size={48} />
        </motion.div>
      </motion.div>
      <div className="mt-4 text-xl md:text-2xl lg:text-3xl">{progress}%</div>
      <div className=" inset-0 pointer-events-none">

      </div>


    </div>
  );
};

export default ExaggeratedWorkInProgress;

