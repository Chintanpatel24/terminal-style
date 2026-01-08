
import React, { useState, useRef, useEffect } from 'react';
import { TerminalLine, CommandResponse } from '../types';
import { HELP_TEXT, PROJECTS, SKILLS, SYSTEM_INFO } from '../constants';

const Terminal: React.FC = () => {
  const [history, setHistory] = useState<TerminalLine[]>([
    { 
        text: '--- CIRCUIT-TERM CORE INTERFACE v2.0 ---', 
        type: 'info', 
        timestamp: new Date().toLocaleTimeString() 
    },
    { 
        text: 'SECURE LINK ESTABLISHED. ALL SYSTEMS NOMINAL.', 
        type: 'success', 
        timestamp: new Date().toLocaleTimeString() 
    },
    { 
        text: 'Type "help" to display command manifest.', 
        type: 'info', 
        timestamp: new Date().toLocaleTimeString() 
    }
  ]);
  const [input, setInput] = useState('');
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleCommand = (cmd: string): CommandResponse => {
    const cleanCmd = cmd.toLowerCase().trim();
    
    switch (cleanCmd) {
      case 'help':
        return { output: HELP_TEXT, type: 'info' };
      
      case 'about':
        return { 
          output: "NAME: [ REDACTED ]\nROLE: Senior Systems Architect / Logic Designer\nLOC: Central Grid Cluster\n\nBio: I specialize in building high-frequency distributed architectures and tactile digital interfaces. My design methodology emphasizes industrial efficiency, low-level optimization, and structural integrity.", 
          type: 'output' 
        };

      case 'projects':
        const projectList = PROJECTS.map(p => `[${p.id}] :: ${p.name.toUpperCase()}\n    STATUS: DEPLOYED\n    DESC: ${p.description}\n    CORE: ${p.tech.join(' | ')}\n`).join('\n');
        return { output: `FETCHING SECURE ARCHIVES...\n\n${projectList}`, type: 'success' };

      case 'skills':
        const skillList = SKILLS.map(s => `>> ${s.category.toUpperCase()}\n   ${s.items.join(' // ')}`).join('\n\n');
        return { output: `DIAGNOSING LOGIC CAPABILITIES...\n\n${skillList}`, type: 'success' };

      case 'system':
        return { 
          output: `--- SYSTEM_DIAGNOSTICS ---\nNODE_ID: 0xFF-772-BA\nKERNEL: ${SYSTEM_INFO.os}\nSTATUS: ${SYSTEM_INFO.status}\nUPTIME: ${SYSTEM_INFO.uptime}\nLOAD: [|||||||---] 72%\nTEMP: 38.2C (NOMINAL)`, 
          type: 'info' 
        };

      case 'contact':
        return { 
          output: "INITIATING COMMS PROTOCOL...\n\n>> GITHUB: github.com/circuit-dev\n>> LINKEDIN: linkedin.com/in/circuit-dev\n>> ENCRYPTED_MAIL: dev@terminal.local", 
          type: 'success' 
        };

      case 'clear':
        setHistory([]);
        return { output: '', type: 'output' };

      case 'shutdown':
        return { output: "ALERT: TERMINATING SESSION... CONNECTION LOST.", type: 'error' };

      default:
        return { output: `ERR: COMMAND_INVALID - "${cmd}". RE-ENTER OR TYPE "HELP".`, type: 'error' };
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newHistory: TerminalLine[] = [
      ...history,
      { text: `guest@${SYSTEM_INFO.host}:~ $ ${input}`, type: 'input', timestamp: new Date().toLocaleTimeString() }
    ];

    const response = handleCommand(input);
    
    if (response.output !== '') {
      newHistory.push({ 
        text: response.output, 
        type: response.type, 
        timestamp: new Date().toLocaleTimeString() 
      });
    }

    setHistory(newHistory);
    setInput('');
  };

  const getLineColor = (type: TerminalLine['type']) => {
    switch (type) {
      case 'input': return 'text-white font-bold opacity-90';
      case 'error': return 'text-red-400 italic';
      case 'success': return 'text-cyan-400 font-bold glow-text';
      case 'info': return 'text-amber-400 glow-text';
      default: return 'text-green-400 opacity-90';
    }
  };

  return (
    <div 
      className="bg-black/80 backdrop-blur-md border border-[#1a331a] rounded-sm shadow-[0_0_30px_rgba(0,255,65,0.05)] h-full flex flex-col p-4 font-mono text-sm md:text-base overflow-hidden relative"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Subtle CRT Interior Glow */}
      <div className="absolute inset-0 bg-green-500/5 pointer-events-none" />

      <div className="relative z-10 flex justify-between items-center mb-6 border-b border-[#1a331a]/50 pb-2 text-[10px] uppercase tracking-[0.2em] opacity-40 font-black">
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-red-900" />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-900" />
            <div className="w-1.5 h-1.5 rounded-full bg-green-900" />
          </div>
          <span>I/O_SHELL v2.0 // TTY1</span>
        </div>
        <div className="hidden sm:block">ENCRYPTION: AES-256-GCM</div>
      </div>

      <div className="relative z-10 flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
        {history.map((line, i) => (
          <div key={i} className="flex flex-col group">
            <div className={`whitespace-pre-wrap break-words leading-relaxed tracking-tight ${getLineColor(line.type)}`}>
              {line.text}
            </div>
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="relative z-10 mt-6 flex items-center gap-3 border-t border-[#1a331a]/50 pt-4">
        <span className="text-green-400 font-bold animate-pulse">❯</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-green-400 caret-green-400 font-bold placeholder:opacity-20"
          placeholder="ENTER_COMMAND..."
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </form>
    </div>
  );
};

export default Terminal;
