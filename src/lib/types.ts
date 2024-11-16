export interface ArbitrageOpportunity {
  id: string;
  tokenA: string;
  tokenB: string;
  tokenC: string;
  profitPercentage: number;
  estimatedProfit: number;
  gasEstimate: number;
  timestamp: Date;
  exchange: string;
}

export interface TradeHistory {
  id: string;
  type: 'success' | 'failed';
  profit: number;
  gasCost: number;
  timestamp: Date;
  tokens: string[];
  duration?: number; // Duration of the trade in minutes
  slippage?: number; // Slippage percentage
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
  exchange?: string;
}

export interface MarketSummary {
  totalTrades: number;
  successfulTrades: number;
  failedTrades: number;
  averageProfit: number;
}

export interface QuickStats {
  totalTradesExecuted: number;
  successfulTrades: number;
  failedTrades: number;
  averageProfit: number;
}
