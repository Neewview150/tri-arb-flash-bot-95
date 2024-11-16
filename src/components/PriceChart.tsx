import { PriceData } from '@/lib/types';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Brush, CartesianGrid } from 'recharts';

interface PriceChartProps {
  data: PriceData[];
}

export const PriceChart = ({ data }: PriceChartProps) => {
  return (
    <div className="glass-panel p-4 h-[400px]">
      <h2 className="text-xl font-semibold mb-4">Price Chart</h2>
      <div className="flex justify-between mb-4">
        <button className="btn-filter">1H</button>
        <button className="btn-filter">24H</button>
        <button className="btn-filter">7D</button>
        <button className="btn-filter">1M</button>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis 
            dataKey="timestamp" 
            tickFormatter={(time) => new Date(time).toLocaleTimeString()}
            stroke="#ffffff40"
          />
          <YAxis stroke="#ffffff40" />
          <Tooltip 
            contentStyle={{ background: '#001B44', border: '1px solid #ffffff20' }}
          />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#0066FF" 
            strokeWidth={2}
            dot={false}
          />
          <Brush dataKey="timestamp" height={30} stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
