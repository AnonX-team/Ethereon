
import React, { useState } from 'react';
import { Users, ShieldAlert, Cpu, Database, ToggleRight, ToggleLeft, Save, RefreshCw, Lock, Trash2, Key } from 'lucide-react';

const AdminPortal: React.FC = () => {
  const [operators, setOperators] = useState([
    { id: 'OP-01', name: 'Root_Operator', level: 10, status: 'Active', lastLogin: '10m ago' },
    { id: 'OP-02', name: 'Security_Lead', level: 8, status: 'Active', lastLogin: '1h ago' },
    { id: 'OP-03', name: 'Junior_Analyst', level: 4, status: 'Idle', lastLogin: '2d ago' },
  ]);

  const [policies, setPolicies] = useState({
    autoIsolation: true,
    heuristicScan: true,
    darkWebMonitor: false,
    quantumEncryption: true,
  });

  const togglePolicy = (key: keyof typeof policies) => {
    setPolicies(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-black text-white font-orbitron tracking-widest neon-text flex items-center gap-4">
          ADMIN_PORTAL
          <span className="text-[10px] bg-red-500/10 text-red-500 px-3 py-1 rounded-full border border-red-500/20 font-bold tracking-widest uppercase">Root Level Access</span>
        </h2>
        <p className="text-nytron-blue/60 text-xs font-bold uppercase tracking-[0.4em] mt-2">Global Governance & Access Control // ETHEREON-HQ</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Operator Management */}
        <div className="lg:col-span-2 space-y-6">
          <div className="nytron-glass rounded-2xl border-white/5 overflow-hidden">
            <div className="p-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="text-nytron-blue" size={20} />
                <h3 className="text-xs font-black font-orbitron text-white tracking-widest uppercase">Active Operators</h3>
              </div>
              <button className="px-4 py-2 bg-nytron-blue/10 border border-nytron-blue/30 text-nytron-blue rounded-lg text-[10px] font-black font-orbitron hover:bg-nytron-blue hover:text-nytron-bg transition-all">
                PROVISION_NEW
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-black/20 text-[9px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5">
                  <tr>
                    <th className="px-8 py-4">Operator</th>
                    <th className="px-8 py-4">Auth Level</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4">Last Sync</th>
                    <th className="px-8 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {operators.map((op) => (
                    <tr key={op.id} className="hover:bg-white/5 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-nytron-blue/20 flex items-center justify-center text-nytron-blue font-black font-orbitron text-xs">
                            {op.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-xs font-black text-white font-orbitron uppercase tracking-tighter">{op.name}</p>
                            <p className="text-[9px] text-slate-500 font-mono tracking-tighter">{op.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2">
                           <div className="flex gap-0.5">
                             {[...Array(10)].map((_, i) => (
                               <div key={i} className={`w-1 h-3 rounded-full ${i < op.level ? 'bg-nytron-blue' : 'bg-slate-800'}`}></div>
                             ))}
                           </div>
                           <span className="text-[10px] font-black text-nytron-blue font-mono ml-2">T-{op.level}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${
                          op.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-800 text-slate-500'
                        }`}>
                          {op.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-[10px] font-mono text-slate-500">{op.lastLogin}</td>
                      <td className="px-8 py-5 text-right">
                        <button className="p-2 text-slate-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="nytron-glass p-8 rounded-2xl border-white/5 bg-gradient-to-r from-nytron-blue/5 to-transparent flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-nytron-blue/10 border border-nytron-blue/30 flex items-center justify-center text-nytron-blue shadow-[0_0_30px_rgba(0,242,255,0.1)]">
                <Key size={32} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-sm font-black text-white font-orbitron tracking-widest">ENCRYPTION_KEY_ROTATION</h4>
                <p className="text-xs text-slate-500 font-medium mt-1">Last rotated: 14:00 UTC (Current cycle: 48h)</p>
              </div>
            </div>
            <button className="px-6 py-3 bg-nytron-blue/10 border border-nytron-blue/40 text-nytron-blue rounded-xl font-black font-orbitron text-[10px] tracking-[0.2em] uppercase hover:bg-nytron-blue hover:text-nytron-bg transition-all active:scale-95">
              EXECUTE_ROTATION
            </button>
          </div>
        </div>

        {/* Right Column: Global Policies & Health */}
        <div className="space-y-6">
          <div className="nytron-glass p-8 rounded-2xl border-nytron-blue/20 bg-nytron-blue/5">
            <div className="flex items-center gap-3 mb-8">
              <Lock className="text-nytron-blue" size={18} />
              <h3 className="text-xs font-black font-orbitron text-white tracking-widest">SECURITY_PROTOCOLS</h3>
            </div>
            <div className="space-y-6">
              <PolicyToggle 
                label="AUTO_NODE_ISOLATION" 
                desc="Instant firewall quarantine on high-risk detections" 
                active={policies.autoIsolation} 
                onToggle={() => togglePolicy('autoIsolation')}
              />
              <PolicyToggle 
                label="HEURISTIC_DEEP_SCAN" 
                desc="Pattern-matching for zero-day identification" 
                active={policies.heuristicScan} 
                onToggle={() => togglePolicy('heuristicScan')}
              />
              <PolicyToggle 
                label="DARK_WEB_MONITORING" 
                desc="External credential breach detection" 
                active={policies.darkWebMonitor} 
                onToggle={() => togglePolicy('darkWebMonitor')}
              />
              <PolicyToggle 
                label="QUANTUM_ENCRYPTION" 
                desc="Post-quantum cryptographic packet wrapping" 
                active={policies.quantumEncryption} 
                onToggle={() => togglePolicy('quantumEncryption')}
              />
            </div>
          </div>

          <div className="nytron-glass p-8 rounded-2xl border-white/5">
            <div className="flex items-center gap-3 mb-6">
              <RefreshCw className="text-slate-500 animate-spin-slow" size={18} />
              <h3 className="text-xs font-black font-orbitron text-white tracking-widest">API_UPLINK_STATUS</h3>
            </div>
            <div className="space-y-4">
              <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                 <div className="flex justify-between items-center mb-2">
                   <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Gemini-Pro Engine</span>
                   <span className="text-[9px] font-black text-emerald-500">OPERATIONAL</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></div>
                    <span className="text-[10px] font-mono text-slate-400">Latency: 42ms</span>
                 </div>
              </div>
              <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                 <div className="flex justify-between items-center mb-2">
                   <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Tactical Mapping</span>
                   <span className="text-[9px] font-black text-nytron-blue">OPTIMIZING</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-nytron-blue animate-pulse"></div>
                    <span className="text-[10px] font-mono text-slate-400">Nodes: 12 Global Gates</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PolicyToggle = ({ label, desc, active, onToggle }: any) => (
  <div className="flex items-start justify-between group cursor-pointer" onClick={onToggle}>
    <div className="space-y-1">
      <p className="text-[10px] font-black text-white font-orbitron tracking-widest group-hover:text-nytron-blue transition-colors">{label}</p>
      <p className="text-[9px] text-slate-500 font-medium leading-relaxed max-w-[180px]">{desc}</p>
    </div>
    <div className="pt-1">
      {active ? (
        <ToggleRight className="text-nytron-blue shadow-[0_0_10px_#00f2ff]" size={28} />
      ) : (
        <ToggleLeft className="text-slate-800" size={28} />
      )}
    </div>
  </div>
);

export default AdminPortal;
