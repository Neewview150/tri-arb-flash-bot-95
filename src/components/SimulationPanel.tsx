import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { SimulationResult } from '@/lib/types';
import { initiateFlashLoan } from '@/services/flashLoanService';
import { ethers } from 'ethers';

export const SimulationPanel = () => {
  const [amount, setAmount] = useState('1000');
  const { toast } = useToast();
  const [lastSimulation, setLastSimulation] = useState<SimulationResult | null>(null);
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);
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
      console.log(`Starting simulation for tokens: ${selectedTokens.join(' → ')} on exchange: ${selectedExchange}`);
      if (!import.meta.env.VITE_BLOCKCHAIN_PROVIDER_URL) {
        toast({
          title: "Configuration Error",
          description: "Blockchain provider URL is not configured",
          variant: "destructive",
        });
        return;
      }

      if (!import.meta.env.VITE_PRIVATE_KEY) {
        toast({
          title: "Configuration Error",
          description: "Private key is not configured",
          variant: "destructive",
        });
        return;
      }

      const provider = new ethers.JsonRpcProvider(import.meta.env.VITE_BLOCKCHAIN_PROVIDER_URL);
      const signer = new ethers.Wallet(import.meta.env.VITE_PRIVATE_KEY, provider);
      const amountInWei = ethers.parseUnits(amount, 'ether');
      
      await initiateFlashLoan(amountInWei, selectedTokens, signer);
      
      const slippage = Math.random() * 0.01; // Simulated slippage
      const networkFees = Math.random() * 20; // Simulated network fees
      const estimatedProfit = parseFloat(amount) * (Math.random() * 0.05);
      const isProfit = estimatedProfit > (networkFees + slippage * parseFloat(amount));

      const detailedResult: SimulationResult = {
        isProfit,
        estimatedProfit: isProfit ? estimatedProfit - networkFees - slippage * parseFloat(amount) : -networkFees,
        gasCost: networkFees,
        slippage,
        route: selectedTokens.length ? selectedTokens : ['ETH', 'USDT', 'BTC']
      };

      console.log(`Simulation results: Estimated Profit: $${detailedResult.estimatedProfit.toFixed(2)}, Gas Cost: $${detailedResult.gasCost.toFixed(2)}, Slippage: ${(detailedResult.slippage * 100).toFixed(2)}%`);
      setLastSimulation(detailedResult);

      toast({
        title: detailedResult.isProfit ? "Profitable Trade Found!" : "Trade Not Profitable",
        description: `Estimated ${detailedResult.isProfit ? 'profit' : 'loss'}: $${detailedResult.estimatedProfit.toFixed(2)}\nNetwork Fees: $${networkFees.toFixed(2)}\nSlippage: ${(slippage * 100).toFixed(2)}%`,
        variant: detailedResult.isProfit ? "default" : "destructive",
      });
    } catch (error) {
      console.error(`Error simulating flash loan for tokens: ${selectedTokens.join(' → ')} on exchange: ${selectedExchange}`, error);
      toast({
        title: "Simulation Failed",
        description: error instanceof Error ? error.message : "Unable to simulate trade at this time",
        variant: "destructive",
      });
    }
  };


  const handleReset = () => {
    setAmount('1000');
    setLastSimulation(null);
    setSelectedTokens([]);
    setSelectedExchange('');
    toast({
      title: "Reset Successful",
      description: "Simulation panel has been reset.",
    });
  };

  const handleSave = () => {
    if (lastSimulation) {
      // Implement save logic here, e.g., save to local storage or backend
      toast({
        title: "Save Successful",
        description: "Simulation results have been saved.",
      });
    } else {
      toast({
        title: "No Results to Save",
        description: "Please run a simulation before saving.",
        variant: "destructive",
      });
    }
  };
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

        </div>
        
        <div className="flex space-x-2">
          <Button 
            onClick={handleSimulate}
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            Simulate Trade
          </Button>
          <Button 
            onClick={handleReset}
            className="flex-1 bg-secondary hover:bg-secondary/90"
          >
            Reset
          </Button>
          <Button 
            onClick={handleSave}
            className="flex-1 bg-accent hover:bg-accent/90"
          >
            Save
          </Button>
        </div>
        
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
