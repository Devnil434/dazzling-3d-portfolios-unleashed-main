
import { supabase } from '@/integrations/supabase/client';

export interface AIResponseMetadata {
  model: string;
  tokens_used: number;
  timestamp: string;
  conversation_length: number;
}

export interface AIResponse {
  response: string;
  metadata: AIResponseMetadata;
}

export const generateAIResponse = async (
  message: string, 
  conversationHistory: any[] = [],
  userContext = {}
): Promise<AIResponse | null> => {
  try {
    // Add intelligent pre-processing
    const enhancedMessage = preprocessMessage(message);
    
    const response = await supabase.functions.invoke('ai-chat', {
      body: {
        message: enhancedMessage,
        conversationHistory,
        userContext
      }
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    return {
      response: response.data.response,
      metadata: response.data.metadata
    };
  } catch (error) {
    console.error('Error generating AI response:', error);
    throw error;
  }
};

const preprocessMessage = (message: string): string => {
  // Basic message preprocessing for better AI understanding
  let processed = message.trim();
  
  // Expand common abbreviations
  const abbreviations: Record<string, string> = {
    'ur': 'your',
    'u': 'you',
    'cant': "can't",
    'wont': "won't",
    'dont': "don't",
    'thx': 'thanks',
    'ty': 'thank you'
  };

  Object.entries(abbreviations).forEach(([abbr, full]) => {
    const regex = new RegExp(`\\b${abbr}\\b`, 'gi');
    processed = processed.replace(regex, full);
  });

  return processed;
};
