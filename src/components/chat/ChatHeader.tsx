
import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User, Loader2, X, Minimize2, Maximize2, RefreshCw, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatHeaderProps {
  connectionStatus: 'connected' | 'connecting' | 'error';
  isMinimized: boolean;
  isInitialized: boolean;
  onMinimize: () => void;
  onReset: () => void;
}

const ChatHeader = ({ 
  connectionStatus, 
  isMinimized, 
  isInitialized, 
  onMinimize, 
  onReset 
}: ChatHeaderProps) => {
  return (
    <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 p-4 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ 
              rotate: connectionStatus === 'connecting' ? 360 : 0,
              scale: connectionStatus === 'error' ? [1, 1.1, 1] : 1
            }}
            transition={{ 
              duration: connectionStatus === 'connecting' ? 2 : 0.3, 
              repeat: connectionStatus === 'connecting' ? Infinity : 0,
              ease: "linear" 
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              connectionStatus === 'connected' ? 'bg-green-500/30' :
              connectionStatus === 'connecting' ? 'bg-yellow-500/30' :
              'bg-red-500/30'
            }`}
          >
            {connectionStatus === 'error' ? (
              <X size={16} />
            ) : connectionStatus === 'connecting' ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Bot size={16} />
            )}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg">AI Assistant</span>
              <Sparkles size={16} className="text-yellow-300" />
            </div>
            {!isMinimized && (
              <p className="text-xs opacity-90">
                {connectionStatus === 'connected' ? 'Nilanjan\'s Portfolio Helper' :
                 connectionStatus === 'connecting' ? 'Connecting...' :
                 'Connection Issue'}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMinimize}
            className="text-white hover:bg-white/20 p-1 h-auto"
          >
            {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
          </Button>
          {isInitialized && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="text-white hover:bg-white/20 p-1 h-auto"
            >
              <RefreshCw size={16} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
