import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { SimulationResult } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';

export const SimulationPanel = () => {
  const [amount, setAmount] = useState('1000');
  const { toast } = useToast();
  const [lastSimulation, setLastSimulation] = useState<SimulationResult | null>(null);

  // Simulate a trade with the given amount
  const simulateTrade = async (amount: string): Promise<SimulationResult> => {
    // This would be replaced with your actual API call
    const response = await fetch('/api/simulate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, tokens: ['ETH', 'USDT', 'BTC'] })
    });
    
    if (!response.ok) {
      throw new Error('Simulation failed');
    }
    
    return response.json();
  };

  const handleSimulate = async () => {
    try {
      // For demo purposes, we'll create a mock simulation result
      const mockResult: SimulationResult = {
        isProfit: Math.random() > 0.5,
        estimatedProfit: parseFloat(amount) * (Math.random() * 0.05),
        gasCost: Math.random() * 50,
        slippage: Math.random() * 0.01,
        route: ['ETH', 'USDT', 'BTC']
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
        <Button 
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