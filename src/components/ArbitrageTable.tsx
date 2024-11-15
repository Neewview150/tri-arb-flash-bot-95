import { ArbitrageOpportunity } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';

const fetchArbitrageOpportunities = async (): Promise<ArbitrageOpportunity[]> => {
  // This would be replaced with your actual API call
  // For demo, we'll generate random opportunities
  return Array.from({ length: 5 }, (_, i) => ({
    id: `${i}`,
    tokenA: ['ETH', 'BTC', 'USDT'][Math.floor(Math.random() * 3)],
    tokenB: ['USDT', 'ETH', 'BTC'][Math.floor(Math.random() * 3)],
    tokenC: ['BTC', 'USDT', 'ETH'][Math.floor(Math.random() * 3)],
    profitPercentage: Math.random() * 2,
    estimatedProfit: Math.random() * 1000,
    gasEstimate: Math.random() * 100,
    timestamp: new Date(),
  }));
};

export const ArbitrageTable = () => {
  const { toast } = useToast();
  
  const { data: opportunities = [], isError, isLoading } = useQuery({
    queryKey: ['arbitrageOpportunities'],
    queryFn: fetchArbitrageOpportunities,
    refetchInterval: 5000, // Refetch every 5 seconds
    onSettled: () => {
      // Show toast on query settlement (success or error)
      toast({
        title: "Updated Opportunities",
        description: "Latest arbitrage opportunities loaded",
      });
    }
  });

  if (isLoading) {
    return (
      <div className="glass-panel p-4">
        <h2 className="text-xl font-semibold mb-4">Live Arbitrage Opportunities</h2>
        <p className="text-muted-foreground">Loading opportunities...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="glass-panel p-4">
        <h2 className="text-xl font-semibold mb-4">Live Arbitrage Opportunities</h2>
        <p className="text-destructive">Error loading opportunities</p>
      </div>
    );
  }

  return (
    <div className="glass-panel p-4">
      <h2 className="text-xl font-semibold mb-4">Live Arbitrage Opportunities</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Route</TableHead>
            <TableHead>Profit %</TableHead>
            <TableHead>Est. Profit</TableHead>
            <TableHead>Gas Cost</TableHead>
            <TableHead>Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {opportunities.map((op) => (
            <TableRow key={op.id}>
              <TableCell>{`${op.tokenA} → ${op.tokenB} → ${op.tokenC}`}</TableCell>
              <TableCell className="text-success">{op.profitPercentage.toFixed(2)}%</TableCell>
              <TableCell>${op.estimatedProfit.toFixed(2)}</TableCell>
              <TableCell>${op.gasEstimate.toFixed(2)}</TableCell>
              <TableCell>{op.timestamp.toLocaleTimeString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};