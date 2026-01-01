
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import EndpointMonitoring from './components/EndpointMonitoring';
import ThreatDetection from './components/ThreatDetection';
import AutomatedResponse from './components/AutomatedResponse';
import LogsReports from './components/LogsReports';
import Login from './components/Login';
import KnowledgeBase from './components/KnowledgeBase';
import AdminPortal from './components/AdminPortal';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [knowledgeBase, setKnowledgeBase] = useState<string[]>([
    "PC-01 is identified as executive-tier hardware.",
    "Data sync anomalies on SRV-01 are expected during 02:00 UTC windows.",
    "Authorized VPN access originates from verified London gateway nodes."
  ]);

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard setActiveTab={setActiveTab} />;
      case 'endpoint': return <EndpointMonitoring />;
      case 'threats': return <ThreatDetection knowledgeBase={knowledgeBase} />;
      case 'response': return <AutomatedResponse />;
      case 'logs': return <LogsReports />;
      case 'training': return <KnowledgeBase data={knowledgeBase} onUpdate={setKnowledgeBase} />;
      case 'admin': return <AdminPortal />;
      default: return <Dashboard setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="flex h-screen bg-nytron-bg text-slate-100 font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={() => setIsAuthenticated(false)} />
      
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <Header 
          systemStatus="SECURE"
          connectedCount={5}
          alertCount={2}
        />
        
        <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-gradient-to-br from-nytron-bg to-nytron-surface/20">
          <div className="max-w-7xl mx-auto h-full">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
