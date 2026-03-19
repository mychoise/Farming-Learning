import { Droplets } from "lucide-react";

type RainBarProps = {
  percent: number;
};

export default function RainBar({ percent }: RainBarProps) {
  const barWidth =
    percent >= 90 ? "w-full" :
    percent >= 75 ? "w-4/5" :
    percent >= 50 ? "w-3/5" :
    percent >= 30 ? "w-2/5" :
    percent >= 15 ? "w-1/4" :
    "w-1/12";

  return (
    <div className="flex items-center gap-1.5">
      <Droplets size={13} className="text-blue-400 shrink-0" />
      <div className="w-10 h-1.5 bg-blue-100 rounded-full overflow-hidden">
        <div className={`h-full bg-blue-400 rounded-full ${barWidth}`} />
      </div>
      <span className="text-xs text-slate-500 font-medium w-7">{percent}%</span>
    </div>
  );
}
