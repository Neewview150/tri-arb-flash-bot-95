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
  {
    id: '2',
    tokenA: 'BTC',
    tokenB: 'ETH',
    tokenC: 'USDT',
    profitPercentage: 0.75,
    estimatedProfit: 200.00,
    gasEstimate: 50.00,
    timestamp: new Date(),
    exchange: 'Coinbase'
  },
  {
    id: '3',
    tokenA: 'XRP',
    tokenB: 'SOL',
    tokenC: 'DOT',
    profitPercentage: 1.25,
    estimatedProfit: 300.00,
    gasEstimate: 60.00,
    timestamp: new Date(),
    exchange: 'Kraken'
  },
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
  {
    id: '2',
    type: 'failed',
    profit: -50.00,
    gasCost: 20.00,
    timestamp: new Date(),
    tokens: ['BTC', 'ETH', 'USDT'],
    duration: 5,
    slippage: 0.02,
  },
  {
    id: '3',
    type: 'success',
    profit: 150.00,
    gasCost: 25.00,
    timestamp: new Date(),
    tokens: ['XRP', 'SOL', 'DOT'],
    duration: 10,
    slippage: 0.01,
  },
];

export const mockPriceData: PriceData[] = Array.from({ length: 100 }, (_, i) => ({
  timestamp: new Date(Date.now() - i * 60000),
  price: 1800 + Math.random() * 100,
  symbol: i % 2 === 0 ? 'ETH' : 'BTC',
}));

export const mockPriceDataXRP: PriceData[] = Array.from({ length: 100 }, (_, i) => ({
  timestamp: new Date(Date.now() - i * 60000),
  price: 0.5 + Math.random() * 0.1,
  symbol: 'XRP',
}));

export const mockPriceDataSOL: PriceData[] = Array.from({ length: 100 }, (_, i) => ({
  timestamp: new Date(Date.now() - i * 60000),
  price: 30 + Math.random() * 5,
  symbol: 'SOL',
}));
