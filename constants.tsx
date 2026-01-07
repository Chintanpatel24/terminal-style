
import React from 'react';
import { Token } from './types';

export const INITIAL_TOKENS: Token[] = [
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', price: 68420.50, balance: 0.45, change24h: 2.4, color: '#f7931a' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', price: 3540.12, balance: 12.5, change24h: -1.2, color: '#627eea' },
  { id: 'solana', symbol: 'SOL', name: 'Solana', price: 145.88, balance: 450.0, change24h: 8.7, color: '#14f195' },
  { id: 'cardano', symbol: 'ADA', name: 'Cardano', price: 0.45, balance: 15000.0, change24h: 0.5, color: '#0033ad' },
];

export const PCB_SVG_PATH = "M10 10 H 90 V 90 H 10 Z"; // Placeholder
