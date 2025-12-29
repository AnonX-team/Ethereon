
import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Monitor, ShieldAlert, Activity, Cpu } from 'lucide-react';
import { getSystemHealthSummary } from '../services/geminiService';
import { MOCK_LOGS, MOCK_THREATS } from '../constants';

const data = [
  { name: '00:00', traffic: 400 },
  { name: '04:00', traffic: 300 },
  { name: '08:00', traffic: 600 },
  { name: '12:00', traffic: 800 },
  { name: '16:00', traffic: 500 },
  { name: '20:00', traffic: 700 },
  { name: '23:59', traffic: 450 },
];

const Dashboard: React.FC<{ setActiveTab: (t: string) => void }> = ({ setActiveTab }) => {
  const [aiReport, setAiReport] = useState<string>("Initializing AI Defense Core...");

  useEffect(() => {
    const fetchSummary = async () => {
      const summary = await getSystemHealthSummary(MOCK_LOGS, MOCK_THREATS);
      setAiReport(summary || "Unable to retrieve AI summary.");
    };
    fetchSummary();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">System Overview</h2>
        <p className="text-slate-500">Welcome to the Ethereon Control Center. Real-time monitoring active.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Endpoints" value="05" sub="Active" icon={Monitor} color="blue" />
        <StatCard title="Threats" value="02" sub="Detected" icon={ShieldAlert} color="rose" />
        <StatCard title="Uptime" value="99.9%" sub="System-wide" icon={Activity} color="emerald" />
        <StatCard title="Core Load" value="42%" sub="Normal" icon={Cpu} color="indigo" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm overflow-hidden relative">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-900 dark:text-white">Network Activity (24h)</h3>
            <div className="flex items-center gap-2 text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full text-xs font-bold">
              <ArrowUpRight size={14} />
              12.5%
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.1} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#3b82f6' }}
                />
                <Area type="monotone" dataKey="traffic" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorTraffic)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 text-white flex flex-col justify-between border border-blue-500/20 shadow-xl shadow-blue-500/10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
                <ShieldAlert size={18} />
              </div>
              <h3 className="font-bold">AI Threat Analysis</h3>
            </div>
            <div className="mono text-xs text-blue-200 bg-blue-900/30 p-4 rounded-xl leading-relaxed">
              {aiReport}
            </div>
          </div>
          <button className="w-full mt-6 py-3 bg-white text-slate-950 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors">
            Generate Full Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickLink title="Endpoint Monitoring" icon={Monitor} onClick={() => setActiveTab('endpoint')} />
        <QuickLink title="Threat Alerts" icon={ShieldAlert} onClick={() => setActiveTab('threats')} />
        <QuickLink title="Logs & Reports" icon={Activity} onClick={() => setActiveTab('logs')} />
        <QuickLink title="Responses" icon={Activity} onClick={() => setActiveTab('response')} />
      </div>
    </div>
  );
};

const StatCard = ({ title, value, sub, icon: Icon, color }: any) => {
  const colorMap: any = {
    blue: 'text-blue-500 bg-blue-500/10',
    rose: 'text-rose-500 bg-rose-500/10',
    emerald: 'text-emerald-500 bg-emerald-500/10',
    indigo: 'text-indigo-500 bg-indigo-500/10',
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">{title}</p>
        <div className="flex items-baseline gap-2">
          <h4 className="text-2xl font-bold text-slate-900 dark:text-white">{value}</h4>
          <span className="text-[10px] text-slate-400 font-medium uppercase">{sub}</span>
        </div>
      </div>
      <div className={`p-3 rounded-xl ${colorMap[color]}`}>
        <Icon size={24} />
      </div>
    </div>
  );
};

const QuickLink = ({ title, icon: Icon, onClick }: any) => (
  <button 
    onClick={onClick}
    className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 group hover:border-blue-500/50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
  >
    <div className="flex items-center gap-3">
      <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:bg-blue-500 group-hover:text-white transition-colors">
        <Icon size={18} />
      </div>
      <span className="font-semibold text-sm text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white">{title}</span>
    </div>
    <ArrowUpRight size={16} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
  </button>
);

export default Dashboard;
