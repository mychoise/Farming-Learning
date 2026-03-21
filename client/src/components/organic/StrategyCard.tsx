import type { LucideIcon } from 'lucide-react'

function StrategyCard({ label, name, amount, unit, icon: Icon, borderColor, badgeBg, badgeText }:{ label: string; name: string; amount: number; unit: string; icon: LucideIcon; borderColor: string; badgeBg: string; badgeText: string}) {
  return (
    <div className={`bg-white font-[font4]  rounded-2xl p-5 border-l-4 shadow-sm`} style={{ borderLeftColor: borderColor }}>
      <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: badgeText }}>
        {label}
      </p>
      <div className="flex items-end justify-between">
        <div className="flex  items-center gap-2">
          <div className="p-2 rounded-xl" style={{ backgroundColor: badgeBg }}>
            <Icon size={16} color={badgeText} />
          </div>
          <span className="text-lg font-bold text-stone-800">{name}</span>
        </div>
        <div className="text-right">
          <span className="text-3xl font-black text-stone-900">{amount}</span>
          <span className="text-sm font-semibold text-stone-500 ml-1">{unit}</span>
        </div>
      </div>
    </div>
  );
}

export default StrategyCard
