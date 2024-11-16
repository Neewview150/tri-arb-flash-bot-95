import { TradeHistory as TradeHistoryType } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge'; // Assuming a Badge component exists

interface TradeHistoryProps {
  trades: TradeHistoryType[];
}

export const TradeHistory = ({ trades }: TradeHistoryProps) => {
  const [tradeHistory, setTradeHistory] = useState<TradeHistoryType[]>(trades);

  useEffect(() => {
    const fetchTradeHistory = async () => {
      try {
        // Replace with actual API call or blockchain interaction
        const response = await fetch('/api/trade-history');
        const data = await response.json();
        setTradeHistory(data);
      } catch (error) {
        console.error('Error fetching trade history:', error);
      }
    };

    fetchTradeHistory();
  }, []);

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
            <TableHead>AI Recommended</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tradeHistory.map((trade) => (
            <TableRow key={trade.id}>
              <TableCell>
                <span className={trade.type === 'success' ? 'text-success' : 'text-destructive'}>
                  {trade.type.toUpperCase()}
                </span>
              </TableCell>
              <TableCell>${trade.profit.toFixed(2)}</TableCell>
              <TableCell>${trade.gasCost.toFixed(2)}</TableCell>
              <TableCell>{trade.timestamp.toLocaleTimeString()}</TableCell>
              <TableCell>
                {trade.aiRecommended && <Badge>AI</Badge>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
