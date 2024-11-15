export interface ArbitrageOpportunity {
  id: string;
  tokenA: string;
  tokenB: string;
  tokenC: string;
  profitPercentage: number;
  estimatedProfit: number;
  gasEstimate: number;
  timestamp: Date;
}

export interface TradeHistory {
  id: string;
  type: 'success' | 'failed';
  profit: number;
  gasCost: number;
  timestamp: Date;
  tokens: string[];
}

export interface PriceData {
  timestamp: Date;
  price: number;
  symbol: string;
}

export interface SimulationResult {
  isProfit: boolean;
  estimatedProfit: number;
  gasCost: number;
  slippage: number;
  route: string[];
}

export interface SimulationRequest {
  amount: string;
  tokens: string[];
}