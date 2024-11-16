import { useQuery } from '@tanstack/react-query';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { ArbitrageOpportunity } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { executeFlashLoan } from '@/services/flashLoanService';
import { ethers } from 'ethers';
import AIWorkflowAgent from '@/services/AIWorkflowAgent';

const fetchArbitrageOpportunities = async (): Promise<ArbitrageOpportunity[]> => {
  try {
    const response = await fetch('https://api.example.com/arbitrage-opportunities');
    if (!response.ok) {
      throw new Error('Failed to fetch arbitrage opportunities');
    }
    const data = await response.json();
    // Validate data structure
    if (!Array.isArray(data)) {
      throw new Error('Invalid data format');
    }
    return data.sort((a, b) => b.profitPercentage - a.profitPercentage);
  } catch (error) {
    console.error('Error fetching arbitrage opportunities:', error);
    return [];
  }
};

export const ArbitrageTable = () => {
  const { toast } = useToast();

  const aiAgent = new AIWorkflowAgent();
  const { data: opportunities, isLoading, error } = useQuery({
    queryKey: ['arbitrageOpportunities'],
    queryFn: fetchArbitrageOpportunities,
    refetchInterval: 5000
  });

  const recommendedOpportunities = aiAgent.analyzeArbitrage(opportunities || []);

  const handleSimulate = (opportunity: ArbitrageOpportunity) => {
    const event = new CustomEvent('simulateArbitrage', { 
      detail: {
        tokens: [opportunity.tokenA, opportunity.tokenB, opportunity.tokenC],
        exchange: opportunity.exchange
      }
    });
    window.dispatchEvent(event);
    
    toast({
      title: "Simulation Ready",
      description: "The trade has been loaded into the simulation panel",
    });
  };

  const handleExecute = async (opportunity: ArbitrageOpportunity) => {
    try {
      const providerUrl = import.meta.env.VITE_BLOCKCHAIN_PROVIDER_URL;
      const privateKey = import.meta.env.VITE_PRIVATE_KEY;

      if (!providerUrl) {
        toast({
          title: "Configuration Error",
          description: "Blockchain provider URL is not configured. Please set VITE_BLOCKCHAIN_PROVIDER_URL in your .env file.",
          variant: "destructive",
        });
        return;
      }

      if (!privateKey) {
        toast({
          title: "Configuration Error",
          description: "Private key is not configured. Please set VITE_PRIVATE_KEY in your .env file.",
          variant: "destructive",
        });
        return;
      }

      const netProfit = opportunity.estimatedProfit - opportunity.gasEstimate;
      if (netProfit <= 0) {
        toast({
          title: "Unprofitable Trade",
          description: "The trade is not profitable after considering gas costs.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Executing Trade",
        description: "Initiating real trade execution...",
      });

      const provider = new ethers.JsonRpcProvider(providerUrl);
      const signer = new ethers.Wallet(privateKey, provider);
      const amount = ethers.parseUnits('1000', 'ether');
      await executeFlashLoan(amount, [opportunity.tokenA, opportunity.tokenB, opportunity.tokenC], signer);

      toast({
        title: "Trade Executed",
        description: `Successfully executed trade for ${opportunity.tokenA}-${opportunity.tokenB}-${opportunity.tokenC}`,
      });
    } catch (error) {
      console.error('Error executing flash loan:', error);
      toast({
        title: "Execution Failed",
        description: error instanceof Error ? error.message : "There was an error executing the trade.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div className="text-center p-4">Scanning all exchanges for opportunities...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-destructive">Error loading opportunities</div>;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Exchange</TableHead>
            <TableHead>Token Path</TableHead>
            <TableHead>Profit %</TableHead>
            <TableHead>Est. Profit</TableHead>
            <TableHead>Gas Cost</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>AI Recommended</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {opportunities?.map((opp) => (
            <TableRow key={opp.id} className={recommendedOpportunities.includes(opp) ? 'bg-yellow-100' : ''}>
              <TableCell className="font-medium">{opp.exchange}</TableCell>
              <TableCell>{`${opp.tokenA} → ${opp.tokenB} → ${opp.tokenC}`}</TableCell>
              <TableCell className={opp.profitPercentage > 1 ? 'text-green-500' : ''}>
                {opp.profitPercentage.toFixed(2)}%
              </TableCell>
              <TableCell>${opp.estimatedProfit.toFixed(2)}</TableCell>
              <TableCell>${opp.gasEstimate.toFixed(2)}</TableCell>
              <TableCell>{new Date(opp.timestamp).toLocaleTimeString()}</TableCell>
              <TableCell>
                {recommendedOpportunities.includes(opp) ? 'Yes' : 'No'}
              </TableCell>
              <TableCell className="space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleSimulate(opp)}
                >
                  Simulate
                </Button>
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={() => handleExecute(opp)}
                >
                  Execute
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
