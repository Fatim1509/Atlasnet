'use client';

import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { fetchBehavior, fetchHeatmap } from '@/lib/api';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = ['#00d9ff', '#9d4edd', '#ff006e', '#06ffa5', '#ffd60a', '#ff9e00'];

export default function Analysis() {
  const [behavior, setBehavior] = useState<any>(null);
  const [heatmap, setHeatmap] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [b, h] = await Promise.all([fetchBehavior(), fetchHeatmap()]);
        setBehavior(b);
        setHeatmap(h.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <Layout><div className="text-center text-cyber-blue">Loading...</div></Layout>;

  const pieData = behavior?.distributions.map((d: any) => ({ name: d.category, value: d.count })) || [];

  return (
    <Layout>
      <div className="space-y-8">
        <h1 className="text-4xl font-bold text-cyber-blue">Behavior Analysis</h1>

        <div className="card">
          <h2 className="text-2xl font-bold text-cyber-blue mb-6">Attack Distribution</h2>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={120} dataKey="value">
                {pieData.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#0a0e27', border: '1px solid #00d9ff', borderRadius: '8px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {behavior?.distributions.map((d: any, idx: number) => (
            <div key={idx} className="card">
              <h3 className="text-lg font-bold mb-4" style={{ color: COLORS[idx % COLORS.length] }}>
                {d.category}
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Count:</span>
                  <span className="font-bold text-cyber-blue">{d.count}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Percentage:</span>
                  <span className="font-bold text-cyber-green">{d.percentage}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold text-cyber-blue mb-4">Activity Heatmap</h2>
          <div className="overflow-x-auto">
            <div className="min-w-max">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                <div key={day} className="flex gap-1 mb-2">
                  <div className="w-24 text-sm text-gray-400 flex items-center">{day}</div>
                  {Array.from({ length: 24 }, (_, hour) => {
                    const cell = heatmap.find(h => h.day === day && h.hour === hour);
                    const value = cell?.value || 0;
                    const intensity = value > 0 ? Math.min(100, (value / 10) * 100) : 0;
                    return (
                      <div key={hour} className="w-6 h-6 rounded"
                        style={{ backgroundColor: value > 0 ? `rgba(0, 217, 255, ${intensity / 100})` : '#1e293b' }}
                        title={`${day} ${hour}:00 - ${value} events`} />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
