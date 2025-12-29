
export enum SystemStatus {
  NORMAL = 'NORMAL',
  DEGRADED = 'DEGRADED',
  CRITICAL = 'CRITICAL'
}

export enum ThreatSeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export interface Endpoint {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'warning';
  cpu: number;
  memory: number;
  lastCheck: string;
  networkActivity: 'Normal' | 'High' | 'Suspicious';
  processes: Process[];
}

export interface Process {
  id: string;
  name: string;
  type: string;
  cpu: number;
}

export interface Threat {
  id: string;
  type: string;
  severity: ThreatSeverity;
  endpoint: string;
  timestamp: string;
  status: 'detected' | 'mitigating' | 'resolved';
}

export interface LogEntry {
  id: string;
  date: string;
  type: string;
  action: string;
  endpoint: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
}
