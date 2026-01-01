
import React, { useState } from 'react';
import { Database, Plus, Trash2, BrainCircuit, Save, ShieldCheck } from 'lucide-react';

interface KnowledgeBaseProps {
  data: string[];
  onUpdate: (newData: string[]) => void;
}

const KnowledgeBase: React.FC<KnowledgeBaseProps> = ({ data, onUpdate }) => {
  const [newItem, setNewItem] = useState("");

  const handleAdd = () => {
    if (!newItem.trim()) return;
    onUpdate([...data, newItem]);
    setNewItem("");
  };

  const handleDelete = (index: number) => {
    onUpdate(data.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
          Neural Training Center
          <span className="text-xs bg-blue-500/10 text-blue-500 px-2 py-1 rounded border border-blue-500/20 font-mono">ACTIVE_LEARNING</span>
        </h2>
        <p className="text-slate-500">Train Ethereon's Core AI on your custom security environment, policies, and known behaviors.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
              <div className="flex items-center gap-3">
                <Database className="text-blue-500" size={20} />
                <h3 className="font-bold text-slate-900 dark:text-white">Active Knowledge Blocks</h3>
              </div>
            </div>
            
            <div className="p-6 space-y-3 max-h-[400px] overflow-y-auto">
              {data.length === 0 ? (
                <div className="py-12 text-center text-slate-400 italic">
                  No custom knowledge blocks active. The AI is using default global intelligence.
                </div>
              ) : (
                data.map((item, i) => (
                  <div key={i} className="group flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-500/50 transition-all">
                    <div className="mt-1 w-2 h-2 rounded-full bg-blue-500"></div>
                    <p className="flex-1 text-sm text-slate-600 dark:text-slate-300 font-mono leading-relaxed">{item}</p>
                    <button 
                      onClick={() => handleDelete(i)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-500 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
              <div className="flex gap-4">
                <textarea
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  placeholder="Enter a new knowledge block (e.g., 'Server SRV-01 handles encrypted traffic on port 9000; ignore SSH alerts for admin_user')..."
                  className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-sm focus:ring-2 focus:ring-blue-500/50 focus:outline-none min-h-[100px] text-slate-900 dark:text-white"
                />
                <button 
                  onClick={handleAdd}
                  disabled={!newItem.trim()}
                  className="px-6 bg-blue-600 text-white rounded-xl font-bold flex flex-col items-center justify-center gap-2 hover:bg-blue-500 disabled:opacity-50 transition-all shadow-lg shadow-blue-500/20"
                >
                  <Plus size={20} />
                  <span className="text-[10px] uppercase tracking-widest">Inject</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 rounded-2xl p-6 border border-blue-500/30 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 blur-2xl rounded-full"></div>
            <BrainCircuit className="text-blue-500 mb-4" size={32} />
            <h4 className="text-lg font-bold mb-2">Neural Link Status</h4>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              When knowledge blocks are active, Ethereon Core uses few-shot contextual awareness to interpret alerts through your unique lens.
            </p>
            <div className="space-y-4">
              <StatusRow label="Context Depth" value={`${data.length} Blocks`} />
              <StatusRow label="Sync Status" value="Optimized" />
              <StatusRow label="AI Personality" value="Tactical Forensic" />
            </div>
            <button className="w-full mt-8 py-3 bg-blue-600 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-blue-500 transition-all">
              Re-Sync Core AI
            </button>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 flex gap-4">
            <ShieldCheck className="text-emerald-500 shrink-0" size={24} />
            <div>
              <h5 className="text-sm font-bold text-emerald-500 mb-1 uppercase tracking-tight">Security Validated</h5>
              <p className="text-xs text-emerald-500/70 leading-relaxed">
                All custom knowledge blocks are encrypted at rest and never shared between organizations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusRow = ({ label, value }: any) => (
  <div className="flex items-center justify-between py-2 border-b border-white/5">
    <span className="text-[10px] uppercase font-bold text-slate-500">{label}</span>
    <span className="text-[10px] font-mono font-bold text-blue-400">{value}</span>
  </div>
);

export default KnowledgeBase;
