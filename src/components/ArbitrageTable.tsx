import { useQuery } from '@tanstack/react-query';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { ArbitrageOpportunity } from '@/lib/types';
import { Button } from '@/components/ui/button';

const fetchArbitrageOpportunities = async (): Promise<ArbitrageOpportunity[]> => {
  // Simulated API call - replace with actual API endpoint
  // This would fetch opportunities across all exchanges and trading pairs
  const exchanges = ['Binance', 'Poloniex', 'Kraken', 'Coinbase'];
  const symbols = ['BTC', 'ETH', 'USDT', 'BNB', 'XRP', 'SOL', 'DOT'];
  
  // Simulate fetching data from multiple exchanges
  const mockOpportunities: ArbitrageOpportunity[] = [];
  
  exchanges.forEach(exchange => {
    symbols.forEach((symbol, index) => {
      if (Math.random() > 0.8) { // Only show some opportunities for demo
        mockOpportunities.push({
          id: `${exchange}-${symbol}-${Date.now()}`,
          tokenA: symbol,
          tokenB: symbols[(index + 1) % symbols.length],
          tokenC: symbols[(index + 2) % symbols.length],
          profitPercentage: Math.random() * 2,
          estimatedProfit: Math.random() * 1000,
          gasEstimate: Math.random() * 100,
          timestamp: new Date(),
          exchange: exchange
        });
      }
    });
  });
  
  return mockOpportunities.sort((a, b) => b.profitPercentage - a.profitPercentage);
};

export const ArbitrageTable = () => {
  const { toast } = useToast();

  const { data: opportunities, isLoading, error } = useQuery({
    queryKey: ['arbitrageOpportunities'],
    queryFn: fetchArbitrageOpportunities,
    refetchInterval: 5000
  });

  const handleSimulate = (opportunity: ArbitrageOpportunity) => {
    // Dispatch event to update simulation panel
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
    toast({
      title: "Executing Trade",
      description: "Initiating real trade execution...",
    });
    
    // Here you would implement the actual trade execution
    // For demo purposes, we'll just show a success message
    setTimeout(() => {
      toast({
        title: "Trade Executed",
        description: `Successfully executed trade for ${opportunity.tokenA}-${opportunity.tokenB}-${opportunity.tokenC}`,
      });
    }, 2000);
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
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {opportunities?.map((opp) => (
            <TableRow key={opp.id}>
              <TableCell className="font-medium">{opp.exchange}</TableCell>
              <TableCell>{`${opp.tokenA} → ${opp.tokenB} → ${opp.tokenC}`}</TableCell>
              <TableCell className={opp.profitPercentage > 1 ? 'text-green-500' : ''}>
                {opp.profitPercentage.toFixed(2)}%
              </TableCell>
              <TableCell>${opp.estimatedProfit.toFixed(2)}</TableCell>
              <TableCell>${opp.gasEstimate.toFixed(2)}</TableCell>
              <TableCell>{new Date(opp.timestamp).toLocaleTimeString()}</TableCell>
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