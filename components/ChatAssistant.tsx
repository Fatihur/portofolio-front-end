import React, { useState, useRef, useEffect } from 'react';
import { ChatIcon, CloseIcon, SendIcon, ArrowUpRight } from './Icons';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello. I am the AI Assistant for this portfolio. Ask me anything about the projects or skills." }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: inputText };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Format history for API
    const apiHistory = messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    try {
      const responseText = await sendMessageToGemini(inputText, apiHistory);
      const botMessage: ChatMessage = { role: 'model', text: responseText };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: ChatMessage = { role: 'model', text: "Error connecting to AI service." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans antialiased">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-neutral-900 text-white p-4 shadow-lg hover:bg-neutral-800 transition-all duration-300 flex items-center gap-2 group"
          aria-label="Open Chat"
        >
          <span className="font-medium tracking-tight">Ask AI</span>
          <ChatIcon className="w-5 h-5" />
        </button>
      )}

      {isOpen && (
        <div className="w-[350px] sm:w-[400px] h-[500px] bg-white border border-neutral-200 shadow-2xl flex flex-col transition-all duration-300">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-neutral-100 bg-neutral-50">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <h3 className="font-semibold text-sm uppercase tracking-wider text-neutral-900">AI Assistant</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-neutral-500 hover:text-neutral-900">
              <CloseIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-neutral-900 text-white'
                      : 'bg-neutral-100 text-neutral-800 border border-neutral-200'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-neutral-100 p-3 border border-neutral-200">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-neutral-100 bg-white">
            <div className="flex items-center gap-2 border border-neutral-300 p-2 focus-within:border-neutral-900 transition-colors">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about experience..."
                className="flex-1 outline-none text-sm bg-transparent text-neutral-900 placeholder-neutral-400"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !inputText.trim()}
                className="p-1 text-neutral-900 hover:opacity-70 disabled:opacity-30"
              >
                <SendIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="text-[10px] text-neutral-400 mt-2 text-center uppercase tracking-widest">
              Powered by Gemini 2.5
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatAssistant;