import { Thermometer } from "lucide-react";
import WeatherRow from "./WeatherRow";

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





export default function WeatherForecastPanel({item}) {
    console.log("item is ",item?.daily)
//   const weatherData: WeatherItem[] = [
//   { day: "Mon", high: item?.daily.temperature_max[0], low: 18, condition: "Sunny Day", icon: "☀️", rain: 5, rainfall: 0, wind: 12, tag: "GOOD SOWING", tagColor: "text-emerald-500", tagBg: "bg-emerald-50", gradient: "from-amber-100 to-orange-50", iconBg: "bg-amber-100" },
//   { day: "Tue", high: 24, low: 17, condition: "Mainly Cloudy", icon: "🌤️", rain: 15, rainfall: 0.2, wind: 18, tag: "IRRIGATE", tagColor: "text-sky-500", tagBg: "bg-sky-50", gradient: "from-sky-50 to-slate-50", iconBg: "bg-sky-100" },
//   { day: "Wed", high: 21, low: 15, condition: "Showers", icon: "🌧️", rain: 85, rainfall: 12, wind: 14, tag: "NO SPRAY", tagColor: "text-orange-500", tagBg: "bg-orange-50", gradient: "from-slate-100 to-blue-50", iconBg: "bg-slate-200" },
//   { day: "Thu", high: 20, low: 14, condition: "Thunderstorms", icon: "⛈️", rain: 95, rainfall: 25, wind: 45, tag: "STORM ALERT", tagColor: "text-red-500", tagBg: "bg-red-50", gradient: "from-slate-200 to-slate-100", iconBg: "bg-slate-300" },
//   { day: "Fri", high: 23, low: 16, condition: "Clearing", icon: "🌥️", rain: 20, rainfall: 1.5, wind: 20, tag: "SOIL PREP", tagColor: "text-teal-600", tagBg: "bg-teal-50", gradient: "from-blue-50 to-cyan-50", iconBg: "bg-blue-100" },
//   { day: "Sat", high: 25, low: 17, condition: "Partly Cloudy", icon: "⛅", rain: 10, rainfall: 0, wind: 10, tag: "GOOD SOWING", tagColor: "text-emerald-500", tagBg: "bg-emerald-50", gradient: "from-amber-50 to-yellow-50", iconBg: "bg-amber-100" },
//   { day: "Sun", high: 27, low: 19, condition: "Sunny Day", icon: "☀️", rain: 3, rainfall: 0, wind: 8, tag: "GOOD SOWING", tagColor: "text-emerald-500", tagBg: "bg-emerald-50", gradient: "from-amber-100 to-orange-50", iconBg: "bg-amber-100" },
// ];

const weatherColors = [
  {
    tagColor: "text-emerald-500",
    tagBg: "bg-emerald-50",
    gradient: "from-amber-100 to-orange-50",
    iconBg: "bg-amber-100",
  },
  {
    tagColor: "text-sky-500",
    tagBg: "bg-sky-50",
    gradient: "from-sky-50 to-slate-50",
    iconBg: "bg-sky-100",
  },
  {
    tagColor: "text-orange-500",
    tagBg: "bg-orange-50",
    gradient: "from-slate-100 to-blue-50",
    iconBg: "bg-slate-200",
  },
  {
    tagColor: "text-red-500",
    tagBg: "bg-red-50",
    gradient: "from-slate-200 to-slate-100",
    iconBg: "bg-slate-300",
  },
  {
    tagColor: "text-teal-600",
    tagBg: "bg-teal-50",
    gradient: "from-blue-50 to-cyan-50",
    iconBg: "bg-blue-100",
  },
  {
    tagColor: "text-emerald-500",
    tagBg: "bg-emerald-50",
    gradient: "from-amber-50 to-yellow-50",
    iconBg: "bg-amber-100",
  },
  {
    tagColor: "text-emerald-500",
    tagBg: "bg-emerald-50",
    gradient: "from-amber-100 to-orange-50",
    iconBg: "bg-amber-100",
  },
];


const weatherData = item?.daily?.time.map((_, index) => ({
  day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index],
  high: item?.daily.temperature_max[index],
  low: item?.daily.temperature_min[index],
  condition: "Condition", // Placeholder, replace with actual condition if available
  icon: item?.daily.icon_urls[index] || "☀️", // Placeholder, replace with actual icon based on condition
  rain: item?.daily.precipitation_probability_max[index] || 0,
  wind: item?.daily.wind_speed_max[index] || 0,
  tag:item?.daily.descriptions?.[index].en,
  tagColor:weatherColors[index].tagColor,
    tagBg:weatherColors[index].tagBg,
    gradient:weatherColors[index].gradient,
    iconBg:weatherColors[index].iconBg,
    rainfall: item?.daily.precipitation_sum[index] || 0,
}));
  return (
    <div className="mt-8 bg-white/90 backdrop-blur-sm rounded-3xl border border-white/80 shadow-xl overflow-hidden">
      <div className="px-5 pt-5 pb-3 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">7-Day Forecast</h2>
          <p className="text-xs text-slate-400 mt-0.5 font-medium">Agricultural Weather Index</p>
        </div>
        <div className="w-9 h-9 bg-linear-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center shadow-md">
          <Thermometer size={18} className="text-white" />
        </div>
      </div>

      <div className="px-3 pb-3">
        {weatherData?.map((item) => (
          <WeatherRow key={item.day} item={item} />
        ))}
      </div>
    </div>
  );
}
