
import React, { useMemo } from 'react';

const PCBBackground: React.FC = () => {
  const lines = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => {
      const x1 = Math.random() * 100;
      const y1 = Math.random() * 100;
      const isVertical = Math.random() > 0.5;
      const length = 10 + Math.random() * 30;
      const x2 = isVertical ? x1 : x1 + length;
      const y2 = isVertical ? y1 + length : y1;
      
      return { x1, y1, x2, y2, id: i };
    });
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none opacity-20 z-0 overflow-hidden">
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        {lines.map((line) => (
          <React.Fragment key={line.id}>
            <line
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="#10b981"
              strokeWidth="0.1"
              className="animate-pulse"
              style={{ animationDelay: `${Math.random() * 5}s` }}
            />
            <circle
              cx={line.x1}
              cy={line.y1}
              r="0.3"
              fill="#34d399"
              className="animate-ping"
              style={{ animationDuration: '3s', animationDelay: `${Math.random() * 2}s` }}
            />
          </React.Fragment>
        ))}
        {/* Decorative Grid */}
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#10b981" strokeWidth="0.05" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
};

export default PCBBackground;
