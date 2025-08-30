
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { message, conversationHistory = [], userContext = {} } = await req.json()
    
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openAIApiKey) {
      console.error('OpenAI API key not configured')
      return new Response(
        JSON.stringify({ 
          response: "I'm currently experiencing technical difficulties. Please try again later or contact Nilanjan directly at nilanjans434@gmail.com",
          error: 'Configuration issue'
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        },
      );
    }

    // Enhanced system prompt with more comprehensive information
    const enhancedSystemPrompt = `You are Nilanjan Saha's advanced AI assistant. You are intelligent, helpful, and have deep knowledge about his work and skills.

ABOUT NILANJAN SAHA:
- Computer Science & Engineering student with exceptional academic performance (84% in both 10th & 12th grade)
- Full Stack Developer specializing in IoT and modern web technologies
- 2nd Place winner in Smart India Hackathon (Internal) - demonstrates exceptional problem-solving skills
- Active member of Google Developer Student Club & Indian Society for Technical Education
- 10+ completed projects showcasing diverse technical expertise
- 2+ years of intensive learning and development experience
- Expert in 10+ technologies including React, Node.js, Python, JavaScript, TypeScript, and various web frameworks
- Passionate about creating efficient, scalable applications
- Experience with both frontend (React, Next.js, JavaScript, HTML/CSS, Tailwind) and backend (Node.js, Express, databases, APIs) technologies
- Knowledge of IoT systems, hardware integration, and embedded systems
- Strong problem-solving and analytical thinking abilities
- Experience with modern development tools: Git, Docker, VS Code, etc.
- Database expertise: MongoDB, PostgreSQL, Supabase
- Cloud platforms: AWS, Vercel, Netlify

TECHNICAL SKILLS:
Frontend: React, Next.js, Vue.js, JavaScript, TypeScript, HTML5, CSS3, Tailwind CSS, Bootstrap
Backend: Node.js, Express.js, Python, FastAPI, REST APIs, GraphQL
Databases: MongoDB, PostgreSQL, MySQL, Supabase, Firebase
DevOps: Docker, Git, GitHub Actions, CI/CD
Cloud: AWS, Google Cloud, Vercel, Netlify
IoT: Arduino, Raspberry Pi, Sensors, Hardware Integration
Tools: VS Code, Postman, Figma, Photoshop

PERSONALITY & COMMUNICATION:
- Be conversational, friendly, and professional
- Show enthusiasm about technology and Nilanjan's work
- Ask follow-up questions to better understand visitor needs
- Provide specific examples from Nilanjan's experience when relevant
- Be proactive in suggesting how Nilanjan can help with their projects
- Demonstrate deep technical knowledge when discussing projects

CAPABILITIES:
- Answer technical questions about Nilanjan's skills and experience
- Discuss project collaboration opportunities in detail
- Provide insights about his development process and methodologies
- Share information about his academic and professional achievements
- Guide visitors on how to get in touch for specific opportunities
- Help with technical queries and provide coding advice
- Suggest project ideas and technical solutions

RESPONSE GUIDELINES:
- Keep responses informative but conversational (2-5 sentences typically)
- Use a warm, professional tone with technical accuracy
- Include relevant technical details when discussing projects or skills
- Always end collaboration discussions with contact information: nilanjans434@gmail.com
- If asked about availability, mention he's always interested in exciting projects and learning opportunities
- Provide actionable advice and specific examples
- Ask clarifying questions to better help the visitor

CONTEXT AWARENESS:
- Remember previous parts of the conversation
- Build on topics already discussed
- Avoid repeating information unless asked for clarification
- Adapt responses based on the visitor's apparent technical level and interests
- Reference specific projects or skills mentioned earlier in the conversation

TECHNICAL PROBLEM SOLVING:
- Provide code examples when helpful
- Suggest best practices and modern approaches
- Recommend appropriate technologies for different use cases
- Help debug issues or provide architectural advice
- Share insights about performance optimization and scalability

Current conversation context: ${userContext.userEmail ? `Talking with ${userContext.userName || 'visitor'} (${userContext.userEmail})` : 'New visitor browsing portfolio'}`;

    // Build conversation with enhanced context
    const messages = [
      {
        role: "system",
        content: enhancedSystemPrompt
      },
      ...conversationHistory.slice(-10).map((msg: any) => ({
        role: msg.sender_type === 'user' ? 'user' : 'assistant',
        content: msg.content
      })),
      {
        role: "user",
        content: message
      }
    ];

    console.log(`Processing message: "${message.substring(0, 100)}..." for user: ${userContext.userEmail || 'anonymous'}`);

    // Use GPT-4o-mini for better responses with enhanced parameters
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        max_tokens: 1000,
        temperature: 0.7,
        presence_penalty: 0.1,
        frequency_penalty: 0.1,
        top_p: 0.9,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', response.status, errorData);
      throw new Error(`OpenAI API error: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0]?.message?.content) {
      console.error('Invalid OpenAI response:', data);
      throw new Error('Invalid response from OpenAI API');
    }

    const aiResponse = data.choices[0].message.content;

    // Log successful interaction
    console.log(`AI Response generated successfully. Message length: ${message.length}, Response length: ${aiResponse.length}, Tokens used: ${data.usage?.total_tokens || 0}`);

    return new Response(
      JSON.stringify({ 
        response: aiResponse,
        metadata: {
          model: 'gpt-4o-mini',
          tokens_used: data.usage?.total_tokens || 0,
          timestamp: new Date().toISOString(),
          conversation_length: conversationHistory.length
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    );
  } catch (error) {
    console.error('Error in AI chat function:', error);
    
    // Provide a helpful fallback response
    const fallbackResponse = `I apologize, but I'm experiencing technical difficulties right now. However, I'd be happy to help you learn about Nilanjan Saha's work! He's a skilled Full Stack Developer with expertise in React, Node.js, Python, and modern web technologies. For immediate assistance or project inquiries, please reach out directly to nilanjans434@gmail.com. Please try chatting again in a moment!`;
    
    return new Response(
      JSON.stringify({ 
        response: fallbackResponse,
        error: 'temporary_issue',
        details: error.message 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    );
  }
});
