
import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, Monitor, ShieldAlert, Activity, Cpu, Terminal } from 'lucide-react';
import { getSystemHealthSummary } from '../services/geminiService';
import { MOCK_LOGS, MOCK_THREATS } from '../constants';

const data = [
  { name: '00:00', traffic: 420 },
  { name: '04:00', traffic: 380 },
  { name: '08:00', traffic: 710 },
  { name: '12:00', traffic: 890 },
  { name: '16:00', traffic: 540 },
  { name: '20:00', traffic: 780 },
  { name: '23:59', traffic: 490 },
];

const Dashboard: React.FC<{ setActiveTab: (t: string) => void }> = ({ setActiveTab }) => {
  const [aiReport, setAiReport] = useState<string>("WAITING_FOR_UPLINK...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      const summary = await getSystemHealthSummary(MOCK_LOGS, MOCK_THREATS);
      setAiReport(summary || "UPLINK_ERROR: Check console logs.");
      setLoading(false);
    };
    fetchSummary();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
          Command Dashboard
          <span className="text-xs bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded border border-emerald-500/20 font-mono animate-pulse">SECURE</span>
        </h2>
        <p className="text-slate-500">Real-time intelligence and node monitoring active.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Endpoints" value="05" sub="Managed Nodes" icon={Monitor} color="blue" />
        <StatCard title="Active Threats" value="02" sub="Immediate Action" icon={ShieldAlert} color="rose" />
        <StatCard title="Network Load" value="482" sub="Mbps" icon={Activity} color="emerald" />
        <StatCard title="Uptime" value="99.98" sub="SLA Compliance" icon={Cpu} color="indigo" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm overflow-hidden relative">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Activity size={18} className="text-blue-500" />
              Traffic Analytics
            </h3>
            <div className="flex items-center gap-2 text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full text-xs font-bold">
              <ArrowUpRight size={14} />
              NORMAL
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.1} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#3b82f6' }}
                />
                <Area type="monotone" dataKey="traffic" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorTraffic)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 text-white flex flex-col justify-between border border-blue-500/30 shadow-2xl shadow-blue-900/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full"></div>
          <div>
            <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
                <Terminal size={18} />
              </div>
              <h3 className="font-bold tracking-tight">AI DEFENSE_CORE</h3>
              <div className="ml-auto flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse [animation-delay:200ms]"></span>
              </div>
            </div>
            <div className={`mono text-[11px] leading-relaxed p-4 rounded-xl bg-black/40 border border-white/5 transition-opacity duration-500 ${loading ? 'opacity-50' : 'opacity-100'}`}>
              <span className="text-blue-400 mr-2">$ Situation Report:</span>
              <p className="text-blue-100 mt-2">{aiReport}</p>
            </div>
          </div>
          <button className="w-full mt-8 py-3 bg-white text-slate-950 rounded-xl font-bold text-sm hover:bg-blue-50 transition-all hover:scale-[1.02] active:scale-95 shadow-lg">
            GENERATE FULL AUDIT
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickLink title="Node Monitoring" icon={Monitor} onClick={() => setActiveTab('endpoint')} />
        <QuickLink title="Threat Vault" icon={ShieldAlert} onClick={() => setActiveTab('threats')} />
        <QuickLink title="Archive & Logs" icon={Activity} onClick={() => setActiveTab('logs')} />
        <QuickLink title="Auto Response" icon={Activity} onClick={() => setActiveTab('response')} />
      </div>
    </div>
  );
};

const StatCard = ({ title, value, sub, icon: Icon, color }: any) => {
  const colorMap: any = {
    blue: 'text-blue-500 bg-blue-500/10 border-blue-500/10',
    rose: 'text-rose-500 bg-rose-500/10 border-rose-500/10',
    emerald: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/10',
    indigo: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/10',
  };

  return (
    <div className="bg-white dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between group hover:border-slate-300 dark:hover:border-slate-700 transition-all hover:translate-y-[-2px]">
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">{title}</p>
        <div className="flex items-baseline gap-2">
          <h4 className="text-2xl font-bold text-slate-900 dark:text-white font-mono">{value}</h4>
          <span className="text-[10px] text-slate-400 font-medium uppercase">{sub}</span>
        </div>
      </div>
      <div className={`p-3 rounded-xl transition-all group-hover:scale-110 ${colorMap[color]}`}>
        <Icon size={24} />
      </div>
    </div>
  );
};

const QuickLink = ({ title, icon: Icon, onClick }: any) => (
  <button 
    onClick={onClick}
    className="flex items-center justify-between p-4 bg-white dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-800 group hover:border-blue-500/50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
  >
    <div className="flex items-center gap-3">
      <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-all">
        <Icon size={18} />
      </div>
      <span className="font-semibold text-sm text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white">{title}</span>
    </div>
    <ArrowUpRight size={16} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
  </button>
);

export default Dashboard;
