
import React, { useState, useEffect } from 'react';
import { MOCK_ENDPOINTS } from '../constants';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { Search, Filter, Monitor, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';

const EndpointMonitoring: React.FC = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState(MOCK_ENDPOINTS[0]);
  const [chartData, setChartData] = useState<{v: number}[]>([]);

  useEffect(() => {
    // Generate random load data for visual effect
    const initial = Array.from({length: 20}, () => ({v: Math.floor(Math.random() * 40) + 20}));
    setChartData(initial);

    const interval = setInterval(() => {
      setChartData(prev => [...prev.slice(1), {v: Math.floor(Math.random() * 30) + (selectedEndpoint.id === 'SRV-01' ? 60 : 20)}]);
    }, 2000);

    return () => clearInterval(interval);
  }, [selectedEndpoint]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Sidebar: Endpoint List */}
      <div className="xl:col-span-1 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search endpoints..." 
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>
        
        <div className="space-y-2 max-h-[calc(100vh-280px)] overflow-y-auto pr-2">
          {MOCK_ENDPOINTS.map((endpoint) => (
            <button
              key={endpoint.id}
              onClick={() => setSelectedEndpoint(endpoint)}
              className={`w-full p-4 rounded-xl border transition-all text-left flex items-center justify-between group ${
                selectedEndpoint.id === endpoint.id 
                ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20' 
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-blue-500/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${selectedEndpoint.id === endpoint.id ? 'bg-white/20' : 'bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-100'}`}>
                  <Monitor size={18} className={selectedEndpoint.id === endpoint.id ? 'text-white' : 'text-slate-500 group-hover:text-blue-600'} />
                </div>
                <div>
                  <h5 className="text-sm font-bold truncate max-w-[120px]">{endpoint.id}</h5>
                  <p className={`text-[10px] font-medium uppercase ${selectedEndpoint.id === endpoint.id ? 'text-blue-100' : 'text-slate-500'}`}>
                    {endpoint.status}
                  </p>
                </div>
              </div>
              <div className={`w-2 h-2 rounded-full ${endpoint.status === 'online' ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Panel: Selected Endpoint Detail */}
      <div className="xl:col-span-3 space-y-8">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-8 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Monitor size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">{selectedEndpoint.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 uppercase">Live Connection</span>
                  <span className="text-xs text-slate-400 font-medium">Last seen: {selectedEndpoint.lastCheck}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-colors">Isolate Endpoint</button>
              <button className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg text-sm font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-200 transition-colors">Remote Access</button>
            </div>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-6">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Network Activity</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white">{selectedEndpoint.networkActivity}</p>
                <div className="mt-4 h-1 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className={`h-full bg-emerald-500 ${selectedEndpoint.networkActivity === 'High' ? 'w-4/5 bg-amber-500' : 'w-1/3'}`}></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">CPU Usage</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{selectedEndpoint.cpu}%</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Memory</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{selectedEndpoint.memory}%</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 dark:text-white">Live Telemetry</h4>
                <div className="flex gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                </div>
              </div>
              <div className="h-48 w-full bg-slate-50 dark:bg-slate-950 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 relative overflow-hidden">
                <div className="absolute top-4 left-4 text-[10px] font-mono text-slate-400">CORE_LOAD_STREAM: ACTIVE</div>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <Area type="stepAfter" dataKey="v" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="px-8 pb-8">
            <h4 className="font-bold text-slate-900 dark:text-white mb-4">Running Processes</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-[10px] text-slate-500 uppercase tracking-widest border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="pb-4 font-bold">Process Name</th>
                    <th className="pb-4 font-bold">Type</th>
                    <th className="pb-4 font-bold">CPU Load</th>
                    <th className="pb-4 font-bold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {selectedEndpoint.processes.length > 0 ? selectedEndpoint.processes.map((p: any) => (
                    <tr key={p.id} className="group">
                      <td className="py-4 font-mono font-medium text-slate-700 dark:text-slate-300">{p.name}</td>
                      <td className="py-4">
                        <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-500">{p.type}</span>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500" style={{width: `${p.cpu}%`}}></div>
                          </div>
                          <span className="text-[10px] text-slate-500">{p.cpu}%</span>
                        </div>
                      </td>
                      <td className="py-4 text-right">
                        <button className="text-rose-500 hover:text-rose-600 font-bold text-xs uppercase opacity-0 group-hover:opacity-100 transition-opacity">Kill</button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={4} className="py-12 text-center text-slate-400">No active telemetry available for this node.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndpointMonitoring;
