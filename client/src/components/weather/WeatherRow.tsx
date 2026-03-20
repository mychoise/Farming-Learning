import { CloudRain, Wind } from "lucide-react";
import RainBar from "./RainBar";

type WeatherItem = {
  day: string;
  high: number;
  low: number;
  condition: string;
  icon: string;
  rain: number;
  rainfall: number;
  wind: number;
  tag: string;
  tagColor: string;
  tagBg: string;
  gradient: string;
  iconBg: string;
};

type WeatherRowProps = {
  item: WeatherItem;
};

export default function WeatherRow({ item }: WeatherRowProps) {
  return (
    <div className="mb-2">
      <div className={`flex items-center gap-3 px-4 py-3.5 bg-gradient-to-r ${item.gradient} rounded-t-2xl border border-white/80`}>
        <div className="w-10 shrink-0">
          <span className="text-sm font-bold text-slate-700">{item.day}</span>
        </div>
        <div className={`w-11 h-11 rounded-xl ${item.iconBg} flex items-center justify-center text-xl shrink-0 shadow-sm`}>
            <img src={item.icon} alt={item.condition} className="w-12 h-12" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-1">
            <span className="text-base font-bold text-slate-800">{item.high}°</span>
            <span className="text-xs text-slate-400 font-medium">/ {item.low}°</span>
          </div>
          {/* <p className="text-xs text-slate-500 mt-0.5 truncate">{item.condition}</p> */}
        </div>
        <div className={`px-2.5 py-1 rounded-lg text-xs font-bold tracking-wider ${item.tagColor} ${item.tagBg} shrink-0`}>
          {item.tag}
        </div>
      </div>

      <div className="flex items-center justify-between px-4 py-2.5 bg-white/60 border-x border-b border-white/80 rounded-b-2xl">
        <RainBar percent={item.rain} />
        <div className="flex items-center gap-1.5">
          <CloudRain size={13} className="text-indigo-400" />
          <span className="text-xs text-slate-500 font-medium">{item.rainfall}mm</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Wind size={13} className="text-teal-400" />
          <span className="text-xs text-slate-500 font-medium">{item.wind}kph</span>
        </div>
      </div>
    </div>
  );
}
