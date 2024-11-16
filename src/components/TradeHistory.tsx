import { TradeHistory as TradeHistoryType } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge'; // Assuming a Badge component exists
import { Button } from '@/components/ui/button'; // Assuming a Button component exists

interface TradeHistoryProps {
  trades: TradeHistoryType[];
}

export const TradeHistory = ({ trades }: TradeHistoryProps) => {
  const [tradeHistory, setTradeHistory] = useState<TradeHistoryType[]>(trades);
  const [sortBy, setSortBy] = useState<string>('timestamp');
  const [filterBy, setFilterBy] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchTradeHistory = async () => {
      try {
        // Replace with actual API call or blockchain interaction
        const response = await fetch('/api/trade-history');
        const data = await response.json();
        let filteredData = data;
        if (filterBy !== 'all') {
          filteredData = data.filter(trade => trade.type === filterBy);
        }
        filteredData.sort((a, b) => {
          if (sortBy === 'profit') {
            return b.profit - a.profit;
          } else if (sortBy === 'timestamp') {
            return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
          }
          return 0;
        });
        setTradeHistory(filteredData);
      } catch (error) {
        console.error('Error fetching trade history:', error);
      }
    };

    fetchTradeHistory();
  }, []);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterBy(event.target.value);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const paginatedTrades = tradeHistory.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="glass-panel p-4">
      <h2 className="text-xl font-semibold mb-4">Trade History</h2>
      <div className="flex justify-between mb-4">
        <div>
          <label htmlFor="sort" className="mr-2">Sort by:</label>
          <select id="sort" value={sortBy} onChange={handleSortChange}>
            <option value="timestamp">Date</option>
            <option value="profit">Profit</option>
          </select>
        </div>
        <div>
          <label htmlFor="filter" className="mr-2">Filter by:</label>
          <select id="filter" value={filterBy} onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="success">Success</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>Profit/Loss</TableHead>
            <TableHead>Gas Cost</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Trade Duration</TableHead>
            <TableHead>Slippage</TableHead>
            <TableHead>AI Recommended</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedTrades.map((trade) => (
            <TableRow key={trade.id}>
              <TableCell>
                <span className={trade.type === 'success' ? 'text-success' : 'text-destructive'}>
                  {trade.type.toUpperCase()}
                </span>
              </TableCell>
              <TableCell>${trade.profit.toFixed(2)}</TableCell>
              <TableCell>${trade.gasCost.toFixed(2)}</TableCell>
              <TableCell>{trade.timestamp.toLocaleTimeString()}</TableCell>
              <TableCell>{trade.duration ? `${trade.duration} mins` : 'N/A'}</TableCell>
              <TableCell>{trade.slippage ? `${trade.slippage.toFixed(2)}%` : 'N/A'}</TableCell>
              <TableCell>
                {trade.aiRecommended && <Badge>AI</Badge>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between mt-4">
        <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </Button>
        <span>Page {currentPage}</span>
        <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage * itemsPerPage >= tradeHistory.length}>
          Next
        </Button>
      </div>
    </div>
  );
};
