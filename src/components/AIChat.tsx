
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { 
  createConversation, 
  getConversationHistory, 
  saveMessage,
  type Message,
  type Conversation 
} from '@/services/conversationService';
import { generateAIResponse } from '@/services/aiChatService';
import ChatToggleButton from './chat/ChatToggleButton';
import ChatHeader from './chat/ChatHeader';
import ContactForm from './chat/ContactForm';
import MessageList from './chat/MessageList';
import ChatInput from './chat/ChatInput';

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'connecting' | 'error'>('connected');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const addTypingIndicator = () => {
    const typingMessage: Message = {
      id: 'typing',
      content: '',
      sender_type: 'bot',
      created_at: new Date().toISOString(),
      conversation_id: conversation?.id || '',
    };
    setMessages(prev => [...prev, typingMessage]);
    setIsTyping(true);
  };

  const removeTypingIndicator = () => {
    setMessages(prev => prev.filter(msg => msg.id !== 'typing'));
    setIsTyping(false);
  };

  const initializeConversation = async () => {
    if (!userEmail) return;

    try {
      setConnectionStatus('connecting');
      const newConversation = await createConversation(userEmail, userName);

      setConversation(newConversation);
      setIsInitialized(true);
      setConnectionStatus('connected');

      const welcomeMessage: Message = {
        id: crypto.randomUUID(),
        content: `Hello ${userName || 'there'}! 👋 I'm Nilanjan's AI assistant, and I'm excited to help you explore his work and expertise! 

I can help you with:
• 💻 **Technical Skills** - React, Node.js, Python, IoT, and 10+ technologies
• 🚀 **Projects** - Full-stack applications, IoT systems, and innovative solutions  
• 🎓 **Background** - Academic achievements and hackathon victories
• 🤝 **Collaboration** - Project opportunities and technical consulting
• 💡 **Tech Advice** - Architecture, best practices, and problem-solving

What would you like to know about Nilanjan? Feel free to ask anything - from technical questions to project collaboration ideas!`,
        sender_type: 'bot',
        created_at: new Date().toISOString(),
        conversation_id: newConversation.id
      };

      setMessages([welcomeMessage]);
      await saveMessage(newConversation.id, welcomeMessage.content, 'bot');

    } catch (error) {
      console.error('Error initializing conversation:', error);
      setConnectionStatus('error');
      toast({
        title: 'Connection Error',
        description: 'Unable to start conversation. Please check your connection and try again.',
        variant: 'destructive'
      });
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !conversation || isLoading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      content: newMessage,
      sender_type: 'user',
      created_at: new Date().toISOString(),
      conversation_id: conversation.id
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = newMessage;
    setNewMessage('');
    setIsLoading(true);
    setConnectionStatus('connecting');
    addTypingIndicator();

    try {
      await saveMessage(conversation.id, userMessage.content, 'user', userEmail);

      console.log('Sending message to AI:', currentMessage);

      const response = await generateAIResponse(
        currentMessage,
        messages.filter(msg => msg.id !== 'typing').slice(-8),
        {
          userEmail,
          userName,
          conversationId: conversation.id,
          messageCount: messages.length
        }
      );

      removeTypingIndicator();
      setConnectionStatus('connected');

      console.log('AI response received:', response);

      if (!response?.response) {
        throw new Error('No response content received from AI');
      }

      const aiResponse: Message = {
        id: crypto.randomUUID(),
        content: response.response,
        sender_type: 'bot',
        created_at: new Date().toISOString(),
        conversation_id: conversation.id
      };

      setMessages(prev => [...prev.filter(msg => msg.id !== 'typing'), aiResponse]);
      await saveMessage(conversation.id, aiResponse.content, 'bot');

    } catch (error) {
      removeTypingIndicator();
      setConnectionStatus('error');
      console.error('Error sending message:', error);
      
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        content: "I apologize, but I'm having trouble responding right now. This might be a temporary connection issue. Please try again in a moment, or feel free to contact Nilanjan directly at nilanjans434@gmail.com for immediate assistance! 🔧",
        sender_type: 'bot',
        created_at: new Date().toISOString(),
        conversation_id: conversation.id
      };
      setMessages(prev => [...prev.filter(msg => msg.id !== 'typing'), errorMessage]);

      toast({
        title: 'Message Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetConversation = () => {
    setMessages([]);
    setConversation(null);
    setIsInitialized(false);
    setUserEmail('');
    setUserName('');
    setConnectionStatus('connected');
    toast({
      title: 'Conversation Reset',
      description: 'You can start a new conversation now.',
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (isInitialized) {
        sendMessage();
      } else {
        initializeConversation();
      }
    }
  };

  return (
    <>
      <ChatToggleButton 
        isOpen={isOpen} 
        onClick={() => setIsOpen(!isOpen)} 
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`fixed bottom-24 right-6 bg-slate-900/98 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl z-[55] flex flex-col overflow-hidden transition-all duration-300 ${
              isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
            }`}
            style={{ maxHeight: 'calc(100vh - 120px)' }}
          >
            <ChatHeader
              connectionStatus={connectionStatus}
              isMinimized={isMinimized}
              isInitialized={isInitialized}
              onMinimize={() => setIsMinimized(!isMinimized)}
              onReset={resetConversation}
            />

            {!isMinimized && (
              <>
                {!isInitialized ? (
                  <ContactForm
                    userEmail={userEmail}
                    userName={userName}
                    connectionStatus={connectionStatus}
                    onEmailChange={setUserEmail}
                    onNameChange={setUserName}
                    onSubmit={initializeConversation}
                    onKeyPress={handleKeyPress}
                  />
                ) : (
                  <>
                    <MessageList 
                      messages={messages} 
                      messagesEndRef={messagesEndRef} 
                    />
                    <ChatInput
                      newMessage={newMessage}
                      isLoading={isLoading}
                      connectionStatus={connectionStatus}
                      onMessageChange={setNewMessage}
                      onSendMessage={sendMessage}
                      onKeyPress={handleKeyPress}
                    />
                  </>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChat;
