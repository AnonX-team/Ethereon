
import React from 'react';
import { Sun, Moon, Bell, Activity, Users, ShieldAlert, Wifi } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  systemStatus: string;
  connectedCount: number;
  alertCount: number;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, setIsDarkMode, systemStatus, connectedCount, alertCount }) => {
  return (
    <header className="h-20 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">System Status: </span>
          <span className={`text-xs font-bold uppercase tracking-widest ${systemStatus === 'NORMAL' ? 'text-emerald-500' : 'text-amber-500'}`}>
            {systemStatus}
          </span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-blue-500" />
            <span className="text-xs font-medium text-slate-500">Connected: {connectedCount}</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldAlert size={16} className="text-rose-500" />
            <span className="text-xs font-medium text-slate-500">Active Alerts: {alertCount}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-500 hover:text-blue-500 transition-colors"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <div className="relative">
          <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-500 hover:text-blue-500 transition-colors">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-950"></span>
          </button>
        </div>

        <div className="flex items-center gap-3 pl-4 ml-4 border-l border-slate-200 dark:border-slate-800">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-900 dark:text-white">Admin-01</p>
            <p className="text-[10px] text-slate-500 font-medium">Security Operator</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold border-2 border-white dark:border-slate-800 shadow-sm">
            AD
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
