
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Minimize2, Maximize2, BrainCircuit, Terminal, Sparkles } from 'lucide-react';
import { createGeneralChat } from '../services/geminiService';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

interface ChatbotProps {
  knowledgeBase: string[];
}

const Chatbot: React.FC<ChatbotProps> = ({ knowledgeBase }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: 'ETHEREON Command AI online. Ready for tactical inquiry.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatInstance = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleChat = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsMinimized(false);
      if (!chatInstance.current) {
        chatInstance.current = createGeneralChat(knowledgeBase);
      }
    } else {
      setIsOpen(false);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      if (!chatInstance.current) {
        chatInstance.current = createGeneralChat(knowledgeBase);
      }
      const result = await chatInstance.current.sendMessage({ message: userText });
      setMessages(prev => [...prev, { role: 'ai', text: result.text || 'Core sync lost. Please re-engage.' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: 'Uplink failure. Neural pathways obstructed.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      {!isOpen ? (
        <button
          onClick={toggleChat}
          className="w-16 h-16 rounded-full bg-nytron-blue flex items-center justify-center shadow-[0_0_20px_#00f2ff] hover:scale-110 transition-transform group"
        >
          <BrainCircuit className="text-nytron-bg group-hover:rotate-12 transition-transform" size={28} />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-nytron-accent rounded-full border-2 border-nytron-bg animate-pulse"></div>
        </button>
      ) : (
        <div className={`nytron-glass rounded-2xl border-nytron-blue/30 flex flex-col transition-all duration-300 overflow-hidden shadow-2xl ${
          isMinimized ? 'h-16 w-64' : 'h-[500px] w-[380px]'
        }`}>
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-nytron-blue/5">
            <div className="flex items-center gap-3">
              <Sparkles className="text-nytron-blue animate-pulse" size={16} />
              <h3 className="text-[10px] font-black font-orbitron text-white tracking-widest uppercase">Command_AI</h3>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-slate-500 hover:text-white transition-colors"
              >
                {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
              </button>
              <button 
                onClick={toggleChat}
                className="text-slate-500 hover:text-rose-500 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages Area */}
              <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-nytron-blue/20"
              >
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-3 rounded-xl text-[11px] leading-relaxed font-medium ${
                      m.role === 'user' 
                      ? 'bg-nytron-blue/20 border border-nytron-blue/30 text-nytron-blue rounded-tr-none' 
                      : 'bg-black/40 border border-white/5 text-slate-300 rounded-tl-none'
                    }`}>
                      <span className="text-[8px] font-black block mb-1 opacity-50 uppercase tracking-widest font-orbitron">
                        {m.role === 'user' ? 'OPERATOR' : 'ETHEREON_CORE'}
                      </span>
                      {m.text}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-black/40 border border-white/5 p-3 rounded-xl rounded-tl-none">
                      <div className="flex gap-1">
                        <div className="w-1 h-1 bg-nytron-blue rounded-full animate-bounce"></div>
                        <div className="w-1 h-1 bg-nytron-blue rounded-full animate-bounce [animation-delay:0.2s]"></div>
                        <div className="w-1 h-1 bg-nytron-blue rounded-full animate-bounce [animation-delay:0.4s]"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <form onSubmit={handleSend} className="p-4 border-t border-white/10 bg-black/40">
                <div className="relative">
                  <Terminal className="absolute left-3 top-1/2 -translate-y-1/2 text-nytron-blue/40" size={14} />
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter command..."
                    className="w-full bg-black/60 border border-white/10 rounded-lg pl-9 pr-10 py-2.5 text-[11px] text-white focus:outline-none focus:border-nytron-blue focus:ring-1 focus:ring-nytron-blue/20 font-mono"
                  />
                  <button 
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-nytron-blue hover:text-white disabled:opacity-30 transition-colors"
                  >
                    <Send size={14} />
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Chatbot;
