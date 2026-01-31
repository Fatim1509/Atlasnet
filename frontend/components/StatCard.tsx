interface StatCardProps {
  title: string;
  value: string | number;
  icon?: string;
  color?: 'blue' | 'green' | 'pink' | 'purple';
}

export default function StatCard({ title, value, icon, color = 'blue' }: StatCardProps) {
  const colors = {
    blue: 'border-cyber-blue text-cyber-blue',
    green: 'border-cyber-green text-cyber-green',
    pink: 'border-cyber-pink text-cyber-pink',
    purple: 'border-cyber-purple text-cyber-purple',
  };

  return (
    <div className={`card border-l-4 ${colors[color]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm uppercase">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        {icon && <div className="text-4xl opacity-50">{icon}</div>}
      </div>
    </div>
  );
}
