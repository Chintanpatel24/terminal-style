
import React from 'react';

export interface Project {
  id: string;
  name: string;
  description: string;
  tech: string[];
  link?: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface TerminalLine {
  text: React.ReactNode;
  type: 'input' | 'output' | 'error' | 'success' | 'info';
  timestamp: string;
}

export interface CommandResponse {
  output: React.ReactNode;
  type: 'output' | 'error' | 'success' | 'info';
}
