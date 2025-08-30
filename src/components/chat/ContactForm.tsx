
import React from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ContactFormProps {
  userEmail: string;
  userName: string;
  connectionStatus: 'connected' | 'connecting' | 'error';
  onEmailChange: (email: string) => void;
  onNameChange: (name: string) => void;
  onSubmit: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

const ContactForm = ({
  userEmail,
  userName,
  connectionStatus,
  onEmailChange,
  onNameChange,
  onSubmit,
  onKeyPress
}: ContactFormProps) => {
  return (
    <div className="p-6 space-y-4 flex-1">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-white mb-2 flex items-center justify-center gap-2">
          Let's get started! <Sparkles size={20} className="text-yellow-400" />
        </h3>
        <p className="text-gray-400 text-sm">I'd love to learn more about you before we chat about Nilanjan's amazing work!</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Your Email *
        </label>
        <Input
          type="email"
          value={userEmail}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="your@email.com"
          className="bg-slate-800 border-slate-600 text-white focus:border-cyan-400 focus:ring-cyan-400"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Your Name (optional)
        </label>
        <Input
          type="text"
          value={userName}
          onChange={(e) => onNameChange(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder="What should I call you?"
          className="bg-slate-800 border-slate-600 text-white focus:border-cyan-400 focus:ring-cyan-400"
        />
      </div>
      <Button
        onClick={onSubmit}
        disabled={!userEmail.trim() || connectionStatus === 'connecting'}
        className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-medium py-3 disabled:opacity-50"
      >
        {connectionStatus === 'connecting' ? (
          <div className="flex items-center gap-2">
            <Loader2 size={16} className="animate-spin" />
            Connecting...
          </div>
        ) : (
          'Start Chatting 💬'
        )}
      </Button>
    </div>
  );
};

export default ContactForm;
