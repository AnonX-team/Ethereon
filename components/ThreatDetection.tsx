
import React, { useState, useRef, useEffect } from 'react';
import { MOCK_THREATS } from '../constants';
import { ShieldAlert, AlertTriangle, Zap, Clock, MapPin, BrainCircuit, Send, Terminal } from 'lucide-react';
import { createInvestigatorChat } from '../services/geminiService';

// Fix: Defined props to match App.tsx usage
interface ThreatDetectionProps {
  knowledgeBase: string[];
}

const ThreatDetection: React.FC<ThreatDetectionProps> = ({ knowledgeBase }) => {
  const [selectedThreat, setSelectedThreat] = useState<any>(MOCK_THREATS[0]);
  const [messages, setMessages] = useState<{ role: 'ai' | 'user', text: string }[]>([]);
  const [input, setInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const chatRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom on new messages
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const startInvestigation = async () => {
    setIsAnalyzing(true);
    const context = `Threat ID ${selectedThreat.id}: ${selectedThreat.type} on ${selectedThreat.endpoint}`;
    // Fix: Pass knowledgeBase to provide the AI with custom organizational context
    chatRef.current = createInvestigatorChat(context, knowledgeBase);
    
    try {
      const response = await chatRef.current.sendMessage({ message: "Initial assessment and first steps?" });
      setMessages([{ role: 'ai', text: response.text }]);
    } catch (e) {
      setMessages([{ role: 'ai', text: "Error initializing neural link. Try again." }]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input || !chatRef.current || isAnalyzing) return;

    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsAnalyzing(true);

    try {
      const response = await chatRef.current.sendMessage({ message: userMsg });
      setMessages(prev => [...prev, { role: 'ai', text: response.text }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'ai', text: "Transmission error. Connection unstable." }]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">
      <div className="flex items-center justify-between shrink-0">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Threat Analytics</h2>
        <div className="bg-rose-500/10 text-rose-500 px-4 py-1 rounded-full text-sm font-bold border border-rose-500/20 flex items-center gap-2">
          <ShieldAlert size={16} />
          {MOCK_THREATS.length} CRITICAL INCIDENTS
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 min-h-0">
        <div className="space-y-4 overflow-y-auto pr-2">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Active Alerts</h3>
          {MOCK_THREATS.map((threat) => (
            <div 
              key={threat.id}
              onClick={() => {
                setSelectedThreat(threat);
                setMessages([]);
                chatRef.current = null;
              }}
              className={`p-6 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group ${
                selectedThreat.id === threat.id 
                ? 'bg-white dark:bg-slate-900 border-rose-500 shadow-xl shadow-rose-500/10' 
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-rose-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${threat.severity === 'CRITICAL' ? 'bg-rose-500 text-white animate-pulse' : 'bg-rose-100 dark:bg-rose-500/20 text-rose-600'}`}>
                    <AlertTriangle size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">{threat.type}</h4>
                    <div className="flex items-center gap-3 mt-1 text-slate-500">
                      <div className="flex items-center gap-1">
                        <MapPin size={12} />
                        <span className="text-[10px] font-bold uppercase">{threat.endpoint}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        <span className="text-[10px] font-bold uppercase">{threat.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${
                    threat.severity === 'CRITICAL' ? 'bg-rose-600 text-white' : 'bg-rose-100 dark:bg-rose-500/20 text-rose-500'
                  }`}>
                    {threat.severity}
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">{threat.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-950 rounded-2xl border border-slate-800 flex flex-col overflow-hidden shadow-2xl relative">
          <div className="p-6 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                <BrainCircuit size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">AI Investigator</h3>
                <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Active Link: {selectedThreat.id}</p>
              </div>
            </div>
            {!chatRef.current && (
              <button 
                onClick={startInvestigation}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-all"
              >
                INITIALIZE CORE
              </button>
            )}
          </div>

          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-4 font-mono scroll-smooth"
          >
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center opacity-30 text-center px-12">
                <Terminal size={48} className="text-slate-500 mb-4" />
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest leading-loose">
                  Waiting for operator to initialize Deep Forensic Analysis for incident {selectedThreat.id}
                </p>
              </div>
            ) : (
              messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-xs leading-relaxed ${
                    m.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-slate-900 border border-slate-800 text-blue-100 rounded-bl-none'
                  }`}>
                    <span className="text-[9px] font-black block mb-1 opacity-50 uppercase tracking-widest">
                      {m.role === 'user' ? 'Operator' : 'AI_Core'}
                    </span>
                    {m.text}
                  </div>
                </div>
              ))
            )}
            {isAnalyzing && (
              <div className="flex justify-start">
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl rounded-bl-none">
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-800 bg-slate-950">
            <div className="relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={!chatRef.current || isAnalyzing}
                placeholder={chatRef.current ? "Query technical forensics..." : "Initialize investigator first..."}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-4 pr-12 py-3 text-white text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
              />
              <button 
                type="submit"
                disabled={!input || isAnalyzing}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-blue-500 hover:text-blue-400 disabled:opacity-30"
              >
                <Send size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ThreatDetection;
