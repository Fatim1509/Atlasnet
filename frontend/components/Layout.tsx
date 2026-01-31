import Link from 'next/link';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-cyber-darker">
      <header className="bg-cyber-dark border-b border-cyber-blue/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-cyber-blue rounded-lg flex items-center justify-center">
                <span className="text-cyber-dark font-bold text-xl">A</span>
              </div>
              <h1 className="text-2xl font-bold text-cyber-blue">AtlasNet</h1>
            </Link>
            
            <nav className="flex gap-4 md:gap-6 flex-wrap">
              <Link href="/" className="text-gray-300 hover:text-cyber-blue transition-colors text-sm md:text-base">
                Dashboard
              </Link>
              <Link href="/timeline" className="text-gray-300 hover:text-cyber-blue transition-colors text-sm md:text-base">
                Timeline
              </Link>
              <Link href="/analysis" className="text-gray-300 hover:text-cyber-blue transition-colors text-sm md:text-base">
                Analysis
              </Link>
              <Link href="/replay" className="text-gray-300 hover:text-cyber-blue transition-colors text-sm md:text-base">
                Replay
              </Link>
              <Link href="/about" className="text-gray-300 hover:text-cyber-blue transition-colors text-sm md:text-base">
                About
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-cyber-dark border-t border-cyber-blue/20 mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-gray-400 text-sm">
          <p>AtlasNet v2.0.0 - Zero-Config Deployment</p>
          <p className="mt-2">Educational purposes only</p>
        </div>
      </footer>
    </div>
  );
}
