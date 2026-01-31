'use client';

import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { fetchReplay } from '@/lib/api';

export default function Replay() {
  const [replay, setReplay] = useState<any>(null);
  const [step, setStep] = useState(0);
  const [scenario, setScenario] = useState('brute_force');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchReplay(scenario);
        setReplay(data);
        setStep(0);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, [scenario]);

  if (!replay) return <Layout><div className="text-center text-cyber-blue">Loading...</div></Layout>;

  const current = replay.steps[step];

  return (
    <Layout>
      <div className="space-y-8">
        <h1 className="text-4xl font-bold text-cyber-blue">Attack Replay</h1>

        <div className="card">
          <div className="flex gap-4 flex-wrap">
            {['brute_force', 'reconnaissance', 'fuzzing', 'dos_attempt'].map(s => (
              <button key={s} onClick={() => setScenario(s)}
                className={`px-4 py-2 rounded ${scenario === s ? 'bg-cyber-blue text-cyber-dark' : 'bg-cyber-dark'}`}>
                {s.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="card bg-gradient-to-r from-cyber-blue/10 to-cyber-purple/10 border-cyber-blue">
          <h2 className="text-2xl font-bold text-cyber-blue mb-2">{replay.scenario_name}</h2>
          <p className="text-gray-300">{replay.scenario_description}</p>
          <p className="text-sm text-gray-400 mt-2">Step {step + 1} of {replay.total_steps}</p>
        </div>

        <div className="card">
          <div className="w-full bg-cyber-darker h-2 rounded mb-4">
            <div className="h-full bg-cyber-blue transition-all" 
              style={{ width: `${((step + 1) / replay.total_steps) * 100}%` }} />
          </div>
        </div>

        {current && (
          <div className="card border-2 border-cyber-blue/40">
            <div className="flex justify-between mb-4">
              <h3 className="text-2xl font-bold text-cyber-blue">Step {current.step}</h3>
              <span className={`px-3 py-1 rounded ${
                current.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                current.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                'bg-yellow-500/20 text-yellow-400'
              }`}>{current.severity}</span>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-gray-400">Event Type</p>
                <p className="text-xl font-semibold text-cyber-purple">{current.event_type}</p>
              </div>
              <div>
                <p className="text-gray-400">Risk Score</p>
                <p className="text-xl font-semibold text-cyber-pink">{current.risk_score}/100</p>
              </div>
              <div>
                <p className="text-gray-400">Source IP</p>
                <p className="text-xl font-mono text-cyber-green">{current.source_ip}</p>
              </div>
              <div>
                <p className="text-gray-400">Target</p>
                <p className="text-xl font-semibold text-cyber-blue">{current.target_service}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-bold text-cyber-blue mb-2">🔍 What Happened</h4>
                <p className="text-gray-300 bg-cyber-darker p-4 rounded">{current.description}</p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-cyber-green mb-2">📚 Educational Note</h4>
                <p className="text-gray-300 bg-cyber-darker p-4 rounded">{current.educational_note}</p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-cyber-purple mb-2">🛡️ Mitigation</h4>
                <p className="text-gray-300 bg-cyber-darker p-4 rounded">{current.mitigation_tip}</p>
              </div>
            </div>
          </div>
        )}

        <div className="card">
          <div className="flex gap-4 justify-center">
            <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}
              className="px-6 py-3 bg-cyber-dark rounded disabled:opacity-50">← Previous</button>
            <button onClick={() => setStep(0)}
              className="px-6 py-3 bg-cyber-dark rounded">↻ Restart</button>
            <button onClick={() => setStep(Math.min(replay.total_steps - 1, step + 1))} 
              disabled={step === replay.total_steps - 1}
              className="px-6 py-3 bg-cyber-blue text-cyber-dark rounded disabled:opacity-50">Next →</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
