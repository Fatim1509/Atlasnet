'use client';

import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { fetchTimeline, fetchEvents } from '@/lib/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Timeline() {
  const [timeline, setTimeline] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [days, setDays] = useState(7);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [t, e] = await Promise.all([fetchTimeline(days), fetchEvents(20)]);
        setTimeline(t.data);
        setEvents(e);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [days]);

  if (loading) return <Layout><div className="text-center text-cyber-blue">Loading...</div></Layout>;

  return (
    <Layout>
      <div className="space-y-8">
        <h1 className="text-4xl font-bold text-cyber-blue">Event Timeline</h1>

        <div className="card">
          <div className="flex gap-4">
            {[1, 7, 30].map(d => (
              <button key={d} onClick={() => setDays(d)}
                className={`px-4 py-2 rounded ${days === d ? 'bg-cyber-blue text-cyber-dark' : 'bg-cyber-dark'}`}>
                {d === 1 ? '24h' : `${d}d`}
              </button>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold text-cyber-blue mb-6">Activity Over Time</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={timeline}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="timestamp" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} angle={-45} textAnchor="end" height={100} />
              <YAxis stroke="#64748b" />
              <Tooltip contentStyle={{ backgroundColor: '#0a0e27', border: '1px solid #00d9ff', borderRadius: '8px' }} />
              <Bar dataKey="count" fill="#00d9ff" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold text-cyber-blue mb-4">Recent Events</h2>
          <div className="space-y-3">
            {events.map((e: any) => (
              <div key={e.id} className="bg-cyber-darker p-4 rounded border border-cyber-blue/10">
                <div className="flex justify-between items-start">
                  <div>
                    <span className={`px-2 py-1 rounded text-xs ${
                      e.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                      e.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                      e.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>{e.severity}</span>
                    <span className="ml-2 text-cyber-purple">{e.event_type}</span>
                    <p className="text-gray-300 mt-2">{e.description}</p>
                    <p className="text-sm text-gray-500 mt-1">🌐 {e.source_ip} → 🎯 {e.target_service}</p>
                  </div>
                  <span className="text-sm text-gray-500">{new Date(e.timestamp).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
