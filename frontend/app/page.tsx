'use client';

import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import StatCard from '@/components/StatCard';
import { fetchStats, fetchTimeline, fetchTopIPs } from '@/lib/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Home() {
  const [stats, setStats] = useState<any>(null);
  const [timeline, setTimeline] = useState<any[]>([]);
  const [topIPs, setTopIPs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [statsData, timelineData, ipsData] = await Promise.all([
          fetchStats(),
          fetchTimeline(7),
          fetchTopIPs(10)
        ]);
        
        setStats(statsData);
        setTimeline(timelineData.data);
        setTopIPs(ipsData);
      } catch (err: any) {
        setError(err.message);
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-cyber-blue text-xl">Loading dashboard...</div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="card bg-red-500/10 border-red-500/30">
          <h2 className="text-xl font-bold text-red-400 mb-2">Connection Error</h2>
          <p className="text-gray-300">Unable to connect to API. Please ensure the backend is running.</p>
          <p className="text-sm text-gray-500 mt-2">Error: {error}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-cyber-blue mb-2">Cyber Observation Dashboard</h1>
          <p className="text-gray-400">Real-time monitoring of simulated security events</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Events" value={stats?.total_events || 0} icon="🔍" color="blue" />
          <StatCard title="Active Decoys" value={stats?.active_decoys || 0} icon="🎯" color="green" />
          <StatCard title="Unique IPs" value={stats?.unique_ips || 0} icon="🌐" color="purple" />
          <StatCard title="High Severity" value={stats?.high_severity_events || 0} icon="⚠️" color="pink" />
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold text-cyber-blue mb-6">Activity Timeline (Last 7 Days)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timeline}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="timestamp" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <YAxis stroke="#64748b" tick={{ fill: '#94a3b8' }} />
              <Tooltip contentStyle={{ backgroundColor: '#0a0e27', border: '1px solid #00d9ff', borderRadius: '8px' }} />
              <Line type="monotone" dataKey="count" stroke="#00d9ff" strokeWidth={2} dot={{ fill: '#00d9ff', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold text-cyber-blue mb-4">Top Source IPs</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-cyber-blue/20">
                  <th className="text-left py-3 px-4 text-gray-400">IP Address</th>
                  <th className="text-left py-3 px-4 text-gray-400">Country</th>
                  <th className="text-left py-3 px-4 text-gray-400">Events</th>
                </tr>
              </thead>
              <tbody>
                {topIPs.map((ip: any, idx: number) => (
                  <tr key={idx} className="border-b border-cyber-blue/10 hover:bg-cyber-blue/5">
                    <td className="py-3 px-4 font-mono">{ip.ip}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-cyber-dark rounded text-xs">{ip.country}</span>
                    </td>
                    <td className="py-3 px-4 font-bold text-cyber-green">{ip.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-gray-400 mb-2">Events (24h)</p>
              <p className="text-2xl font-bold text-cyber-green">{stats?.events_last_24h || 0}</p>
            </div>
            <div>
              <p className="text-gray-400 mb-2">Top Attack Type</p>
              <p className="text-2xl font-bold text-cyber-purple">{stats?.top_attack_type || 'N/A'}</p>
            </div>
            <div>
              <p className="text-gray-400 mb-2">Avg Risk Score</p>
              <p className="text-2xl font-bold text-cyber-pink">{stats?.average_risk_score || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
