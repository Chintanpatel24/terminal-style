
import React from 'react';
import { Project, Skill } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'P01',
    name: 'NeuralMesh Engine',
    description: 'A distributed processing framework for real-time sensor data analysis.',
    tech: ['Rust', 'WebAssembly', 'React'],
    link: '#'
  },
  {
    id: 'P02',
    name: 'GhostProtocol SDK',
    description: 'An end-to-end encrypted messaging bridge for legacy enterprise systems.',
    tech: ['TypeScript', 'Node.js', 'Cryptography'],
    link: '#'
  },
  {
    id: 'P03',
    name: 'Cortex UI',
    description: 'A design system built for high-density information displays.',
    tech: ['Tailwind', 'React', 'Framer Motion'],
    link: '#'
  }
];

export const SKILLS: Skill[] = [
  {
    category: 'Core Logic',
    items: ['TypeScript', 'Rust', 'Python', 'C++']
  },
  {
    category: 'Interface',
    items: ['React', 'Tailwind CSS', 'Canvas API', 'Three.js']
  },
  {
    category: 'Systems',
    items: ['Docker', 'AWS', 'PostgreSQL', 'Redis']
  }
];

export const SYSTEM_INFO = {
  user: 'guest',
  host: 'circuit-terminal-v2.0',
  os: 'PCB-Kernel v4.8.2-stable',
  status: 'ONLINE',
  uptime: '1024:12:05'
};

export const HELP_TEXT = `
AVAILABLE COMMANDS:
  about       - Display biography
  projects    - List recent developments
  skills      - Show technical capabilities
  clear       - Wipe terminal screen
  help        - Show this menu
  contact     - View communication channels
  system      - System hardware diagnostics
  shutdown    - Terminate current session
`;
