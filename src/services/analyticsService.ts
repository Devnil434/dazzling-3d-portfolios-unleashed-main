
import { supabase } from '@/integrations/supabase/client';

export interface ConversationAnalytics {
  totalConversations: number;
  totalMessages: number;
  averageResponseTime: number;
  userSatisfactionRate: number;
}

export const loadAnalytics = async (): Promise<ConversationAnalytics> => {
  try {
    // Get conversation count
    const { count: conversationCount } = await supabase
      .from('conversations')
      .select('*', { count: 'exact', head: true });

    // Get message count
    const { count: messageCount } = await supabase
      .from('messages')
      .select('*', { count: 'exact', head: true });

    return {
      totalConversations: conversationCount || 0,
      totalMessages: messageCount || 0,
      averageResponseTime: 1.2, // Simulated
      userSatisfactionRate: 95 // Simulated
    };
  } catch (error) {
    console.error('Error loading analytics:', error);
    return {
      totalConversations: 0,
      totalMessages: 0,
      averageResponseTime: 0,
      userSatisfactionRate: 0
    };
  }
};
