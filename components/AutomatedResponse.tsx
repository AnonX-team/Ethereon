
import React from 'react';
import { Zap, ShieldCheck, WifiOff, Terminal, XCircle, AlertCircle } from 'lucide-react';

const AutomatedResponse: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="bg-slate-900 rounded-3xl p-12 text-white border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8">
          <Zap className="text-blue-500/20" size={120} />
        </div>

        <div className="relative z-10 text-center mb-12">
          <div className="w-20 h-20 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center shadow-2xl shadow-blue-600/50 mb-6">
            <Zap size={40} />
          </div>
          <h2 className="text-4xl font-bold tracking-tighter uppercase mb-2">Automated Response</h2>
          <p className="text-blue-400 font-medium uppercase tracking-[0.2em] text-xs">Tactical Incident Mitigation</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-6">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800 pb-2">Active Protocols</h4>
            <div className="space-y-3">
              <ResponseItem active icon={Terminal} label="Suspicious process terminated" code="ERR_KILL_9" />
              <ResponseItem active icon={XCircle} label="Malicious IP address blocked" code="FW_BLOCK_DROP" />
              <ResponseItem active icon={WifiOff} label="Endpoint isolated from network" code="VLAN_QUARANTINE" />
              <ResponseItem active={false} icon={AlertCircle} label="Hard reboot prevention" code="N/A" />
            </div>
          </div>
          
          <div className="bg-slate-950/50 p-8 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between mb-8">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Global Status</h4>
              <div className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-black rounded-full border border-emerald-500/20">SUCCESS</div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">Affected Node</p>
                  <p className="text-xl font-bold">PC-01</p>
                </div>
                <p className="text-xs font-mono text-slate-500">23:04:12 GMT</p>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-full animate-pulse"></div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mono">
                Threat T-1029 suppressed. System state validated by kernel protection module. Monitoring for reinfection.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button className="px-8 py-3 bg-white text-slate-950 font-bold rounded-xl hover:bg-slate-100 transition-colors uppercase text-sm tracking-widest">
            Acknowledge & Release
          </button>
        </div>
      </div>
    </div>
  );
};

const ResponseItem = ({ active, icon: Icon, label, code }: any) => (
  <div className={`flex items-center justify-between p-4 rounded-xl border transition-all ${active ? 'bg-blue-600/10 border-blue-500/30' : 'bg-slate-800/30 border-slate-800 opacity-50'}`}>
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-lg ${active ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-500'}`}>
        <Icon size={16} />
      </div>
      <span className="text-sm font-semibold">{label}</span>
    </div>
    <span className="text-[9px] font-mono text-slate-500">{code}</span>
  </div>
);

export default AutomatedResponse;
