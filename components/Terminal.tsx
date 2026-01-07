
import React, { useState, useRef, useEffect } from 'react';
import { TerminalMessage } from '../types';

interface TerminalProps {
  messages: TerminalMessage[];
  onCommand: (cmd: string) => void;
  isProcessing: boolean;
}

const Terminal: React.FC<TerminalProps> = ({ messages, onCommand, isProcessing }) => {
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;
    onCommand(input);
    setInput('');
  };

  return (
    <div className="bg-slate-950/80 border border-emerald-900/50 rounded-lg p-4 flex flex-col h-full font-mono text-sm backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.1)]">
      <div className="flex items-center justify-between border-b border-emerald-900/50 pb-2 mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
        </div>
        <span className="text-emerald-500/50 text-xs">NEURAL-LINK CORE V2.4</span>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-2 mb-4 scrollbar-hide">
        {messages.map((m) => (
          <div key={m.id} className="flex space-x-2 animate-in fade-in slide-in-from-left-2 duration-300">
            <span className={`shrink-0 ${
              m.type === 'USER' ? 'text-cyan-400' : 
              m.type === 'AI' ? 'text-fuchsia-400' : 
              m.type === 'ERROR' ? 'text-red-400' : 'text-emerald-500'
            }`}>
              {m.type === 'USER' ? 'user@neural ~$' : 
               m.type === 'AI' ? 'ai@core ~$' : 
               m.type === 'ERROR' ? '[ERROR]' : '[SYS]'}
            </span>
            <span className="whitespace-pre-wrap leading-relaxed">{m.content}</span>
          </div>
        ))}
        {isProcessing && (
          <div className="text-emerald-500 animate-pulse">Syncing with blockchain nodes...</div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="relative mt-auto border-t border-emerald-900/50 pt-4">
        <div className="flex items-center">
          <span className="text-cyan-400 mr-2">user@neural ~$</span>
          <input
            autoFocus
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-transparent border-none outline-none text-emerald-400 w-full placeholder-emerald-900"
            placeholder="Type 'help' for commands..."
          />
        </div>
      </form>
    </div>
  );
};

export default Terminal;
