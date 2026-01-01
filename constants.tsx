
import React from 'react';

export const COLORS = {
  primary: '#00f2ff',
  secondary: '#0a84ff',
  danger: '#ff2d55',
  warning: '#ffcc00',
  success: '#00ffaa',
};

export const MOCK_ENDPOINTS: any[] = [
  { id: 'NODE-01', name: 'Alpha-Prime (HQ)', status: 'online', cpu: 42, memory: 38, lastCheck: 'Active', networkActivity: 'Normal', processes: [
    { id: 'p1', name: 'nytron_core.svc', type: 'System', cpu: 12 },
    { id: 'p2', name: 'quantum_gate.sys', type: 'Network', cpu: 4 },
  ]},
  { id: 'NODE-02', name: 'Ghost-Relay (LDN)', status: 'online', cpu: 15, memory: 22, lastCheck: '2m ago', networkActivity: 'Normal', processes: [] },
  { id: 'SRV-01', name: 'Nytron-Mainframe', status: 'online', cpu: 82, memory: 91, lastCheck: 'Active', networkActivity: 'High', processes: [] },
];

export const MOCK_THREATS: any[] = [
  { id: 'T-8821', type: 'Brute Force Anomaly', severity: 'CRITICAL', endpoint: 'NODE-01', timestamp: '14:22:01', status: 'detected' },
  { id: 'T-8822', type: 'Data Exfiltration', severity: 'HIGH', endpoint: 'SRV-01', timestamp: '14:25:30', status: 'mitigating' },
];

export const MOCK_LOGS: any[] = [
  { id: 'L1', date: '01-01-25', type: 'Anomaly', action: 'Port Shutdown', endpoint: 'NODE-01' },
  { id: 'L2', date: '01-01-25', type: 'Login', action: 'Root Access', endpoint: 'SRV-01' },
];
