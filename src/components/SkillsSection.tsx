
import React from 'react';
import { motion } from 'framer-motion';

const SkillsSection = () => {
  const coreStack = [
    { name: 'Next.js', icon: '⚡', proficiency: 90 },
    { name: 'React', icon: '⚛️', proficiency: 95 },
    { name: 'Node.js', icon: '🟢', proficiency: 85 },
    { name: 'TypeScript', icon: '🔷', proficiency: 80 },
    { name: 'PostgreSQL', icon: '🐘', proficiency: 75 },
    { name: 'Pandas', icon: '🐼', proficiency: 70 },
  ];

  const uiStyling = [
    { name: 'Material-UI', icon: '🎨', proficiency: 85 },
    { name: 'Styled Components', icon: '💅', proficiency: 80 },
    { name: 'Tailwind CSS', icon: '🌊', proficiency: 95 },
    { name: 'Shadcn UI', icon: '🎭', proficiency: 90 },
  ];

  const databases = [
    { name: 'PostgreSQL', icon: '🐘', proficiency: 85 },
    { name: 'MongoDB', icon: '🍃', proficiency: 80 },
    { name: 'NeonDB', icon: '🌟', proficiency: 75 },
  ];

  const SkillCard = ({ tech, index, delay = 0 }: { tech: any, index: number, delay?: number }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay + index * 0.1 }}
      whileHover={{ 
        scale: 1.1,
        y: -10,
        rotate: [0, -2, 2, 0],
        transition: { duration: 0.3 }
      }}
      className="group relative bg-slate-800/70 backdrop-blur-sm rounded-xl p-6 text-center border border-slate-700/50 cursor-pointer overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Skill Icon */}
      <div className="relative text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
        {tech.icon}
      </div>
      
      {/* Skill Name */}
      <span className="relative text-gray-300 group-hover:text-cyan-400 transition-colors duration-300 text-sm font-medium block mb-3">
        {tech.name}
      </span>
      
      {/* Proficiency Bar */}
      <div className="relative w-full bg-slate-700 rounded-full h-2 mb-2">
        <motion.div
          className="bg-gradient-to-r from-cyan-400 to-purple-600 h-2 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${tech.proficiency}%` }}
          transition={{ duration: 1, delay: delay + index * 0.1 + 0.3 }}
        />
      </div>
      <span className="relative text-xs text-gray-400">{tech.proficiency}%</span>
      
      {/* Hover Border Effect */}
      <div className="absolute inset-0 rounded-xl border-2 border-cyan-400/0 group-hover:border-cyan-400/50 transition-all duration-300"></div>
    </motion.div>
  );

  return (
    <section id="skills" className="py-24 px-4 bg-slate-800/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Tech Stack
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A comprehensive overview of technologies I work with to build modern, scalable applications
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full mt-6"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left side - Skills content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-16"
          >
            {/* Core Stack */}
            <div>
              <motion.h3 
                className="text-2xl font-bold text-white mb-8 flex items-center"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-3 h-3 bg-cyan-400 rounded-full mr-4"></div>
                Core Technologies
              </motion.h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {coreStack.map((tech, index) => (
                  <SkillCard key={tech.name} tech={tech} index={index} />
                ))}
              </div>
            </div>

            {/* UI & Styling */}
            <div>
              <motion.h3 
                className="text-2xl font-bold text-white mb-8 flex items-center"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="w-3 h-3 bg-purple-400 rounded-full mr-4"></div>
                UI & Styling
              </motion.h3>
              <div className="grid grid-cols-2 gap-6">
                {uiStyling.map((tech, index) => (
                  <SkillCard key={tech.name} tech={tech} index={index} delay={0.2} />
                ))}
              </div>
            </div>

            {/* Databases */}
            <div>
              <motion.h3 
                className="text-2xl font-bold text-white mb-8 flex items-center"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="w-3 h-3 bg-green-400 rounded-full mr-4"></div>
                Databases
              </motion.h3>
              <div className="grid grid-cols-3 gap-6">
                {databases.map((tech, index) => (
                  <SkillCard key={tech.name} tech={tech} index={index} delay={0.4} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right side - Large "TECH SET" text with 3D effect */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex items-center justify-center lg:sticky lg:top-24"
          >
            <div className="text-center relative">
              <motion.div
                animate={{ 
                  rotateY: [0, 5, -5, 0],
                  rotateX: [0, 2, -2, 0]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative"
                style={{ transformStyle: "preserve-3d" }}
              >
                <h2 className="text-8xl md:text-9xl font-black text-white/5 leading-none select-none">
                  TECH
                </h2>
                <h3 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent -mt-4 relative">
                  SET
                </h3>
                {/* 3D Shadow Effect */}
                <h3 className="text-6xl md:text-7xl font-black text-cyan-400/20 absolute -bottom-1 left-1 -z-10">
                  SET
                </h3>
              </motion.div>
              
              {/* Floating Elements */}
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-10 -right-10 w-6 h-6 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full opacity-60"
              ></motion.div>
              
              <motion.div
                animate={{ 
                  y: [0, 15, 0],
                  rotate: [360, 180, 0]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
                className="absolute bottom-10 -left-10 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full opacity-60"
              ></motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
