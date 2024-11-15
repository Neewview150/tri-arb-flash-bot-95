import { TradeHistory as TradeHistoryType } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface TradeHistoryProps {
  trades: TradeHistoryType[];
}

export const TradeHistory = ({ trades }: TradeHistoryProps) => {
  return (
    <div className="glass-panel p-4">
      <h2 className="text-xl font-semibold mb-4">Trade History</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>Profit/Loss</TableHead>
            <TableHead>Gas Cost</TableHead>
            <TableHead>Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trades.map((trade) => (
            <TableRow key={trade.id}>
              <TableCell>
                <span className={trade.type === 'success' ? 'text-success' : 'text-destructive'}>
                  {trade.type.toUpperCase()}
                </span>
              </TableCell>
              <TableCell>${trade.profit.toFixed(2)}</TableCell>
              <TableCell>${trade.gasCost.toFixed(2)}</TableCell>
              <TableCell>{trade.timestamp.toLocaleTimeString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};