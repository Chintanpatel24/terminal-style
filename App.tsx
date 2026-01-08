
import React, { useState, useEffect } from 'react';
import Terminal from './components/Terminal';
import PCBBackground from './components/PCBBackground';
import { Cpu, Zap, Activity, HardDrive } from 'lucide-react';
import { SYSTEM_INFO } from './constants';

const App: React.FC = () => {
  const [loadProgress, setLoadProgress] = useState(0);
  const [isBooted, setIsBooted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsBooted(true), 800);
          return 100;
        }
        return prev + Math.floor(Math.random() * 12) + 4;
      });
    }, 120);
    return () => clearInterval(interval);
  }, []);

  if (!isBooted) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#030703] text-[#00ff41] font-mono p-4 overflow-hidden">
        <div className="crt-overlay" />
        <div className="scanline" />
        <div className="vignette" />
        <div className="w-full max-w-md relative z-10">
          <div className="mb-4 flex items-center justify-between text-xs font-bold tracking-widest glow-text">
            <span>[ SYSTEM_BOOT_SEQUENCE ]</span>
            <span>{Math.min(loadProgress, 100)}%</span>
          </div>
          <div className="h-4 w-full bg-[#0a1a0a] border border-[#00ff41]/30 overflow-hidden relative">
            <div 
              className="h-full bg-[#00ff41] shadow-[0_0_15px_#00ff41]" 
              style={{ width: `${Math.min(loadProgress, 100)}%`, transition: 'width 0.1s ease-out' }}
            />
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 opacity-70 text-[10px] tracking-tighter font-bold">
            <div className="flex items-center gap-2"><Cpu size={12} className="text-amber-500" /> CPU_INIT: OK</div>
            <div className="flex items-center gap-2"><Zap size={12} className="text-yellow-400" /> PWR_STABLE: OK</div>
            <div className="flex items-center gap-2"><Activity size={12} className="text-cyan-400" /> BUS_SYNC: OK</div>
            <div className="flex items-center gap-2"><HardDrive size={12} className="text-purple-400" /> DISK_MOUNT: OK</div>
          </div>
          <div className="mt-6 text-[9px] opacity-40 text-center uppercase animate-pulse">
            Establishing secure encrypted tunnel...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col text-[#00ff41] relative overflow-hidden bg-[#030703]">
      {/* CRT Visual Effects Layer */}
      <div className="crt-overlay" />
      <div className="crt-flicker" />
      <div className="scanline" />
      <div className="vignette" />
      
      <PCBBackground />
      
      {/* HUD Headers */}
      <header className="relative z-10 p-4 md:px-8 md:py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-black/60 border-b border-[#1a331a] backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-10 h-10 border border-[#00ff41] flex items-center justify-center bg-green-950/20">
              <Cpu size={20} className="animate-pulse" />
            </div>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping" />
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-bold tracking-tighter flex items-center gap-2 glow-text">
              CIRCUIT_TERM::ROOT
            </h1>
            <p className="text-[10px] opacity-60 mt-0.5 uppercase tracking-[0.2em] font-bold">
              Secure_Session // {SYSTEM_INFO.host}
            </p>
          </div>
        </div>
        
        <div className="flex gap-8 text-[10px] font-bold">
          <div className="flex flex-col border-l border-[#1a331a] pl-3">
            <span className="opacity-40 text-[8px]">CORE_KERNEL</span>
            <span className="text-amber-400">{SYSTEM_INFO.os.split(' ')[0]}</span>
          </div>
          <div className="flex flex-col border-l border-[#1a331a] pl-3">
            <span className="opacity-40 text-[8px]">ACTIVE_NODE</span>
            <span className="text-cyan-400">0xFF42A</span>
          </div>
          <div className="flex flex-col border-l border-[#1a331a] pl-3">
            <span className="opacity-40 text-[8px]">UPTIME</span>
            <span className="text-green-400 tabular-nums">{SYSTEM_INFO.uptime}</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 container mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch overflow-hidden">
        
        {/* Hardware Status Panel (Sidebar) */}
        <aside className="lg:col-span-3 flex flex-col gap-4">
          <div className="bg-black/60 border border-[#1a331a] p-4 rounded-sm flex-1">
            <h3 className="text-[10px] font-black mb-6 opacity-60 flex items-center gap-2 tracking-[0.3em] uppercase border-b border-[#1a331a] pb-2">
              <Activity size={12} /> System_Load
            </h3>
            <div className="space-y-6">
              <StatusMeter label="PROCESSOR_0" value={42} color="bg-green-500" />
              <StatusMeter label="MEMORY_BANK" value={78} color="bg-amber-500" />
              <StatusMeter label="IO_INTERFACE" value={91} color="bg-cyan-500" />
              <StatusMeter label="THERMAL_THROTTLE" value={34} max={100} color="bg-red-500" />
            </div>
            
            <div className="mt-8 border-t border-[#1a331a] pt-4">
              <div className="text-[10px] font-bold opacity-30 mb-2 uppercase tracking-widest">Signal_Graph</div>
              <div className="h-16 flex items-end gap-1 px-1">
                {[40, 70, 45, 90, 65, 30, 80, 50, 60, 85, 40, 75].map((h, i) => (
                  <div 
                    key={i} 
                    className="flex-1 bg-green-500/20 border-t border-green-500/50" 
                    style={{ height: `${h}%` }}
                  >
                    <div className="w-full h-full animate-pulse bg-green-500/10" style={{ animationDelay: `${i * 0.1}s` }} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-black/60 border border-[#1a331a] p-4 rounded-sm">
            <h3 className="text-[10px] font-black mb-2 opacity-60 uppercase tracking-[0.2em]">EVENT_MONITOR</h3>
            <div className="text-[9px] space-y-1 opacity-50 font-mono leading-tight">
              <div className="flex justify-between"><span>[08:12:01]</span> <span className="text-blue-400">NET_READY</span></div>
              <div className="flex justify-between"><span>[08:12:05]</span> <span className="text-green-400">AUTH_PASS</span></div>
              <div className="flex justify-between"><span>[08:13:22]</span> <span className="text-amber-400">CACHE_SYNC</span></div>
              <div className="flex justify-between"><span>[08:14:10]</span> <span className="text-green-400">SHELL_INIT</span></div>
              <div className="animate-pulse text-green-400 pt-1">_ BLINKING...</div>
            </div>
          </div>
        </aside>

        {/* Central Terminal Interface */}
        <div className="lg:col-span-9 flex flex-col h-full min-h-[500px]">
          <Terminal />
        </div>

      </main>

      {/* Footer Info */}
      <footer className="relative z-10 p-3 text-[9px] text-center opacity-30 uppercase tracking-[0.4em] border-t border-[#1a331a] mt-auto bg-black/40 backdrop-blur-sm">
        Terminal_v2.0_Revision_Delta // [ (c) 2024 ] // Silicon_Logic_Laboratories
      </footer>
    </div>
  );
};

interface StatusMeterProps {
  label: string;
  value: number;
  max?: number;
  color: string;
}

const StatusMeter: React.FC<StatusMeterProps> = ({ label, value, max = 100, color }) => (
  <div className="space-y-1.5">
    <div className="flex justify-between text-[9px] font-bold tracking-tighter">
      <span className="opacity-60">{label}</span>
      <span className="tabular-nums">{value}%</span>
    </div>
    <div className="h-1 w-full bg-[#0a1a0a] rounded-full overflow-hidden border border-[#1a331a]/30">
      <div 
        className={`h-full ${color} shadow-[0_0_8px_currentColor] transition-all duration-700 ease-in-out`}
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
  </div>
);

export default App;
