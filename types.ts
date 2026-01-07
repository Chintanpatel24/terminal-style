
export interface Token {
  id: string;
  symbol: string;
  name: string;
  price: number;
  balance: number;
  change24h: number;
  color: string;
}

export interface Transaction {
  id: string;
  type: 'BUY' | 'SELL';
  token: string;
  amount: number;
  price: number;
  timestamp: number;
}

export interface TerminalMessage {
  id: string;
  content: string;
  type: 'SYSTEM' | 'USER' | 'AI' | 'ERROR';
  timestamp: number;
}
