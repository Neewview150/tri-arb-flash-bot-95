import { PriceData } from '@/lib/types';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface PriceChartProps {
  data: PriceData[];
}

export const PriceChart = ({ data }: PriceChartProps) => {
  return (
    <div className="glass-panel p-4 h-[400px]">
      <h2 className="text-xl font-semibold mb-4">Price Chart</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
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
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};