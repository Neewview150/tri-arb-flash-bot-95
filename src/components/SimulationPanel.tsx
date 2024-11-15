import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export const SimulationPanel = () => {
  const [amount, setAmount] = useState('1000');

  const handleSimulate = () => {
    // Simulation logic would go here
    console.log('Simulating trade with amount:', amount);
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
          />
        </div>
        <Button 
          onClick={handleSimulate}
          className="w-full bg-primary hover:bg-primary/90"
        >
          Simulate Trade
        </Button>
      </div>
    </div>
  );
};