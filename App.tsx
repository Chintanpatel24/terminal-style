
import React, { useState, useEffect, useCallback } from 'react';
import PCBBackground from './components/PCBBackground';
import Terminal from './components/Terminal';
import AssetCard from './components/AssetCard';
import { Token, TerminalMessage } from './types';
import { INITIAL_TOKENS } from './constants';
import { getMarketAnalysis } from './services/geminiService';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

const App: React.FC = () => {
  const [tokens, setTokens] = useState<Token[]>(INITIAL_TOKENS);
  const [messages, setMessages] = useState<TerminalMessage[]>([
    { id: '1', type: 'SYSTEM', content: 'Neural-Chain Terminal initialized. Hardware check: PASS. Encrypted node: LINKED.', timestamp: Date.now() }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Simulated chart data
  const chartData = Array.from({ length: 20 }).map((_, i) => ({
    time: i,
    value: 120000 + Math.random() * 5000 * (i / 2)
  }));

  const totalValue = tokens.reduce((acc, t) => acc + t.balance * t.price, 0);

  const addMessage = (content: string, type: TerminalMessage['type'] = 'SYSTEM') => {
    setMessages(prev => [...prev, {
      id: Math.random().toString(36).substr(2, 9),
      content,
      type,
      timestamp: Date.now()
    }]);
  };

  const handleCommand = async (cmd: string) => {
    const command = cmd.toLowerCase().trim();
    addMessage(cmd, 'USER');

    if (command === 'help') {
      addMessage('AVAILABLE_COMMANDS:\n- portfolio : list holdings\n- analyze   : run neural market scan\n- clear     : reset terminal view\n- about     : hardware specs', 'SYSTEM');
    } else if (command === 'portfolio') {
      const pStr = tokens.map(t => `${t.symbol}: ${t.balance}`).join('\n');
      addMessage(`CURRENT_ASSETS:\n${pStr}\nTOTAL_VALUE: $${totalValue.toFixed(2)}`, 'SYSTEM');
    } else if (command === 'analyze') {
      setIsProcessing(true);
      const analysis = await getMarketAnalysis(tokens);
      addMessage(analysis, 'AI');
      setIsProcessing(false);
    } else if (command === 'clear') {
      setMessages([]);
    } else if (command === 'about') {
      addMessage('CORE: Neuro-Synthesizer v4.0\nKERNEL: Crypto-Linux-RT-5.1\nSECURITY: AES-4096 Quantum-Hardened', 'SYSTEM');
    } else {
      addMessage(`Command '${cmd}' not recognized. Type 'help' for instructions.`, 'ERROR');
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col p-4 md:p-8 space-y-6">
      <PCBBackground />

      {/* Header Stat Bar */}
      <header className="grid grid-cols-1 md:grid-cols-4 gap-4 z-10">
        <div className="bg-slate-900/80 border border-emerald-900/50 p-4 rounded-lg flex flex-col justify-center backdrop-blur-md">
          <span className="text-xs text-emerald-500/50 uppercase tracking-widest">Global Sync Status</span>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
            <span className="text-emerald-400 font-bold">NODE_ONLINE</span>
          </div>
        </div>
        <div className="md:col-span-2 bg-slate-900/80 border border-emerald-900/50 p-4 rounded-lg backdrop-blur-md">
           <span className="text-xs text-emerald-500/50 uppercase tracking-widest">Total Net Worth</span>
           <div className="text-3xl font-bold text-white tabular-nums">${totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
        </div>
        <div className="bg-slate-900/80 border border-emerald-900/50 p-4 rounded-lg flex flex-col justify-center backdrop-blur-md">
          <span className="text-xs text-emerald-500/50 uppercase tracking-widest">Encryption Level</span>
          <span className="text-emerald-400 font-bold">AES-256-GCM</span>
        </div>
      </header>

      {/* Main Grid */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 z-10 min-h-0">
        
        {/* Left Side: Asset Grid & Chart */}
        <div className="lg:col-span-7 flex flex-col space-y-6 min-h-0 overflow-y-auto pr-2">
          {/* Chart Section */}
          <section className="bg-slate-900/60 border border-emerald-900/50 rounded-lg p-6 backdrop-blur-sm">
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-sm font-bold text-emerald-500 uppercase flex items-center">
                  <span className="w-4 h-4 mr-2 border border-emerald-500 inline-block"></span>
                  Net Worth Projections
                </h2>
                <div className="flex space-x-2 text-[10px]">
                  <button className="px-2 py-1 bg-emerald-950 border border-emerald-900 text-emerald-400 rounded">1D</button>
                  <button className="px-2 py-1 bg-emerald-900/20 border border-emerald-900 text-emerald-500/50 rounded">1W</button>
                  <button className="px-2 py-1 bg-emerald-900/20 border border-emerald-900 text-emerald-500/50 rounded">1M</button>
                </div>
             </div>
             <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#065f4633" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#020617', border: '1px solid #065f46', borderRadius: '4px' }}
                    itemStyle={{ color: '#10b981' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#10b981" fillOpacity={1} fill="url(#colorVal)" />
                </AreaChart>
              </ResponsiveContainer>
             </div>
          </section>

          {/* Asset List */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tokens.map(token => (
              <AssetCard key={token.id} token={token} />
            ))}
          </section>
        </div>

        {/* Right Side: Terminal CLI */}
        <div className="lg:col-span-5 h-[600px] lg:h-full">
          <Terminal messages={messages} onCommand={handleCommand} isProcessing={isProcessing} />
        </div>

      </main>

      {/* Footer / PCB Traces decorative */}
      <footer className="h-8 flex items-center justify-between text-[10px] text-emerald-900 font-mono z-10">
        <div className="flex space-x-4">
          <span>LATENCY: 42ms</span>
          <span>UPTIME: 99.999%</span>
          <span>ENTROPY: 0.882741</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>SECURE CIRCUIT ESTABLISHED</span>
          <div className="w-1 h-1 bg-emerald-900 rounded-full animate-ping"></div>
        </div>
      </footer>
    </div>
  );
};

export default App;
