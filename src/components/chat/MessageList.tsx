
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, User, Loader2 } from 'lucide-react';
import { Message } from '@/services/conversationService';

interface MessageListProps {
  messages: Message[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const MessageList = ({ messages, messagesEndRef }: MessageListProps) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-800/30">
      <AnimatePresence>
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
            className={`flex gap-3 ${
              message.sender_type === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.sender_type === 'bot' && (
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                {message.id === 'typing' ? (
                  <Loader2 size={14} className="animate-spin text-white" />
                ) : (
                  <Bot size={14} className="text-white" />
                )}
              </div>
            )}
            <div
              className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                message.sender_type === 'user'
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg'
                  : message.id === 'typing'
                  ? 'bg-slate-700 text-gray-300'
                  : 'bg-slate-700 text-gray-100 shadow-md'
              }`}
            >
              {message.id === 'typing' ? (
                <div className="flex items-center gap-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-xs text-gray-500 ml-2">Thinking...</span>
                </div>
              ) : (
                <div className="whitespace-pre-wrap">{message.content}</div>
              )}
            </div>
            {message.sender_type === 'user' && (
              <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                <User size={14} className="text-white" />
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
