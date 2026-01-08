
import React, { useMemo } from 'react';

const PCBBackground: React.FC = () => {
  // Generate more complex random traces for the background
  const traces = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => {
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;
      const length = 15 + Math.random() * 25;
      const horizontal = Math.random() > 0.5;
      const speed = 2 + Math.random() * 5;
      const delay = Math.random() * 5;
      
      return {
        id: i,
        x1: `${startX}%`,
        y1: `${startY}%`,
        x2: horizontal ? `${startX + length}%` : `${startX}%`,
        y2: horizontal ? `${startY}%` : `${startY + length}%`,
        opacity: 0.05 + Math.random() * 0.1,
        speed,
        delay,
        dashSize: 20 + Math.random() * 50
      };
    });
  }, []);

  const components = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      x: `${5 + Math.random() * 90}%`,
      y: `${5 + Math.random() * 90}%`,
      w: 40 + Math.random() * 100,
      h: 30 + Math.random() * 80,
      pulseDelay: Math.random() * 4
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 bg-[#030703]">
      <svg className="w-full h-full">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0a1a0a" strokeWidth="1"/>
            <circle cx="0" cy="0" r="1" fill="#0a1a0a" />
          </pattern>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Static PCB Trace Paths (Background) */}
        {traces.map((trace) => (
          <line 
            key={`bg-${trace.id}`}
            x1={trace.x1} y1={trace.y1} 
            x2={trace.x2} y2={trace.y2} 
            stroke="#1a331a" 
            strokeWidth="1.5" 
            strokeOpacity="0.3"
          />
        ))}

        {/* Animated 'Flowing' Traces */}
        {traces.map((trace) => (
          <g key={`anim-${trace.id}`}>
            <line 
              x1={trace.x1} y1={trace.y1} 
              x2={trace.x2} y2={trace.y2} 
              stroke="#00ff41" 
              strokeWidth="2" 
              strokeOpacity={trace.opacity * 2}
              strokeDasharray={trace.dashSize}
              filter="url(#glow)"
            >
              <animate 
                attributeName="stroke-dashoffset" 
                from={trace.dashSize * 2} 
                to="0" 
                dur={`${trace.speed}s`} 
                repeatCount="indefinite"
                begin={`${trace.delay}s`}
              />
            </line>
            
            {/* Connection Nodes */}
            <circle 
              cx={trace.x1} cy={trace.y1} 
              r="2.5" 
              fill="#00ff41" 
              fillOpacity={trace.opacity * 3}
            >
              <animate 
                attributeName="fill-opacity" 
                values={`${trace.opacity * 2}; ${trace.opacity * 5}; ${trace.opacity * 2}`} 
                dur="3s" 
                repeatCount="indefinite" 
              />
            </circle>
          </g>
        ))}

        {/* Microchip Components */}
        {components.map((comp) => (
          <g key={`comp-${comp.id}`} opacity="0.15">
            <rect 
              x={comp.x} y={comp.y} 
              width={comp.w} height={comp.h} 
              fill="none" 
              stroke="#1a331a" 
              strokeWidth="2"
            />
            <rect 
              x={comp.x} y={comp.y} 
              width={comp.w} height={comp.h} 
              fill="#0a1a0a" 
              stroke="none"
              opacity="0.5"
            />
            {/* Internal pulsing glow for chips */}
            <rect 
              x={comp.x} y={comp.y} 
              width={comp.w} height={comp.h} 
              fill="#00ff41" 
              stroke="none"
              opacity="0"
            >
              <animate 
                attributeName="opacity" 
                values="0; 0.1; 0" 
                dur="4s" 
                begin={`${comp.pulseDelay}s`}
                repeatCount="indefinite" 
              />
            </rect>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default PCBBackground;
