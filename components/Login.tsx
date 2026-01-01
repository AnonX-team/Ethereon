
import React, { useState } from 'react';
import { Hexagon, Lock, User, ShieldCheck, ArrowRight } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-nytron-bg flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-nytron-blue/10 blur-[150px] rounded-full"></div>
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-nytron-accent/10 blur-[150px] rounded-full"></div>
      
      <div className="w-full max-w-sm z-10 animate-in fade-in zoom-in-95 duration-1000">
        <div className="text-center mb-12">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <Hexagon className="text-nytron-blue fill-nytron-blue/5 animate-pulse" size={80} strokeWidth={1} />
            <span className="absolute inset-0 flex items-center justify-center text-3xl font-black text-nytron-blue font-orbitron neon-text">E</span>
          </div>
          <h1 className="text-4xl font-black tracking-[0.3em] text-white font-orbitron neon-text">ETHEREON</h1>
          <p className="text-nytron-blue/60 font-bold text-xs tracking-[0.5em] uppercase mt-3">Auth Mainframe Gateway</p>
        </div>

        <div className="nytron-glass p-10 rounded-2xl border-nytron-blue/20 shadow-2xl relative overflow-hidden">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Access Protocol ID</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-nytron-blue transition-colors" size={18} />
                <input 
                  type="text" 
                  defaultValue="ROOT_OPERATOR"
                  className="w-full pl-12 pr-4 py-4 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-nytron-blue transition-all font-mono text-sm tracking-tight"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Quantum Security Key</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-nytron-blue transition-colors" size={18} />
                <input 
                  type="password" 
                  defaultValue="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-nytron-blue transition-all font-mono text-sm tracking-tight"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-nytron-blue/10 border border-nytron-blue/40 text-nytron-blue rounded-xl font-black font-orbitron text-xs tracking-[0.3em] uppercase flex items-center justify-center gap-3 transition-all shadow-[0_0_20px_rgba(0,242,255,0.1)] hover:bg-nytron-blue hover:text-nytron-bg active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-nytron-blue/20 border-t-nytron-blue rounded-full animate-spin"></div>
              ) : (
                <>
                  Engage Core
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 pt-6 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-nytron-blue/60">
              <ShieldCheck size={16} className="animate-pulse" />
              <span className="text-[9px] font-bold uppercase tracking-widest">Secure Link Active</span>
            </div>
            <a href="#" className="text-[9px] font-bold text-slate-600 hover:text-nytron-blue transition-colors uppercase tracking-widest">Protocol Reset</a>
          </div>
        </div>

        <p className="mt-12 text-center text-[9px] text-slate-700 font-bold uppercase tracking-[0.4em] opacity-50">
          TIER-5 ENCRYPTION MANDATORY • AUTHORIZED PERSONNEL ONLY
        </p>
      </div>
    </div>
  );
};

export default Login;
