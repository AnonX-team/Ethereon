
import React from 'react';
import { Activity, Bell, Lock, Search, Cpu } from 'lucide-react';

interface HeaderProps {
  systemStatus: string;
  connectedCount: number;
  alertCount: number;
}

const Header: React.FC<HeaderProps> = ({ systemStatus, connectedCount, alertCount }) => {
  return (
    <header className="h-16 border-b border-white/5 bg-nytron-surface/80 backdrop-blur-xl flex items-center justify-between px-8 z-40">
      <div className="flex items-center gap-10">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-nytron-blue transition-colors" size={14} />
          <input 
            type="text" 
            placeholder="SCAN_NETWORK_DATABASE..."
            className="bg-black/40 border border-white/5 rounded pl-10 pr-4 py-1.5 text-[10px] text-slate-300 focus:outline-none focus:border-nytron-blue w-72 transition-all font-mono tracking-widest"
          />
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-8 border-r border-white/5 pr-8">
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-nytron-blue animate-pulse"></div>
               <span className="text-[10px] font-black text-white font-orbitron tracking-widest leading-none">CORE_SYNC</span>
            </div>
            <span className="text-[8px] text-nytron-blue font-bold uppercase tracking-widest mt-1">Status: {systemStatus}</span>
          </div>
          <div className="flex items-center gap-5">
             <div className="flex flex-col items-center">
               <span className="text-xs font-black text-white font-orbitron">{connectedCount}</span>
               <span className="text-[8px] text-slate-600 font-bold uppercase tracking-widest">NODES</span>
             </div>
             <div className="flex flex-col items-center">
               <span className="text-xs font-black text-red-500 font-orbitron">{alertCount}</span>
               <span className="text-[8px] text-slate-600 font-bold uppercase tracking-widest">ALERTS</span>
             </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-500 hover:text-nytron-blue transition-all relative">
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-nytron-blue rounded-full shadow-[0_0_10px_#00f2ff]"></span>
          </button>
          <div className="flex items-center gap-3 bg-white/5 p-1.5 pr-4 rounded-lg border border-white/5">
            <div className="w-8 h-8 rounded bg-nytron-blue flex items-center justify-center text-nytron-bg shadow-[0_0_15px_rgba(0,242,255,0.3)]">
              <Cpu size={18} />
            </div>
            <div className="text-left">
              <p className="text-[9px] font-black text-white font-orbitron tracking-widest leading-none uppercase">Admin.Op</p>
              <p className="text-[8px] text-nytron-blue font-bold mt-1 tracking-widest">LEVEL_04</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
