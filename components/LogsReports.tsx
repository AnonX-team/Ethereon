
import React, { useState } from 'react';
import { MOCK_LOGS } from '../constants';
import { FileText, Download, Filter, Search, ChevronRight, ChevronLeft } from 'lucide-react';

const LogsReports: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLogs = MOCK_LOGS.filter(l => 
    l.type.toLowerCase().includes(searchTerm.toLowerCase()) || 
    l.endpoint.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Logs & Reports</h2>
          <p className="text-slate-500 text-sm">Historical audit trail of all security events and actions.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-slate-50 transition-colors">
            <Filter size={18} />
            Filter
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20">
            <Download size={18} />
            Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search logs..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
          <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <span>Showing {filteredLogs.length} of {MOCK_LOGS.length} entries</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-950/50 text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-8 py-4">Date</th>
                <th className="px-8 py-4">Event Type</th>
                <th className="px-8 py-4">Affected Endpoint</th>
                <th className="px-8 py-4">Action Taken</th>
                <th className="px-8 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                  <td className="px-8 py-5 text-sm font-medium text-slate-500">{log.date}</td>
                  <td className="px-8 py-5">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${
                      log.type === 'Anomaly' ? 'bg-rose-100 text-rose-500 dark:bg-rose-500/10' :
                      log.type === 'DDoS' ? 'bg-amber-100 text-amber-500 dark:bg-amber-500/10' :
                      'bg-slate-100 text-slate-500 dark:bg-slate-800'
                    }`}>
                      {log.type}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-sm font-bold text-slate-700 dark:text-slate-300">{log.endpoint}</td>
                  <td className="px-8 py-5 text-sm text-slate-500 font-mono italic">
                    {log.action}
                  </td>
                  <td className="px-8 py-5 text-right">
                    <span className="text-emerald-500 font-bold text-xs uppercase">Logged</span>
                  </td>
                </tr>
              ))}
              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-slate-400 font-medium italic">
                    No matching log entries found in Ethereon archives.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <button className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-blue-500 disabled:opacity-30" disabled>
            <ChevronLeft size={20} />
          </button>
          <div className="flex gap-2">
            <button className="w-8 h-8 rounded-lg bg-blue-600 text-white text-xs font-bold">1</button>
            <button className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800">2</button>
          </div>
          <button className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-blue-500">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogsReports;
