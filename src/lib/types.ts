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

export interface TradeExecutionResult {
  success: boolean;
  error?: string;
}

export interface TradeOrder {
  authToken: string;
  pair: string;
  amount: number;
  type: string;
}

export interface DexTrade {
  id: string;
  tokenA: string;
  tokenB: string;
  amount: number;
  dexName: string;
  userAddress: string;
}

export interface DexTradeRequest {
  tokenA: string;
  tokenB: string;
  amount: number;
  dexName: string;
}

export interface DexTradeResponse {
  success: boolean;
  transactionHash?: string;
  error?: string;
}

export interface DexTradingPair {
  baseToken: string;
  quoteToken: string;
  dexName: string;
}

export interface DexOrderBookEntry {
  price: number;
  amount: number;
  side: 'buy' | 'sell';
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

export interface FlashLoanParameters {
  amount: number;
  interestRate: number;
  duration: number;
}

export interface FlashLoanResult {
  success: boolean;
  error?: string;
  transactionHash?: string;
}

export interface SimulationRequest {
  amount: string;
  tokens: string[];
  exchange?: string;
}
