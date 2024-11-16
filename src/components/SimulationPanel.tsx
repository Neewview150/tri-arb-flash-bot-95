import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectItem } from '@/components/ui/select';
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { SimulationResult } from '@/lib/types';

export const SimulationPanel = () => {
  const [amount, setAmount] = useState('1000');
  const { toast } = useToast();
  const [lastSimulation, setLastSimulation] = useState<SimulationResult | null>(null);
  const [selectedTokens, setSelectedTokens] = useState<{ tokenA: string; tokenB: string; tokenC: string }>({ tokenA: 'ETH', tokenB: 'USDT', tokenC: 'BTC' });
  const [selectedExchange, setSelectedExchange] = useState<string>('');

  useEffect(() => {
    const handleSimulateArbitrage = (event: CustomEvent) => {
      setSelectedTokens(event.detail.tokens);
      setSelectedExchange(event.detail.exchange);
    };

    window.addEventListener('simulateArbitrage', handleSimulateArbitrage as EventListener);
    
    return () => {
      window.removeEventListener('simulateArbitrage', handleSimulateArbitrage as EventListener);
    };
  }, []);

  const handleSimulate = async () => {
    try {
      // For demo purposes, we'll create a mock simulation result
      const mockResult: SimulationResult = {
        isProfit: Math.random() > 0.5,
        estimatedProfit: parseFloat(amount) * (Math.random() * 0.05),
        gasCost: Math.random() * 50,
        slippage: Math.random() * 0.01,
        route: selectedTokens.length ? selectedTokens : ['ETH', 'USDT', 'BTC']
      };
      
      setLastSimulation(mockResult);
      
      toast({
        title: mockResult.isProfit ? "Profitable Trade Found!" : "Trade Not Profitable",
        description: `Estimated ${mockResult.isProfit ? 'profit' : 'loss'}: $${mockResult.estimatedProfit.toFixed(2)}`,
        variant: mockResult.isProfit ? "default" : "destructive",
      });
    } catch (error) {
      toast({
        title: "Simulation Failed",
        description: "Unable to simulate trade at this time",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="glass-panel p-4">
      <h2 className="text-xl font-semibold mb-4">Trade Simulation</h2>
      <div className="space-y-4">
        {selectedTokens.length > 0 && (
          <div className="p-2 bg-secondary/20 rounded-lg">
            <p className="text-sm font-medium">Selected Route:</p>
            <p className="text-sm">{selectedTokens.join(' → ')}</p>
            {selectedExchange && (
              <p className="text-sm mt-1">Exchange: {selectedExchange}</p>
            )}
          </div>
        )}
        
        <div>
          <label className="block text-sm mb-2">Flash Loan Amount (USDT)</label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full"
            min="0"
          />
        </div>
        
        <div>
          <label className="block text-sm mb-2">Select Tokens</label>
          <div className="flex space-x-2">
            <Select value={selectedTokens.tokenA} onValueChange={(value) => setSelectedTokens((prev) => ({ ...prev, tokenA: value }))}>
              <SelectItem value="ETH">ETH</SelectItem>
              <SelectItem value="BTC">BTC</SelectItem>
              <SelectItem value="USDT">USDT</SelectItem>
              <SelectItem value="BNB">BNB</SelectItem>
            </Select>
            <Select value={selectedTokens.tokenB} onValueChange={(value) => setSelectedTokens((prev) => ({ ...prev, tokenB: value }))}>
              <SelectItem value="ETH">ETH</SelectItem>
              <SelectItem value="BTC">BTC</SelectItem>
              <SelectItem value="USDT">USDT</SelectItem>
              <SelectItem value="BNB">BNB</SelectItem>
            </Select>
            <Select value={selectedTokens.tokenC} onValueChange={(value) => setSelectedTokens((prev) => ({ ...prev, tokenC: value }))}>
              <SelectItem value="ETH">ETH</SelectItem>
              <SelectItem value="BTC">BTC</SelectItem>
              <SelectItem value="USDT">USDT</SelectItem>
              <SelectItem value="BNB">BNB</SelectItem>
            </Select>
          </div>
        </div>
          onClick={handleSimulate}
          className="w-full bg-primary hover:bg-primary/90"
        >
          Simulate Trade
        </Button>
        
        {lastSimulation && (
          <div className="mt-4 p-4 rounded-lg bg-secondary/50">
            <h3 className="font-medium mb-2">Last Simulation Results</h3>
            <div className="space-y-2 text-sm">
              <p>Route: {lastSimulation.route.join(' → ')}</p>
              <p className={lastSimulation.isProfit ? 'text-success' : 'text-destructive'}>
                Profit/Loss: ${lastSimulation.estimatedProfit.toFixed(2)}
              </p>
              <p>Gas Cost: ${lastSimulation.gasCost.toFixed(2)}</p>
              <p>Slippage: {(lastSimulation.slippage * 100).toFixed(2)}%</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
