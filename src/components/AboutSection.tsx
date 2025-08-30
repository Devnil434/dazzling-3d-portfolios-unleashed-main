
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GraduationCap, Award, Users, Code, Globe, Zap } from 'lucide-react';

const AboutSection = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -100]);
  const y2 = useTransform(scrollY, [0, 1000], [0, 50]);
  const rotateX = useTransform(scrollY, [0, 1000], [0, 15]);
  const rotateY = useTransform(scrollY, [0, 1000], [0, -10]);

  const achievements = [
    { 
      icon: GraduationCap, 
      title: 'Academic Excellence', 
      desc: '84% in both 10th & 12th',
      color: 'from-blue-500 to-blue-700'
    },
    { 
      icon: Award, 
      title: 'Hackathon Winner', 
      desc: '2nd Place in Smart India Hackathon(Internal)',
      color: 'from-yellow-500 to-orange-600'
    },
    { 
      icon: Users, 
      title: 'Community Member', 
      desc: 'Google Developer Student Club & Indian Society for Technical Education',
      color: 'from-green-500 to-green-700'
    },
  ];

  const stats = [
    { number: '10+', label: 'Projects Completed', icon: Code },
    { number: '2+', label: 'Years Learning', icon: Globe },
    { number: '10+', label: 'Technologies', icon: Zap },
  ];

  return (
    <section id="about" className="py-24 px-4 relative overflow-hidden">
      {/* Enhanced 3D Background Elements */}
      <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
        <motion.div 
          style={{ y: y1, rotateX, rotateY }}
          className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
        />
        <motion.div 
          style={{ 
            y: y2, 
            rotateX: useTransform(scrollY, [0, 1000], [0, -20]),
            rotateY: useTransform(scrollY, [0, 1000], [0, 15])
          }}
          className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"
        />
        
        {/* 3D Floating Grid */}
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{
            rotateX: [0, 3, -3, 0],
            rotateY: [0, -2, 2, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(34, 211, 238, 0.5) 1px, transparent 1px),
              linear-gradient(rgba(168, 85, 247, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            transform: 'perspective(1000px) rotateX(45deg)',
            transformStyle: 'preserve-3d'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced 3D Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: -30 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
            whileHover={{ 
              scale: 1.05,
              rotateX: 10,
              rotateY: 5,
              z: 50
            }}
          >
            About Me
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full"
            initial={{ scaleX: 0, rotateZ: -180 }}
            whileInView={{ scaleX: 1, rotateZ: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20 items-center mb-20">
          {/* Enhanced 3D "ABOUT ME" text */}
          <motion.div
            initial={{ opacity: 0, x: -50, rotateY: -45 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="relative">
              <motion.h2 
                className="text-8xl md:text-9xl font-black text-white/5 leading-none select-none"
                animate={{
                  rotateX: [0, 2, -2, 0],
                  rotateY: [0, -1, 1, 0],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                ABOUT
              </motion.h2>
              <motion.h3 
                className="text-6xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent absolute bottom-0 left-0"
                whileHover={{ 
                  scale: 1.05,
                  rotateX: 15,
                  rotateY: 10,
                  z: 100
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                ME
              </motion.h3>
              {/* Enhanced 3D Shadow Effect */}
              <motion.h3 
                className="text-6xl md:text-7xl font-black text-cyan-400/20 absolute bottom-1 left-1 -z-10"
                animate={{
                  rotateX: [0, 5, -5, 0],
                  rotateY: [0, 2, -2, 0],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                ME
              </motion.h3>
            </div>
          </motion.div>

          {/* Enhanced 3D Content Card */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: 45 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div 
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-cyan-400/30 transition-all duration-300 group"
              whileHover={{ 
                scale: 1.02,
                rotateX: 5,
                rotateY: 5,
                z: 30
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="mb-6">
                <motion.span 
                  className="text-3xl mb-4 block"
                  animate={{ rotateZ: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  👋
                </motion.span>
                <p className="text-white text-xl leading-relaxed">
                  Hey, I'm <span className="text-cyan-400 font-semibold">Nilanjan Saha</span>, a passionate <span className="text-cyan-400 font-semibold">Software Developer</span>.
                </p>
              </div>
              
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                I'm a passionate developer with expertise in both <span className="text-cyan-400 font-semibold">frontend</span> and <span className="text-cyan-400 font-semibold">backend</span> technologies. I love creating efficient, scalable applications and exploring new technologies to solve complex problems.
              </p>
              
              <p className="text-gray-300 text-lg leading-relaxed">
                Currently pursuing my studies while building real-world projects. I enjoy working with modern web technologies, softwares techs and am always eager to learn and adapt to new challenges in the ever-evolving tech landscape.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced 3D Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30, rotateY: -45 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                rotateX: 10,
                rotateY: 5,
                z: 50
              }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 text-center border border-slate-700/50 hover:border-cyan-400/50 transition-all duration-300 group"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.div
                whileHover={{ 
                  rotateX: 360,
                  rotateY: 180,
                  scale: 1.1
                }}
                transition={{ duration: 0.5 }}
                className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-cyan-400/25"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <stat.icon className="text-white" size={24} />
              </motion.div>
              <h3 className="text-3xl font-bold text-cyan-400 mb-2">{stat.number}</h3>
              <p className="text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced 3D Achievements Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {achievements.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30, rotateX: -30 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                rotateX: 10,
                rotateY: 10,
                z: 50
              }}
              className="group relative bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 text-center border border-slate-700/50 hover:border-cyan-400/50 transition-all duration-300 overflow-hidden"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Enhanced Background Gradient */}
              <motion.div 
                className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                animate={{
                  rotateZ: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              <motion.div
                whileHover={{ 
                  rotateX: 360, 
                  rotateY: 180,
                  scale: 1.1,
                  z: 30
                }}
                transition={{ duration: 0.5 }}
                className={`relative w-16 h-16 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg group-hover:shadow-cyan-400/25`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <item.icon className="text-white" size={24} />
              </motion.div>
              <h3 className="relative text-white font-semibold mb-3 text-lg group-hover:text-cyan-400 transition-colors">{item.title}</h3>
              <p className="relative text-gray-400 group-hover:text-gray-300 transition-colors">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
