import { ArbitrageTable } from '@/components/ArbitrageTable';
import { PriceChart } from '@/components/PriceChart';
import { SimulationPanel } from '@/components/SimulationPanel';
import { TradeHistory } from '@/components/TradeHistory';
import { mockPriceData, mockTradeHistory } from '@/lib/mockData';

const Index = () => {
  return (
    <div className="min-h-screen p-6 space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Triangular Arbitrage Bot</h1>
        <p className="text-muted-foreground">Flash Loan Powered Trading on Poloniex</p>
      </header>

      <section className="bg-secondary p-4 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-2">Market Summary</h2>
        <p className="text-sm">Current market conditions and trends will be displayed here.</p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PriceChart data={mockPriceData} />
        </div>
        <div>
          <SimulationPanel />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-secondary p-4 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-2">Quick Stats</h2>
          <ul className="text-sm space-y-1">
            <li>Total Trades Executed: 123</li>
            <li>Successful Trades: 100</li>
            <li>Failed Trades: 23</li>
            <li>Average Profit: $456.78</li>
          </ul>
        </div>
        <ArbitrageTable />
        <TradeHistory trades={mockTradeHistory} />
      </div>
    </div>
  );
};

export default Index;
