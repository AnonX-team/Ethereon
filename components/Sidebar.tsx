
import React from 'react';
import { LayoutDashboard, Shield, Zap, FileText, Monitor, LogOut, Hexagon, BrainCircuit, Activity, Settings } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout }) => {
  const navItems = [
    { id: 'dashboard', label: 'COMMAND', icon: LayoutDashboard },
    { id: 'endpoint', label: 'NODES', icon: Monitor },
    { id: 'threats', label: 'THREATS', icon: Shield },
    { id: 'training', label: 'SYNAPSE', icon: BrainCircuit },
    { id: 'response', label: 'RESPONSE', icon: Zap },
    { id: 'logs', label: 'ARCHIVE', icon: FileText },
    { id: 'admin', label: 'ADMIN', icon: Settings },
  ];

  return (
    <aside className="w-64 flex flex-col bg-nytron-surface border-r border-nytron-blue/10 z-50 shrink-0">
      <div className="p-8">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative">
            <Hexagon className="text-nytron-blue fill-nytron-blue/10 animate-pulse" size={36} strokeWidth={1.5} />
            <span className="absolute inset-0 flex items-center justify-center text-[14px] font-black text-nytron-blue font-orbitron">E</span>
          </div>
          <div>
            <h1 className="text-xl font-black tracking-widest text-white font-orbitron leading-none neon-text">ETHEREON</h1>
            <p className="text-[9px] text-nytron-blue/60 font-bold uppercase tracking-[0.3em] mt-1">Cyber Intelligence</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 relative group overflow-hidden ${
                isActive 
                  ? 'bg-nytron-blue/10 text-nytron-blue' 
                  : 'text-slate-500 hover:text-white hover:bg-white/5'
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-nytron-blue shadow-[0_0_15px_#00f2ff]"></div>
              )}
              <Icon size={18} className={isActive ? 'text-nytron-blue' : 'text-slate-600 group-hover:text-nytron-blue transition-colors'} />
              <span className="text-xs font-bold tracking-widest font-orbitron">{item.label}</span>
              {isActive && <Activity size={12} className="ml-auto animate-pulse" />}
            </button>
          );
        })}
      </nav>

      <div className="p-6 space-y-4">
        <div className="p-4 rounded-xl bg-nytron-blue/5 border border-nytron-blue/10">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[9px] font-bold text-slate-500 uppercase">Load Balance</span>
            <span className="text-[9px] font-bold text-nytron-blue">OPTIMAL</span>
          </div>
          <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
            <div className="h-full bg-nytron-blue w-2/3 shadow-[0_0_10px_#00f2ff]"></div>
          </div>
        </div>
        
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-nytron-blue transition-all text-xs font-bold tracking-widest font-orbitron group"
        >
          <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>TERMINATE</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
