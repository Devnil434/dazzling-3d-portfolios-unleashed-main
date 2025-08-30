
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

interface ChatToggleButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const ChatToggleButton = ({ isOpen, onClick }: ChatToggleButtonProps) => {
  return (
    <motion.button
      className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 text-white rounded-full shadow-xl z-[60] flex items-center justify-center hover:shadow-2xl transition-all duration-300"
      onClick={onClick}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      animate={{ 
        boxShadow: isOpen 
          ? "0 0 0 4px rgba(34, 211, 238, 0.3)" 
          : "0 10px 25px rgba(0, 0, 0, 0.3)"
      }}
    >
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="close"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <X size={28} />
          </motion.div>
        ) : (
          <motion.div
            key="chat"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            <div className="relative">
              <MessageCircle size={28} />
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default ChatToggleButton;
