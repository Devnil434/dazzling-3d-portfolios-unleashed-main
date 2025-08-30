
import React from 'react';
import { Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ChatInputProps {
  newMessage: string;
  isLoading: boolean;
  connectionStatus: 'connected' | 'connecting' | 'error';
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

const ChatInput = ({
  newMessage,
  isLoading,
  connectionStatus,
  onMessageChange,
  onSendMessage,
  onKeyPress
}: ChatInputProps) => {
  return (
    <div className="p-4 border-t border-slate-700/50 bg-slate-900/50">
      <div className="flex gap-3 items-end">
        <div className="flex-1">
          <Input
            value={newMessage}
            onChange={(e) => onMessageChange(e.target.value)}
            onKeyPress={onKeyPress}
            placeholder={connectionStatus === 'error' ? 'Connection issue, try again...' : 'Ask me anything about Nilanjan...'}
            className="bg-slate-800 border-slate-600 text-white focus:border-cyan-400 focus:ring-cyan-400 resize-none"
            disabled={isLoading || connectionStatus === 'connecting'}
          />
        </div>
        <Button
          onClick={onSendMessage}
          disabled={!newMessage.trim() || isLoading || connectionStatus === 'connecting'}
          size="icon"
          className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 shadow-lg h-10 w-10 disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Send size={18} />
          )}
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
