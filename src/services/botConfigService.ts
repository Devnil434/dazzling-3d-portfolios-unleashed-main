
import { supabase } from '@/integrations/supabase/client';

export interface BotConfig {
  id: string;
  name: string;
  prompt: string;
  is_active: boolean;
  auto_reply_enabled: boolean;
  response_delay_seconds: number;
}

export const loadBotConfig = async (): Promise<BotConfig | null> => {
  try {
    const { data, error } = await supabase
      .from('bot_configs')
      .select('*')
      .eq('is_active', true)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error loading bot config:', error);
    return null;
  }
};

export const updateBotConfig = async (configId: string, config: Partial<BotConfig>): Promise<void> => {
  try {
    const { error } = await supabase
      .from('bot_configs')
      .update(config)
      .eq('id', configId);

    if (error) throw error;
  } catch (error) {
    console.error('Error updating bot config:', error);
    throw error;
  }
};
