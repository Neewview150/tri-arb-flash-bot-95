import { TradeHistory as TradeHistoryType } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { TradeHistory as TradeHistoryType } from '@/lib/types';
import { fetchTradeHistory } from '@/lib/tradeHistoryApi';

export const TradeHistory = () => {
  const { data: trades, isLoading, error } = useQuery({
    queryKey: ['tradeHistory'],
    queryFn: fetchTradeHistory,
    refetchInterval: 10000, // Refetch every 10 seconds
  });

  if (isLoading) {
    return <div className="text-center p-4">Loading trade history...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-destructive">Error loading trade history</div>;
  }

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
            <TableHead>Exchange Type</TableHead>
            <TableHead>Flash Loan Amount</TableHead>
            <TableHead>Interest Rate</TableHead>
            <TableHead>Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trades?.map((trade) => (
            <TableRow key={trade.id}>
              <TableCell>
                <span className={trade.type === 'success' ? 'text-success' : 'text-destructive'}>
                  {trade.type.toUpperCase()}
                </span>
              </TableCell>
              <TableCell>${trade.profit.toFixed(2)}</TableCell>
              <TableCell>${trade.gasCost.toFixed(2)}</TableCell>
              <TableCell>{new Date(trade.timestamp).toLocaleTimeString()}</TableCell>
              <TableCell>{trade.exchangeType}</TableCell>
              <TableCell>${trade.flashLoanAmount.toFixed(2)}</TableCell>
              <TableCell>{trade.interestRate.toFixed(2)}%</TableCell>
              <TableCell>{trade.duration} blocks</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
