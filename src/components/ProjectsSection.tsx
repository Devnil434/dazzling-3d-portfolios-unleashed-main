
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Calculator, User, Landmark, Lock, Utensils, Trophy, Award } from 'lucide-react';

const ProjectsSection = () => {
  const projects = [
    {
      title: 'Rent Calculator',
      description: 'A comprehensive rent calculation application built with modern web technologies for accurate rental computations.',
      technologies: ['JavaScript', 'HTML', 'CSS'],
      githubUrl: 'https://github.com/Devnil434/rent-calculator.git',
      icon: Calculator,
    },
    {
      title: 'My Profile',
      description: 'Personal portfolio website showcasing skills, projects, and achievements with responsive design.',
      technologies: ['React', 'CSS', 'JavaScript'],
      githubUrl: 'https://github.com/Devnil434/My-Profile.git',
      icon: User,
    },
    {
      title: 'Bank Account Management System',
      description: 'Comprehensive banking system with account management, transactions, and security features.',
      technologies: ['Java', 'Database', 'API'],
      githubUrl: 'https://github.com/Devnil434/My_Bank-System.git',
      icon: Landmark,
    },
    {
      title: 'Password Master',
      description: 'Secure password management application with encryption and user-friendly interface.',
      technologies: ['Security', 'Encryption', 'Web API'],
      githubUrl: 'https://github.com/Devnil434/Password_Master.git',
      icon: Lock,
    },
    {
      title: 'Restaurant System',
      description: 'Complete restaurant management system with menu management, ordering, and billing features.',
      technologies: ['Full Stack', 'Database', 'UI/UX'],
      githubUrl: 'https://github.com/Devnil434/Aahare_bangali.git',
      icon: Utensils,
    },
  ];

  const hackathonProjects = [
    {
      title: 'Smart Seed Spreading Vehicle',
      description: 'An innovative automated device that efficiently distributes seeds across agricultural fields, reducing manual labor, ensuring even coverage, and optimizing crop yields for better farming outcomes.',
      achievement: '2nd Place - Internal Hackathon for Smart India Hackathon 2024',
      technologies: ['IoT', 'Automation', 'Agriculture Tech', 'Hardware', 'Innovation'],
      icon: Trophy,
    },
    {
      title: 'GDG On Campus Solution Challenge',
      description: 'Participated in the prestigious Google Developer Groups Solution Challenge, developing innovative solutions to address real-world problems using Google technologies and cloud platforms.',
      achievement: 'Participant - GDG Solution Challenge 2024',
      technologies: ['Google Cloud', 'Firebase', 'Machine Learning', 'Mobile Development', 'Web Development'],
      icon: Award,
    },
  ];

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A showcase of my development projects ranging from web applications to management systems
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="group bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700/50 hover:border-cyan-400/50 transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <div className="w-full h-48 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-full flex items-center justify-center"
                  >
                    <project.icon className="text-white" size={24} />
                  </motion.div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-white hover:bg-slate-600 transition-colors"
                  >
                    <Github size={18} />
                  </motion.a>
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center text-white hover:bg-cyan-600 transition-colors"
                  >
                    <ExternalLink size={18} />
                  </motion.a>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <motion.span
                      key={tech}
                      whileHover={{ scale: 1.1 }}
                      className="px-3 py-1 bg-gradient-to-r from-cyan-400/10 to-purple-600/10 border border-cyan-400/30 rounded-full text-cyan-400 text-xs"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Hackathon Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h3 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            🏆 Hackathon Achievements
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {hackathonProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-gradient-to-br from-yellow-400/10 via-orange-500/10 to-red-500/10 border border-yellow-400/30 rounded-xl p-8 relative overflow-hidden group hover:border-yellow-400/50 transition-all duration-300"
              >
                <div className="absolute top-4 right-4">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                    className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
                  >
                    <project.icon className="text-white" size={20} />
                  </motion.div>
                </div>
                
                <h4 className="text-xl font-semibold text-yellow-400 mb-3">{project.title}</h4>
                <p className="text-sm font-medium text-orange-400 mb-4 flex items-center gap-2">
                  <Trophy size={16} />
                  {project.achievement}
                </p>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 border border-yellow-400/40 rounded-full text-yellow-400 text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.a
            href="https://github.com/Devnil434"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full font-semibold hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
          >
            <Github size={20} />
            View All Projects on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
