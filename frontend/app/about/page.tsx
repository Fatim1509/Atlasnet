'use client';

import Layout from '@/components/Layout';

export default function About() {
  return (
    <Layout>
      <div className="space-y-8 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-cyber-blue">About AtlasNet</h1>

        <div className="card">
          <h2 className="text-2xl font-bold text-cyber-blue mb-4">🎯 Project Overview</h2>
          <p className="text-gray-300 mb-4">
            AtlasNet is an educational cybersecurity observation platform designed to help students, 
            researchers, and security professionals understand attack patterns through safe, simulated environments.
          </p>
          <p className="text-gray-300">
            This zero-config version uses in-memory data storage for instant deployment to Railway and Vercel 
            with no database setup required.
          </p>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold text-cyber-blue mb-4">✨ Key Features</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-cyber-darker p-4 rounded">
              <h3 className="text-lg font-semibold text-cyber-green mb-2">📊 Real-time Dashboard</h3>
              <p className="text-gray-400 text-sm">Live statistics and activity monitoring</p>
            </div>
            <div className="bg-cyber-darker p-4 rounded">
              <h3 className="text-lg font-semibold text-cyber-purple mb-2">⏱️ Timeline Analysis</h3>
              <p className="text-gray-400 text-sm">Chronological event visualization</p>
            </div>
            <div className="bg-cyber-darker p-4 rounded">
              <h3 className="text-lg font-semibold text-cyber-pink mb-2">🔍 Behavior Classification</h3>
              <p className="text-gray-400 text-sm">AI-powered attack pattern categorization</p>
            </div>
            <div className="bg-cyber-darker p-4 rounded">
              <h3 className="text-lg font-semibold text-cyber-blue mb-2">🎓 Educational Replay</h3>
              <p className="text-gray-400 text-sm">Step-by-step attack walkthroughs</p>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold text-cyber-blue mb-4">🛠️ Technology Stack</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-cyber-green mb-3">Backend</h3>
              <ul className="text-gray-400 space-y-1 text-sm">
                <li>• Python 3.11</li>
                <li>• FastAPI</li>
                <li>• In-memory storage</li>
                <li>• Railway-ready</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-cyber-purple mb-3">Frontend</h3>
              <ul className="text-gray-400 space-y-1 text-sm">
                <li>• Next.js 14</li>
                <li>• React 18</li>
                <li>• TypeScript</li>
                <li>• Tailwind CSS</li>
                <li>• Recharts</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-cyber-pink mb-3">Deployment</h3>
              <ul className="text-gray-400 space-y-1 text-sm">
                <li>• Vercel (Frontend)</li>
                <li>• Railway (Backend)</li>
                <li>• Zero-config</li>
                <li>• No database</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="card bg-yellow-500/10 border-yellow-500/30">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">⚠️ Ethical & Legal Scope</h2>
          <div className="space-y-3 text-gray-300">
            <p><strong className="text-yellow-300">Educational Purpose Only:</strong> AtlasNet is designed exclusively for learning and research.</p>
            <p><strong className="text-yellow-300">No Offensive Capabilities:</strong> This platform does not provide tools for attacking systems.</p>
            <p><strong className="text-yellow-300">Simulated Data:</strong> All events are generated for demonstration purposes.</p>
          </div>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold text-cyber-blue mb-4">🚀 Quick Deploy</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-cyber-green mb-2">Backend (Railway)</h3>
              <p className="text-sm text-gray-400">1. Push to GitHub<br/>2. Import to Railway<br/>3. Deploy!</p>
            </div>
            <div>
              <h3 className="font-semibold text-cyber-purple mb-2">Frontend (Vercel)</h3>
              <p className="text-sm text-gray-400">1. Push to GitHub<br/>2. Import to Vercel<br/>3. Set NEXT_PUBLIC_API_URL<br/>4. Deploy!</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
