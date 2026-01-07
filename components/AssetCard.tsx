
import React from 'react';
import { Token } from '../types';

interface AssetCardProps {
  token: Token;
}

const AssetCard: React.FC<AssetCardProps> = ({ token }) => {
  const value = token.balance * token.price;

  return (
    <div className="relative group overflow-hidden bg-slate-900/60 border border-emerald-800/30 rounded-lg p-4 transition-all hover:border-emerald-500/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]">
      {/* Circuit Trace Background */}
      <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 10H10V0M10 10L30 30M30 30H40V40M30 30V40" stroke={token.color} strokeWidth="2"/>
        </svg>
      </div>

      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-lg"
            style={{ backgroundColor: token.color, boxShadow: `0 0 10px ${token.color}44` }}
          >
            {token.symbol[0]}
          </div>
          <div>
            <h3 className="text-emerald-100 font-bold leading-tight">{token.name}</h3>
            <span className="text-xs text-emerald-500/70">{token.symbol}</span>
          </div>
        </div>
        <div className={`text-xs px-2 py-0.5 rounded border ${
          token.change24h >= 0 ? 'text-emerald-400 border-emerald-900 bg-emerald-950' : 'text-red-400 border-red-900 bg-red-950'
        }`}>
          {token.change24h >= 0 ? '+' : ''}{token.change24h}%
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span className="text-emerald-500/50">Balance:</span>
          <span className="text-emerald-100">{token.balance.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-emerald-500/50">Price:</span>
          <span className="text-emerald-100">${token.price.toLocaleString()}</span>
        </div>
        <div className="pt-3 border-t border-emerald-900/30 flex justify-between">
          <span className="text-xs uppercase tracking-wider text-emerald-500/30">Net Value</span>
          <span className="text-lg font-bold text-emerald-400">${value.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
        </div>
      </div>
    </div>
  );
};

export default AssetCard;
