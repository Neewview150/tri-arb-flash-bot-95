import { ArbitrageTable } from '@/components/ArbitrageTable';
import { PriceChart } from '@/components/PriceChart';
import { SimulationPanel } from '@/components/SimulationPanel';
import { TradeHistory } from '@/components/TradeHistory';
import { mockPriceData, mockTradeHistory } from '@/lib/mockData';
import { useState } from 'react';
import { requestFlashLoan, handleRepayment } from '@/services/flashLoanService';
import { executeTrade } from '@/services/tradeExecutionService';

const Index = () => {
const Index = () => {
  const [exchangeType, setExchangeType] = useState<'centralized' | 'decentralized'>('centralized');

  const handleExecuteTrade = async (params) => {
    try {
      const loanResult = await requestFlashLoan(params);
      if (loanResult.success) {
        const tradeResult = await executeTrade(params);
        if (tradeResult.success) {
          await handleRepayment(params);
        } else {
          console.error('Trade execution failed:', tradeResult.error);
        }
      } else {
        console.error('Flash loan request failed:', loanResult.error);
      }
    } catch (error) {
      console.error('Error during trade execution:', error);
    }
  };

  return (
    <div className="min-h-screen p-6 space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Triangular Arbitrage Bot</h1>
        <p className="text-muted-foreground">Flash Loan Powered Trading on Poloniex</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PriceChart data={mockPriceData} />
        </div>
        <div>
          <SimulationPanel exchangeType={exchangeType} setExchangeType={setExchangeType} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ArbitrageTable 
          exchangeType={exchangeType} 
          onExecuteTrade={handleExecuteTrade} 
        />
        <TradeHistory trades={mockTradeHistory} />
      </div>
    </div>
  );
};

export default Index;
