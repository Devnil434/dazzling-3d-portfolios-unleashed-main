
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  generateAIResponse, 
  type AIResponse 
} from '@/services/aiChatService';
import { 
  createConversation, 
  getConversationHistory, 
  saveMessage,
  type Message,
  type Conversation 
} from '@/services/conversationService';
import { 
  loadBotConfig, 
  updateBotConfig as updateBotConfigService,
  type BotConfig 
} from '@/services/botConfigService';
import { 
  loadAnalytics, 
  type ConversationAnalytics 
} from '@/services/analyticsService';

export const useAIChat = () => {
  const [botConfig, setBotConfig] = useState<BotConfig | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analytics, setAnalytics] = useState<ConversationAnalytics | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = async () => {
    await Promise.all([
      loadBotConfigData(),
      loadAnalyticsData()
    ]);
  };

  const loadBotConfigData = async () => {
    const config = await loadBotConfig();
    setBotConfig(config);
  };

  const loadAnalyticsData = async () => {
    const analyticsData = await loadAnalytics();
    setAnalytics(analyticsData);
  };

  const generateResponse = async (
    message: string, 
    conversationHistory: Message[] = [],
    userContext = {}
  ): Promise<AIResponse | null> => {
    setIsLoading(true);
    try {
      const response = await generateAIResponse(message, conversationHistory, userContext);
      return response;
    } catch (error) {
      console.error('Error generating AI response:', error);
      toast({
        title: 'AI Response Error',
        description: 'The AI assistant is temporarily unavailable. Please try again.',
        variant: 'destructive'
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updateBotConfig = async (config: Partial<BotConfig>) => {
    if (!botConfig) return;

    try {
      await updateBotConfigService(botConfig.id, config);
      setBotConfig(prev => prev ? { ...prev, ...config } : null);
      
      toast({
        title: 'Configuration Updated',
        description: 'Bot settings have been saved successfully.',
      });
    } catch (error) {
      console.error('Error updating bot config:', error);
      toast({
        title: 'Update Failed',
        description: 'Failed to save bot configuration.',
        variant: 'destructive'
      });
    }
  };

  return {
    botConfig,
    analytics,
    isLoading,
    generateAIResponse: generateResponse,
    saveMessage,
    createConversation,
    getConversationHistory,
    updateBotConfig,
    loadBotConfig: loadBotConfigData,
    loadAnalytics: loadAnalyticsData
  };
};
