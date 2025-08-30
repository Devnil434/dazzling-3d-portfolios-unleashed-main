
import { supabase } from '@/integrations/supabase/client';

export interface Message {
  id: string;
  content: string;
  sender_type: 'user' | 'bot';
  created_at: string;
  conversation_id: string;
  sender_email?: string;
  message_type?: string;
}

export interface Conversation {
  id: string;
  user_email: string;
  status: string;
  created_at: string;
  updated_at: string;
  metadata?: any;
}

export const conversationService = {
  async createConversation(userEmail: string, userName?: string): Promise<Conversation | null> {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .insert({
          user_email: userEmail,
          user_name: userName || null,
          status: 'active'
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating conversation:', error);
      return null;
    }
  },

  async getMessages(conversationId: string): Promise<Message[]> {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      
      // Ensure sender_type is properly typed
      return (data || []).map(message => ({
        ...message,
        sender_type: message.sender_type as 'user' | 'bot'
      }));
    } catch (error) {
      console.error('Error fetching messages:', error);
      return [];
    }
  },

  async saveMessage(
    conversationId: string,
    content: string,
    senderType: 'user' | 'bot',
    senderEmail?: string
  ): Promise<Message | null> {
    try {
      const { data, error } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversationId,
          content,
          sender_type: senderType,
          sender_email: senderEmail || null,
          message_type: 'text'
        })
        .select()
        .single();

      if (error) throw error;
      return {
        ...data,
        sender_type: data.sender_type as 'user' | 'bot'
      };
    } catch (error) {
      console.error('Error saving message:', error);
      return null;
    }
  },

  async updateConversationStatus(conversationId: string, status: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('conversations')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', conversationId);

      return !error;
    } catch (error) {
      console.error('Error updating conversation status:', error);
      return false;
    }
  }
};

// Export individual functions for compatibility
export const createConversation = conversationService.createConversation;
export const getMessages = conversationService.getMessages;
export const saveMessage = conversationService.saveMessage;
export const updateConversationStatus = conversationService.updateConversationStatus;

// Add missing function for backward compatibility
export const getConversationHistory = async (conversationId: string): Promise<Message[]> => {
  return getMessages(conversationId);
};
