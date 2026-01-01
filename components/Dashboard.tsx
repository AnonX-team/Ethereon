
import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, ShieldAlert, Cpu, Terminal, Zap, Server, ShieldCheck, Database } from 'lucide-react';
import { getSystemHealthSummary } from '../services/geminiService';
import { MOCK_LOGS, MOCK_THREATS } from '../constants';

const data = [
  { name: '00:00', traffic: 320 },
  { name: '04:00', traffic: 450 },
  { name: '08:00', traffic: 710 },
  { name: '12:00', traffic: 890 },
  { name: '16:00', traffic: 540 },
  { name: '20:00', traffic: 980 },
  { name: '23:59', traffic: 410 },
];

const Dashboard: React.FC<{ setActiveTab: (t: string) => void }> = ({ setActiveTab }) => {
  const [aiReport, setAiReport] = useState<string>("Uplinking to Ethereon-Neural-Core...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      const summary = await getSystemHealthSummary(MOCK_LOGS, MOCK_THREATS);
      setAiReport(summary || "No external penetration attempts verified in the current cycle.");
      setLoading(false);
    };
    fetchSummary();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl font-black text-white font-orbitron tracking-widest neon-text">COMMAND_DASH</h2>
          <p className="text-nytron-blue/60 text-xs font-bold uppercase tracking-[0.4em] mt-2">Active Cluster Monitoring // ETHEREON-OS</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
             <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Protocol Version</span>
             <span className="text-xs font-black text-nytron-blue font-mono tracking-tighter">ETH-4.1.0-SEC</span>
          </div>
          <div className="w-1.5 h-10 bg-nytron-blue/20 rounded-full relative overflow-hidden">
             <div className="absolute top-0 w-full bg-nytron-blue h-1/2 animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <NytronStat title="LINKED_NODES" value="005" sub="Network Active" icon={Server} color="blue" />
        <NytronStat title="THREAT_COUNT" value="002" sub="Requires Action" icon={ShieldAlert} color="red" />
        <NytronStat title="THROUGHPUT" value="1.2" sub="GB/S Bandwidth" icon={Activity} color="blue" />
        <NytronStat title="UPTIME" value="99.9" sub="Core Resilience" icon={ShieldCheck} color="cyan" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 nytron-glass rounded-2xl p-8 border-nytron-blue/20 relative group">
          <div className="absolute top-4 right-4 text-[9px] font-bold text-nytron-blue animate-pulse opacity-50 font-mono tracking-widest">REALTIME_FLOW</div>
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-xs font-black text-white font-orbitron tracking-widest flex items-center gap-3">
              <Activity size={18} className="text-nytron-blue" />
              TRAFFIC_ANALYSIS
            </h3>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="nytronGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00f2ff" stopOpacity={0.4}/>
                    <stop offset="100%" stopColor="#0a84ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#ffffff" opacity={0.03} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} font-mono />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#05070a', border: '1px solid #00f2ff33', borderRadius: '4px', fontSize: '10px', fontFamily: 'Orbitron' }}
                />
                <Area type="monotone" dataKey="traffic" stroke="#00f2ff" strokeWidth={4} fillOpacity={1} fill="url(#nytronGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="nytron-glass rounded-2xl p-8 border-nytron-blue/30 bg-nytron-blue/5 shadow-[0_0_30px_rgba(0,242,255,0.05)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-nytron-blue flex items-center justify-center shadow-[0_0_15px_#00f2ff]">
                <Database size={20} className="text-nytron-bg" />
              </div>
              <div>
                <h4 className="text-xs font-black font-orbitron text-white">ETHEREON_CORE</h4>
                <p className="text-[9px] font-bold text-nytron-blue uppercase tracking-widest">Intelligence Link</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-black/40 border border-white/5 p-4 rounded-xl">
                <p className="text-[10px] leading-relaxed text-slate-300 font-medium italic">
                  <span className="text-nytron-blue font-black uppercase block mb-2 font-orbitron tracking-widest text-[8px]">Analysis Payload:</span>
                  {loading ? "Decrypting incoming stream..." : aiReport}
                </p>
              </div>
              <button className="w-full py-4 bg-nytron-blue/10 border border-nytron-blue/30 text-nytron-blue rounded-xl font-black font-orbitron text-[10px] tracking-[0.2em] uppercase hover:bg-nytron-blue hover:text-nytron-bg transition-all">
                REQUEST_FORENSICS
              </button>
            </div>
          </div>

          <div className="nytron-glass rounded-2xl p-6 border-white/5">
             <h4 className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-4">Node Health Telemetry</h4>
             <div className="space-y-4">
               <TelemetryItem label="Memory Frequency" value="4400 MHz" />
               <TelemetryItem label="Security Layer" value="Alpha-Level" />
               <TelemetryItem label="Data Integrity" value="99.999%" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NytronStat = ({ title, value, sub, icon: Icon, color }: any) => {
  const colorMap = {
    blue: 'text-nytron-blue bg-nytron-blue/10 border-nytron-blue/20',
    red: 'text-red-500 bg-red-500/10 border-red-500/20',
    cyan: 'text-nytron-cobalt bg-nytron-cobalt/10 border-nytron-cobalt/20'
  };

  return (
    <div className="nytron-glass p-6 rounded-2xl border-white/5 hover:border-nytron-blue/30 transition-all group overflow-hidden relative">
      <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-700">
        <Icon size={100} />
      </div>
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-lg ${colorMap[color as keyof typeof colorMap]}`}>
          <Icon size={20} />
        </div>
      </div>
      <div>
        <h4 className="text-3xl font-black text-white font-orbitron tracking-tight mb-1">{value}</h4>
        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em]">{title}</p>
        <p className="text-[8px] text-nytron-blue/40 mt-3 font-bold uppercase tracking-widest">{sub}</p>
      </div>
    </div>
  );
};

const TelemetryItem = ({ label, value }: any) => (
  <div className="flex items-center justify-between border-b border-white/5 pb-2">
    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{label}</span>
    <span className="text-[10px] font-black text-white font-mono">{value}</span>
  </div>
);

export default Dashboard;
