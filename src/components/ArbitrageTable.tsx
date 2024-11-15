import { useQuery } from '@tanstack/react-query';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { ArbitrageOpportunity } from '@/lib/types';

const fetchArbitrageOpportunities = async (): Promise<ArbitrageOpportunity[]> => {
  // Simulated API call - replace with actual API endpoint
  const response = await fetch('/api/arbitrage-opportunities');
  if (!response.ok) {
    throw new Error('Failed to fetch arbitrage opportunities');
  }
  return response.json();
};

export const ArbitrageTable = () => {
  const { toast } = useToast();

  const { data: opportunities, isLoading, error } = useQuery({
    queryKey: ['arbitrageOpportunities'],
    queryFn: fetchArbitrageOpportunities,
    refetchInterval: 5000 // Refetch every 5 seconds
  });

  if (isLoading) {
    return <div>Loading opportunities...</div>;
  }

  if (error) {
    return <div>Error loading opportunities</div>;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Token Path</TableHead>
            <TableHead>Profit %</TableHead>
            <TableHead>Est. Profit</TableHead>
            <TableHead>Gas Cost</TableHead>
            <TableHead>Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {opportunities?.map((opp) => (
            <TableRow key={opp.id}>
              <TableCell>{`${opp.tokenA} → ${opp.tokenB} → ${opp.tokenC}`}</TableCell>
              <TableCell>{opp.profitPercentage.toFixed(2)}%</TableCell>
              <TableCell>${opp.estimatedProfit.toFixed(2)}</TableCell>
              <TableCell>${opp.gasEstimate.toFixed(2)}</TableCell>
              <TableCell>{new Date(opp.timestamp).toLocaleTimeString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};