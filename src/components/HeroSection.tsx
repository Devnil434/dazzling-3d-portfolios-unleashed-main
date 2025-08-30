import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail, Download, Eye, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const rotateX = useTransform(scrollY, [0, 500], [0, 10]);
  const rotateY = useTransform(scrollY, [0, 500], [0, -5]);
  // Keep buttons more visible during scroll
  const buttonOpacity = useTransform(scrollY, [0, 200], [1, 0.9]);
  const buttonTransform = useTransform(scrollY, [0, 150], [0, -5]);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden pt-20">
      {/* Enhanced 3D Background */}
      <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
        <motion.div 
          style={{ 
            y: y1,
            rotateX,
            rotateY
          }}
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl animate-pulse"
        />
        <motion.div 
          style={{ 
            y: y2,
            rotateX: useTransform(scrollY, [0, 500], [0, -15]),
            rotateY: useTransform(scrollY, [0, 500], [0, 10])
          }}
          className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse delay-1000"
        />
        
        {/* 3D Rotating Background Element */}
        <motion.div 
          animate={{
            rotateX: [0, 360],
            rotateY: [0, -360],
            rotateZ: [0, 180],
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-conic from-indigo-500/20 via-purple-500/20 to-cyan-500/20 rounded-full blur-3xl"
          style={{ transformStyle: 'preserve-3d' }}
        />
        
        {/* 3D Geometric Grid Pattern */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          animate={{
            rotateX: [0, 2, -2, 0],
            rotateY: [0, -1, 1, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(34, 211, 238, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)`,
            backgroundSize: '100px 100px',
            transform: 'perspective(1000px)',
            transformStyle: 'preserve-3d'
          }}
        />
      </div>

      <motion.div 
        style={{ 
          opacity: buttonOpacity,
          rotateX: useTransform(scrollY, [0, 300], [0, 5]),
        }} 
        className="max-w-6xl mx-auto text-center relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Enhanced 3D Status Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -180 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ 
              scale: 1.05, 
              rotateX: 5,
              rotateY: 5,
              z: 50
            }}
            className="inline-flex items-center px-6 py-3 bg-slate-800/80 backdrop-blur-md border border-cyan-400/30 rounded-full mb-8 group hover:bg-slate-700/80 transition-all duration-300"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.div 
              animate={{ scale: [1, 1.2, 1], rotateZ: [0, 180, 360] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-3 h-3 bg-green-400 rounded-full mr-3"
            />
            <span className="text-gray-300 font-medium">Available for new opportunities</span>
            <Sparkles className="ml-2 w-4 h-4 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
          </motion.div>

          <motion.div
            className="space-y-6 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.p
              className="text-xl md:text-2xl text-gray-300 font-light tracking-wide"
              initial={{ opacity: 0, rotateX: -90 }}
              animate={{ opacity: 1, rotateX: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Hello, I'm
            </motion.p>

            {/* 3D Name with Enhanced Effects */}
            <motion.h1
              className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 relative"
              initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1.2, delay: 0.4, type: "spring", stiffness: 100 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.span 
                className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent relative inline-block"
                whileHover={{ 
                  scale: 1.05,
                  rotateX: 10,
                  rotateY: 10,
                  z: 100
                }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                NILANJAN
              </motion.span>
              <br />
              <motion.span 
                className="bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-400 bg-clip-text text-transparent relative inline-block"
                whileHover={{ 
                  scale: 1.05,
                  rotateX: -10,
                  rotateY: -10,
                  z: 100
                }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                SAHA
              </motion.span>
              
              {/* Enhanced 3D Text Shadow */}
              <motion.div 
                className="absolute inset-0 -z-10"
                animate={{
                  rotateX: [0, 2, -2, 0],
                  rotateY: [0, -1, 1, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 via-blue-500/30 to-purple-600/30 bg-clip-text text-transparent transform translate-x-2 translate-y-2 blur-sm">
                  NILANJAN SAHA
                </span>
              </motion.div>
            </motion.h1>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.h2 
                className="text-3xl md:text-4xl text-white font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05, rotateX: 5 }}
              >
                Software Developer
              </motion.h2>
              <motion.div 
                className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full"
                initial={{ width: 0, rotateZ: -180 }}
                animate={{ width: 128, rotateZ: 0 }}
                transition={{ duration: 1, delay: 1.2 }}
              />
            </motion.div>
          </motion.div>

          <motion.p
            className="text-lg md:text-xl text-gray-400 max-w-4xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 30, rotateX: -20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            Crafting exceptional digital experiences with cutting-edge technologies. 
            Specialized in React, Node.js, and modern cloud solutions with a passion for innovation. Solving problem using DSA & also exploring different tech stacks in AI/ML.
          </motion.p>

          {/* Enhanced 3D Social Links */}
          <motion.div
            className="flex justify-center space-x-6 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            {[
              { icon: Github, href: 'https://github.com/Devnil434', label: 'GitHub', gradient: 'from-gray-600 to-gray-800' },
              { icon: Linkedin, href: 'https://linkedin.com/in/devnil-674580189', label: 'LinkedIn', gradient: 'from-blue-600 to-blue-800' },
              { icon: Mail, href: 'https://nilanjans434@gmail.com', label: 'Email', gradient: 'from-red-500 to-red-700' },
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ 
                  scale: 1.2, 
                  rotateX: 15,
                  rotateY: 15,
                  y: -8,
                  z: 50
                }}
                whileTap={{ scale: 0.9 }}
                className={`group relative w-16 h-16 bg-gradient-to-br ${social.gradient} rounded-2xl flex items-center justify-center text-white backdrop-blur-sm border border-white/10 hover:border-cyan-400/50 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-cyan-400/25`}
                title={social.label}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <social.icon size={24} className="relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-purple-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.a>
            ))}
          </motion.div>

          {/* Enhanced 3D CTA Buttons */}
          <motion.div
            style={{ y: buttonTransform }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-20 px-4 relative z-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <motion.div 
              whileHover={{ 
                scale: 1.05,
                rotateX: 10,
                rotateY: 5,
                z: 30
              }} 
              whileTap={{ scale: 0.95 }} 
              className="w-full sm:w-auto"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Button
                onClick={() => scrollToSection('about')}
                className="group relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-400/25 transition-all duration-300 border border-cyan-500/30 overflow-hidden backdrop-blur-sm"
              >
                <motion.span 
                  className="relative z-10 flex items-center justify-center gap-3"
                  whileHover={{ x: 2 }}
                >
                  <Eye size={20} />
                  Discover My Work
                </motion.span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </motion.div>
            
            <motion.div 
              whileHover={{ 
                scale: 1.05,
                rotateX: -10,
                rotateY: -5,
                z: 30
              }} 
              whileTap={{ scale: 0.95 }} 
              className="w-full sm:w-auto"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Button
                variant="outline"
                onClick={() => window.open('https://drive.google.com/file/d/1KmwtZk6On6W3qTmLrTe4QkS1z_A4V6tp/view?usp=sharing', '_blank')}
                className="group relative w-full sm:w-auto px-8 py-4 bg-slate-800/50 backdrop-blur-md border-2 border-cyan-400/60 text-cyan-400 rounded-2xl font-semibold text-lg hover:bg-cyan-400/10 hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-400/25 transition-all duration-300 overflow-hidden"
              >
                <motion.span 
                  className="relative z-10 flex items-center justify-center gap-3"
                  whileHover={{ x: 2 }}
                >
                  <Download size={20} />
                  Download CV
                </motion.span>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Enhanced 3D Scroll Indicator */}
      <motion.div
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer group z-30"
        animate={{ 
          y: [0, 8, 0],
          rotateX: [0, 5, 0],
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        onClick={() => scrollToSection('about')}
        whileHover={{ 
          scale: 1.1,
          rotateX: 15,
          z: 50
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <motion.div className="flex flex-col items-center space-y-3">
          <span className="text-gray-300 text-sm font-medium group-hover:text-cyan-400 transition-colors duration-300 bg-slate-800/70 backdrop-blur-md px-3 py-1 rounded-full border border-cyan-400/30">
            Scroll to explore
          </span>
          <motion.div 
            className="w-8 h-12 border-2 border-cyan-400/70 rounded-full flex justify-center group-hover:border-cyan-400 transition-all duration-300 backdrop-blur-md bg-slate-800/50"
            whileHover={{ 
              boxShadow: "0 0 30px rgba(34, 211, 238, 0.5)",
              borderColor: "rgba(34, 211, 238, 1)",
              rotateY: 10
            }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.div
              className="w-1.5 h-4 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
          <ChevronDown 
            className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" 
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
