import { ArbitrageOpportunity } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface ArbitrageTableProps {
  opportunities: ArbitrageOpportunity[];
}

export const ArbitrageTable = ({ opportunities }: ArbitrageTableProps) => {
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