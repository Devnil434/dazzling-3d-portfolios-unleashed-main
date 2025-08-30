
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings, Save, Bot, BarChart3, MessageCircle, Clock, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAIChat } from '@/hooks/useAIChat';

interface BotConfig {
  id: string;
  name: string;
  prompt: string;
  is_active: boolean;
  auto_reply_enabled: boolean;
  response_delay_seconds: number;
}

const BotConfigAdmin = () => {
  const [config, setConfig] = useState<BotConfig | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const { analytics } = useAIChat();

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('bot_configs')
        .select('*')
        .eq('is_active', true)
        .single();

      if (error) throw error;
      setConfig(data);
    } catch (error) {
      console.error('Error loading bot config:', error);
      toast({
        title: 'Loading Error',
        description: 'Failed to load bot configuration.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveConfig = async () => {
    if (!config) return;

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('bot_configs')
        .update({
          name: config.name,
          prompt: config.prompt,
          auto_reply_enabled: config.auto_reply_enabled,
          response_delay_seconds: config.response_delay_seconds
        })
        .eq('id', config.id);

      if (error) throw error;

      toast({
        title: 'Configuration Saved ✅',
        description: 'Bot configuration has been updated successfully.',
      });
    } catch (error) {
      console.error('Error saving bot config:', error);
      toast({
        title: 'Save Failed',
        description: 'Failed to save bot configuration. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 bg-slate-800/50 rounded-2xl border border-slate-700/50">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
        </div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="p-8 bg-slate-800/50 rounded-2xl border border-slate-700/50">
        <p className="text-gray-400 text-center">No bot configuration found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Analytics Dashboard */}
      {analytics && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
        >
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center gap-3">
              <MessageCircle className="text-cyan-400" size={20} />
              <div>
                <p className="text-2xl font-bold text-white">{analytics.totalConversations}</p>
                <p className="text-gray-400 text-sm">Conversations</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center gap-3">
              <BarChart3 className="text-purple-400" size={20} />
              <div>
                <p className="text-2xl font-bold text-white">{analytics.totalMessages}</p>
                <p className="text-gray-400 text-sm">Total Messages</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center gap-3">
              <Clock className="text-green-400" size={20} />
              <div>
                <p className="text-2xl font-bold text-white">{analytics.averageResponseTime}s</p>
                <p className="text-gray-400 text-sm">Avg Response</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center gap-3">
              <TrendingUp className="text-yellow-400" size={20} />
              <div>
                <p className="text-2xl font-bold text-white">{analytics.userSatisfactionRate}%</p>
                <p className="text-gray-400 text-sm">Satisfaction</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Configuration Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 space-y-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Bot className="text-white" size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">AI Bot Configuration</h3>
            <p className="text-gray-400">Manage your intelligent assistant settings</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Bot Name
              </label>
              <Input
                value={config.name}
                onChange={(e) => setConfig({ ...config, name: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white focus:border-cyan-400"
                placeholder="Enter bot name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Auto Reply
                </label>
                <select
                  value={config.auto_reply_enabled.toString()}
                  onChange={(e) => setConfig({ ...config, auto_reply_enabled: e.target.value === 'true' })}
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-cyan-400"
                >
                  <option value="true">Enabled</option>
                  <option value="false">Disabled</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Response Delay (seconds)
                </label>
                <Input
                  type="number"
                  value={config.response_delay_seconds}
                  onChange={(e) => setConfig({ ...config, response_delay_seconds: parseInt(e.target.value) || 0 })}
                  className="bg-slate-700 border-slate-600 text-white focus:border-cyan-400"
                  min="0"
                  max="10"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              System Prompt
            </label>
            <Textarea
              value={config.prompt}
              onChange={(e) => setConfig({ ...config, prompt: e.target.value })}
              rows={8}
              className="bg-slate-700 border-slate-600 text-white focus:border-cyan-400 resize-none"
              placeholder="Enter the system prompt for the AI bot..."
            />
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button
            onClick={saveConfig}
            disabled={isSaving}
            className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-medium py-3"
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Saving Configuration...
              </>
            ) : (
              <>
                <Save size={18} className="mr-2" />
                Save Configuration
              </>
            )}
          </Button>
          
          <Button
            onClick={loadConfig}
            variant="outline"
            className="px-6 border-slate-600 text-gray-300 hover:bg-slate-700"
          >
            <Settings size={18} className="mr-2" />
            Reset
          </Button>
        </div>

        <div className="mt-6 p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
          <h4 className="text-white font-medium mb-2">💡 Pro Tips:</h4>
          <ul className="text-gray-400 text-sm space-y-1">
            <li>• Keep the system prompt specific and detailed for better responses</li>
            <li>• Use response delays to make conversations feel more natural</li>
            <li>• Monitor analytics to optimize bot performance</li>
            <li>• Test different prompts to find what works best for your audience</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default BotConfigAdmin;
