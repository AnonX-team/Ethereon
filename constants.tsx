
import React from 'react';

export const COLORS = {
  primary: '#3b82f6',
  secondary: '#6366f1',
  danger: '#ef4444',
  warning: '#f59e0b',
  success: '#10b981',
};

export const MOCK_ENDPOINTS: any[] = [
  { id: 'PC-01', name: 'PC-01 (Headquarters)', status: 'online', cpu: 59, memory: 55, lastCheck: 'Just now', networkActivity: 'Normal', processes: [
    { id: 'p1', name: 'system_core.exe', type: 'System', cpu: 12 },
    { id: 'p2', name: 'network_manager.sys', type: 'Network', cpu: 4 },
    { id: 'p3', name: 'browser_v2.exe', type: 'Application', cpu: 35 },
    { id: 'p4', name: 'backgrou_svc.exe', type: 'Background', cpu: 8 },
  ]},
  { id: 'PC-02', name: 'PC-02 (Remote-London)', status: 'online', cpu: 22, memory: 40, lastCheck: '2m ago', networkActivity: 'Normal', processes: [] },
  { id: 'SRV-01', name: 'SRV-01 (Data-Center)', status: 'online', cpu: 88, memory: 92, lastCheck: 'Just now', networkActivity: 'High', processes: [] },
  { id: 'PC-03', name: 'PC-03 (Headquarters)', status: 'offline', cpu: 0, memory: 0, lastCheck: '1h ago', networkActivity: 'None', processes: [] },
  { id: 'LT-01', name: 'LT-01 (Mobile-Unit)', status: 'online', cpu: 15, memory: 30, lastCheck: '5m ago', networkActivity: 'Normal', processes: [] },
];

export const MOCK_THREATS: any[] = [
  { id: 'T-1029', type: 'Anomaly', severity: 'HIGH', endpoint: 'PC-01', timestamp: '23:03:45', status: 'mitigating' },
  { id: 'T-1030', type: 'DDoS Attempt', severity: 'CRITICAL', endpoint: 'SRV-01', timestamp: '23:15:10', status: 'detected' },
];

export const MOCK_LOGS: any[] = [
  { id: 'L1', date: '31-12-24', type: 'Anomaly', action: 'Process Terminated', endpoint: 'PC-01' },
  { id: 'L2', date: '31-12-24', type: 'DDoS', action: 'IP Blocked', endpoint: 'SRV-01' },
  { id: 'L3', date: '30-12-24', type: 'Login', action: 'Access Granted', endpoint: 'PC-02' },
  { id: 'L4', date: '30-12-24', type: 'Config Change', action: 'Rule Updated', endpoint: 'System' },
];
