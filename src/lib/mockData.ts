import { ArbitrageOpportunity, TradeHistory, PriceData } from './types';

export const mockArbitrageOpportunities: ArbitrageOpportunity[] = [
  {
    id: '1',
    tokenA: 'ETH',
    tokenB: 'USDT',
    tokenC: 'BTC',
    profitPercentage: 0.45,
    estimatedProfit: 123.45,
    gasEstimate: 45.67,
    timestamp: new Date(),
    exchange: 'Binance'
  },
  // Add more mock opportunities...
];

export const mockTradeHistory: TradeHistory[] = [
  {
    id: '1',
    type: 'success',
    profit: 234.56,
    gasCost: 23.45,
    timestamp: new Date(),
    tokens: ['ETH', 'USDT', 'BTC'],
  },
  // Add more mock history...
];

export const mockPriceData: PriceData[] = Array.from({ length: 100 }, (_, i) => ({
  timestamp: new Date(Date.now() - i * 60000),
  price: 1800 + Math.random() * 100,
  symbol: 'ETH',
}));
