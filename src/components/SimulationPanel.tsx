import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { SimulationResult } from '@/lib/types';
import { initiateFlashLoan } from '@/services/flashLoanService';
import AIWorkflowAgent from '@/services/AIWorkflowAgent';
import { ethers } from 'ethers';

export const SimulationPanel = () => {
  const [amount, setAmount] = useState('1000');
  const { toast } = useToast();
  const [lastSimulation, setLastSimulation] = useState<SimulationResult | null>(null);
  const [aiInsights, setAiInsights] = useState<{ recommendations: SimulationResult[], riskAssessment: string } | null>(null);
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

    const aiAgent = new AIWorkflowAgent();
    const opportunities = []; // Assume this is fetched or passed as props
    const insights = aiAgent.analyzeArbitrage(opportunities);
    setAiInsights({
      recommendations: insights,
      riskAssessment: aiAgent.provideSimulationInsights({ isProfit: true, estimatedProfit: 0, gasCost: 0, slippage: 0, route: [] })
    });
  }, []);

  const handleSimulate = async () => {
    try {
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
      console.error('Error simulating flash loan:', error);
      toast({
        title: "Simulation Failed",
        description: error instanceof Error ? error.message : "Unable to simulate trade at this time",
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
        
        {aiInsights && aiInsights.recommendations.length > 0 && (
          <div className="p-2 bg-secondary/20 rounded-lg">
            <h3 className="text-sm font-medium">AI Recommendations:</h3>
            <ul className="text-sm list-disc list-inside">
              {aiInsights.recommendations.map((rec, index) => (
                <li key={index}>
                  {rec.route.join(' → ')} - Expected Profit: ${rec.estimatedProfit.toFixed(2)}
                </li>
              ))}
            </ul>
            <p className="text-sm mt-2">Risk Assessment: {aiInsights.riskAssessment}</p>
          </div>
        )}

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
