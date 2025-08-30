
import React from 'react';
import { motion } from 'framer-motion';

const FloatingElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* 3D Floating Geometric Shapes */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: 0,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
          }}
          animate={{
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
            ],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
            ],
            scale: [0.5, 1.2, 0.8, 1],
            rotateX: [0, 360, 180, 360],
            rotateY: [0, 180, 360, 180],
            rotateZ: [0, 90, 270, 360],
          }}
          transition={{
            duration: 20 + Math.random() * 20,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10,
          }}
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          <div
            className={`w-4 h-4 ${
              i % 4 === 0
                ? 'bg-gradient-to-br from-cyan-400/30 to-blue-500/30'
                : i % 4 === 1
                ? 'bg-gradient-to-br from-purple-400/30 to-pink-500/30'
                : i % 4 === 2
                ? 'bg-gradient-to-br from-green-400/30 to-emerald-500/30'
                : 'bg-gradient-to-br from-yellow-400/30 to-orange-500/30'
            } ${
              i % 3 === 0
                ? 'rounded-full'
                : i % 3 === 1
                ? 'rounded-none rotate-45'
                : 'rounded-lg'
            } shadow-lg backdrop-blur-sm`}
            style={{
              transform: `translateZ(${Math.random() * 100}px)`,
              filter: 'blur(0.5px)',
            }}
          />
        </motion.div>
      ))}

      {/* Large 3D Background Orbs */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full opacity-20"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: 0.5,
          }}
          animate={{
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
            ],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
            ],
            scale: [0.5, 1.5, 0.8, 1.2],
            rotateX: [0, 360],
            rotateY: [0, -360],
          }}
          transition={{
            duration: 30 + Math.random() * 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
          style={{
            width: `${100 + Math.random() * 200}px`,
            height: `${100 + Math.random() * 200}px`,
            background: `radial-gradient(circle, ${
              i % 3 === 0
                ? 'rgba(34, 211, 238, 0.3)'
                : i % 3 === 1
                ? 'rgba(168, 85, 247, 0.3)'
                : 'rgba(236, 72, 153, 0.3)'
            } 0%, transparent 70%)`,
            filter: 'blur(2px)',
            transformStyle: 'preserve-3d',
          }}
        />
      ))}

      {/* 3D Grid Pattern */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          rotateX: [0, 5, -5, 0],
          rotateY: [0, -2, 2, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(34, 211, 238, 0.3) 1px, transparent 1px),
            linear-gradient(rgba(34, 211, 238, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          transform: 'perspective(1000px) rotateX(60deg)',
          transformOrigin: 'center bottom',
        }}
      />
    </div>
  );
};

export default FloatingElements;
