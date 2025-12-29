
import React, { useState } from 'react';
import { MOCK_THREATS } from '../constants';
import { ShieldAlert, AlertTriangle, Zap, Clock, MapPin, BrainCircuit } from 'lucide-react';
import { analyzeThreat } from '../services/geminiService';

const ThreatDetection: React.FC = () => {
  const [selectedThreat, setSelectedThreat] = useState<any>(MOCK_THREATS[0]);
  const [aiAnalysis, setAiAnalysis] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setAiAnalysis("");
    const result = await analyzeThreat(selectedThreat.type, selectedThreat.severity, selectedThreat.endpoint);
    setAiAnalysis(result || "Analysis failed.");
    setIsAnalyzing(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Threat Detection</h2>
        <div className="bg-rose-500/10 text-rose-500 px-4 py-1 rounded-full text-sm font-bold border border-rose-500/20 flex items-center gap-2">
          <ShieldAlert size={16} />
          {MOCK_THREATS.length} HIGH SEVERITY ALERTS
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Active Alerts</h3>
          {MOCK_THREATS.map((threat) => (
            <div 
              key={threat.id}
              onClick={() => {
                setSelectedThreat(threat);
                setAiAnalysis("");
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

        <div className="bg-slate-950 rounded-2xl border border-slate-800 p-8 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[120px] pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-8 border-b border-slate-800 pb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <BrainCircuit size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">AI Threat Investigator</h3>
                <p className="text-xs text-blue-400 font-medium">Powered by Gemini Defense Core</p>
              </div>
            </div>

            <div className="flex-1 space-y-6">
              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800/50">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Analysis Target</h4>
                  <span className="text-xs font-mono text-blue-400">{selectedThreat.id}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Incident</p>
                    <p className="text-white font-bold">{selectedThreat.type}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Endpoint</p>
                    <p className="text-white font-bold">{selectedThreat.endpoint}</p>
                  </div>
                </div>
              </div>

              {aiAnalysis ? (
                <div className="bg-blue-600/10 p-6 rounded-xl border border-blue-500/30 animate-in fade-in slide-in-from-top-2">
                  <p className="text-sm text-blue-100 font-medium leading-relaxed mono">
                    {aiAnalysis}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-slate-800 rounded-2xl opacity-50">
                  <BrainCircuit size={48} className="text-slate-700 mb-4" />
                  <p className="text-xs text-slate-500 font-medium">Request deep investigation for this incident</p>
                </div>
              )}
            </div>

            <button 
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full mt-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50"
            >
              {isAnalyzing ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <BrainCircuit size={20} />
                  Initiate Deep AI Scan
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreatDetection;
