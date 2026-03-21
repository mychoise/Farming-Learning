import { useEffect, useRef, useState } from "react";
import {
  CloudRain,
  FlaskConical,
  MoveRight,
  Sun,
  ChevronLeft,
  ChevronRight,
  SlidersVertical,
  Info,
  MapPin,
  TriangleAlert,
  Sprout,
  Locate,
  Search,
} from "lucide-react";
import WeatherForecastPanel from "../components/weather/WeatherForecastPanel";
import { useQuery } from "@tanstack/react-query";
import { getMyWeather } from "../api/api";
import type { WeatherData } from "../api/api";


const Weather = () => {

  const [coords, setCoords] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  const [placeName, setplaceName] = useState<string>("");

const {data , isLoading} = useQuery<WeatherData>({
    queryKey:["my-weather" , coords],
    queryFn:()=>getMyWeather({ lat: coords!.lat, lon: coords!.lon }),
    enabled:!!coords, // Only run query when coords are available
    staleTime: 1000 * 60 * 60, // 1 hour
})

console.log("weather data is ", data)


  function getMyLocation() {
    if (!navigator.geolocation) {
      console.log("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Location error:", error);
      })
}

useEffect(() => {
 getMyLocation();
}, []);

const searchHandler = async(placeName: string) => {
    if(placeName.trim() === "") return;
const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(placeName)}&format=json&limit=1`);
const res= await response.json();
setCoords({
    lat: parseFloat(res[0].lat),
    lon: parseFloat(res[0].lon),
})
}



  const weatherDetails = [
    {
      name: "Humidity",
      icon: <FlaskConical size={22} className="text-blue-500" />,
      bg: "bg-blue-50",
      value: `${data?.current.relative_humidity_2m || 0}%`,
    },
    {
      name: "Wind",
      icon: <MoveRight size={22} className="text-teal-500" />,
      bg: "bg-teal-50",
      value: `${data?.current.wind_speed_10m || 0} m/s`,
    },
    {
      name: "Precip.",
      icon: <CloudRain size={22} className="text-indigo-500" />,
      bg: "bg-indigo-50",
      value: data?.current.precipitation || 0,
    },
    {
      name: "Rain",
      icon: <Sun size={22} className="text-amber-500" />,
      bg: "bg-amber-50",
      value: data?.current.rain || 0,
    },
  ];
  function formatHour(iso:string) {
  return  new Date(iso).toLocaleTimeString("en-GB", {
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
  });
}

const now = new Date().getHours();

 const WeatherHourDetail1 = (() => {
  const mapped = data?.hourly.time.map((time: string, index: number) => ({
    time: formatHour(time),
    temp: data?.hourly.temperature_2m[index],
    image: data?.hourly.icon_urls[index],
    hour: new Date(time).getHours(),
  }));

  const currentIndex = mapped?.findIndex((item:any) => item.hour === now);

  return mapped?.slice(currentIndex); // 👈 start from current hour, keep everything after
})();



  const SoilTemperatureValue = [
    {
        name:'Surface Temperature',
        Depth:'0cm',
        Temperature:data?.current.soil_temperature_0cm + '°C',
        color:'#F97316',
        background:"#FEF9F2"
    },
    {
        name:'Root Zone(Shallow)',
        Depth:'6cm',
        Temperature:data?.current.soil_temperature_6cm + '°C',
        color:'#10B981',
        background:"#F3FCF7"
    },
    {
        name:'Deep Root Zone',
        Depth:'18cm',
        Temperature:data?.current.soil_temperature_18cm + '°C',
        color:'#3B82F6',
        background:"#F3FBFE"
    }
  ]

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === "left" ? -160 : 160,
        behavior: "smooth",
      });
    }
  };



  return (
<>
{isLoading ? (
  // Loading Animation
<div className="flex flex-col items-center justify-center min-h-screen bg-[#F8FAFC] gap-8">
  <style>{`
    @keyframes sunPulse {
      0%, 100% { transform: translateX(-50%) scale(1); }
      50% { transform: translateX(-50%) scale(1.08); }
    }
    @keyframes rayRotate { to { transform: rotate(360deg); } }
    @keyframes cloudFloat {
      0%, 100% { transform: translateX(-50%) translateY(0); }
      50% { transform: translateX(-50%) translateY(-6px); }
    }
    @keyframes rainFall {
      0% { opacity: 0; transform: translateY(-4px); }
      30% { opacity: 1; }
      100% { opacity: 0; transform: translateY(18px); }
    }
    @keyframes barGrow {
      0%, 100% { height: 8px; opacity: 0.35; }
      50% { height: 28px; opacity: 1; }
    }
    @keyframes dotBlink {
      0%, 80%, 100% { opacity: 0.3; }
      40% { opacity: 1; }
    }

    .sun {
      position: absolute;
      top: 10px;
      left: 50%;
      width: 52px;
      height: 52px;
      border-radius: 50%;
      background: #F59E0B;
      animation: sunPulse 2.4s ease-in-out infinite;
    }
    .sun::before {
      content: '';
      position: absolute;
      inset: -10px;
      border-radius: 50%;
      border: 3px solid #FCD34D;
      opacity: 0.4;
      animation: rayRotate 6s linear infinite;
    }
    .sun::after {
      content: '';
      position: absolute;
      inset: -18px;
      border-radius: 50%;
      border: 2px dashed #FDE68A;
      opacity: 0.25;
      animation: rayRotate 9s linear infinite reverse;
    }
    .cloud-main {
      position: absolute;
      bottom: 16px;
      left: 50%;
      width: 96px;
      height: 36px;
      border-radius: 18px;
      background: white;
      border: 1px solid #e2e8f0;
      animation: cloudFloat 3s ease-in-out infinite;
    }
    .cloud-main::before {
      content: '';
      position: absolute;
      top: -18px;
      left: 14px;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: white;
      border: 1px solid #e2e8f0;
    }
    .cloud-main::after {
      content: '';
      position: absolute;
      top: -10px;
      left: 42px;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: white;
      border: 1px solid #e2e8f0;
    }
    .rain-drop {
      width: 3px;
      height: 10px;
      border-radius: 2px;
      background: #60A5FA;
      opacity: 0;
      animation: rainFall 1.4s ease-in infinite;
    }
    .loading-bar {
      width: 6px;
      border-radius: 3px;
      background: #cbd5e1;
      animation: barGrow 1.4s ease-in-out infinite;
    }
    .dot {
      display: inline-block;
      animation: dotBlink 1.2s ease-in-out infinite;
    }
  `}</style>

  {/* Scene */}
  <div className="relative w-40 h-30">
    <div className="sun" />
    <div className="cloud-main">
      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex gap-2.5">
        {[0, 0.22, 0.44, 0.14, 0.36].map((delay, i) => (
          <div key={i} className="rain-drop" style={{ animationDelay: `${delay}s` }} />
        ))}
      </div>
    </div>
  </div>

  {/* Bars */}
  <div className="flex items-end gap-1.5 h-7">
    {[0, 0.12, 0.24, 0.36, 0.48, 0.6, 0.72].map((delay, i) => (
      <div key={i} className="loading-bar" style={{ animationDelay: `${delay}s` }} />
    ))}
  </div>

  {/* Label */}
  <p className="text-sm text-slate-400 tracking-wide">
    Fetching weather data
    <span className="dot" style={{ animationDelay: "0s" }}>.</span>
    <span className="dot" style={{ animationDelay: "0.2s" }}>.</span>
    <span className="dot" style={{ animationDelay: "0.4s" }}>.</span>
  </p>
</div>
) : (
  data ? (
   <div className=" pt-12 pl-45 flex bg-[#F8FAFC] gap-10 w-screen h-[200vh]">
      {/* Left Side */}
      <div>
        {/* Header */}
        <div>
          <h1 className="font-[medium] text-3xl">Weather Dashboard</h1>
          <h1 className="font-[Inter] text-[#787894]">
            Real-time agricultural insights for your region
          </h1>
        </div>
        {/* Weather Display */}
        <div className="bg-linear-to-br mt-9 flex justify-between from-[#22c55e] to-[#10b981] rounded-4xl p-8 text-white relative overflow-hidden custom-shadow w-197.5 h-55">
          {/* Left part green */}
          <div className=" flex-col flex -gap-[90px]">
            <h1 className="text-[20px] text-[#E9F9F0] font-[Inter]">
            {data?.location.city === "Unknown City" ? data?.location.formated_address : data?.location.city + "," + data?.location.country}
            </h1>
            <h1 className="text-[75px] font-[medium] -mt-3">{data?.current.temperature_2m}°C</h1>
            <h1 className="text-[25px] -mt-1 font-[Inter]">{data?.current.description.en}</h1>
            <div className="flex mt-2 text-[15px] font-[Inter] gap-4">
            </div>
          </div>
          {/* Right part green */}
          <div className="w-40 mt-4 h-40 ">
            <img src={data?.current.icon_url} alt="Weather Icon" className="w-full h-full object-contain" />
          </div>
        </div>
        {/* Weather downward */}
        <div className="mt-7">
          <div className="flex flex-row gap-5 mt-7">
            {weatherDetails.map((item) => (
              <div
                key={item.name}
                className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center gap-4 w-46"
              >
                <div className={`${item.bg} p-3 rounded-2xl`}>{item.icon}</div>
                <div className="flex flex-col items-center gap-1 text-center">
                  <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
                    {item.name}
                  </span>
                  <span className="text-[17px] font-semibold text-gray-800">
                    {item.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hourly Display */}
        <div className="mt-10">
          <h1 className="text-[20px] font-[medium]">Hourly Forecast </h1>

          <div className="relative w-200">
            {/* Left Arrow */}
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white border border-gray-200 shadow-md rounded-full p-2 hover:bg-gray-50 active:scale-95 transition-all"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>

            {/* Scrollable Row */}
            <div
              ref={scrollRef}
              className="flex flex-row gap-4 -mt-4 overflow-x-hidden pb-4 scroll-smooth scrollbar-hide px-2"
            >

              {WeatherHourDetail1?.map((hour: any, index: number) => (
                <div
                  key={index}
                  className={`shrink-0  font-[Inter] ${Number(hour.time.split(':')[0]) == now ? 'bg-[#F0FDF4]' : 'bg-white'} justify-center items-center mt-10 bg-[#F0FDF4] rounded-2xl shadow-lg p-6 w-36 border ${Number(hour.time.split(':')[0]) == now ? 'border-green-300' : 'border-gray-200'}`}
                >
                  {/* Time */}
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-400">
                      {Number(hour.time.split(':')[0]) == now ? "Now" : hour.time}
                    </h3>
                  </div>

                  {/* Weather Image */}
                  <div className="flex justify-center w-16 h-16 rounded-2xl bg-amber-200 ml-4 mb-4" >
<img src={hour.image} alt="Weather Icon" className="w-full h-full object-contain" />
                    </div>

                  {/* Temperature */}
                  <div className="text-center">
                    <p className="text-[18px] font-bold text-gray-800">
                      {hour.temp}°C
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white border border-gray-200 shadow-md rounded-full p-2 hover:bg-gray-50 active:scale-95 transition-all"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Soil Temperatue */}
        <div className="bg-[#FFFFFF] mt-15 rounded-4xl pl-8 pt-8 w-197.5 h-85">
            {/* Heading for soil temprature */}
            <div>
                <div className="flex gap-3 items-center">
                <div className="bg-[#FEF3C7] p-3 rounded-2xl w-[50px]">
                    <SlidersVertical color="#B45309"  />
                </div>
                <span className="font-[medium] text-[23px]">Soil Insights (Farm-Specific)</span>
                </div>
                <div className="mt-6 flex flex-row gap-8">
                    {SoilTemperatureValue.map((item,index)=>(
                <div key={index} style={{ background: item.background }} className=" rounded-2xl p-6 w-57 shadow-sm relative overflow-hidden">
        {/* Subtle glow */}
        <div className="absolute -top-8 -right-8 w-24 h-24 bg-orange-200 rounded-full opacity-20 blur-2xl" />

        {/* Title */}
        <div style={{color:item.color}} className="flex items-center gap-1.5 font-[medium] text-[17px]">
{item.name}
        </div>

        {/* Depth */}
        <p className="text-stone-400 text-[13px] mt-0.5 font-[Inter]">Depth: {item.Depth}</p>

        {/* Temperature */}
        <div className="flex items-end gap-1 mt-4 mb-4">
          <span className="text-4xl font-[medium] text-stone-800 tracking-tight leading-none">
            {item.Temperature}
          </span>
        </div>

        {/* Progress bar */}
        <div  className="h-1.5 bg-gray-300 w-full  rounded-full overflow-hidden">
          <div style={{
    background: `linear-gradient(to right, ${item.color}80, ${item.color})`
  }} className="h-full w-[62%] bg-linear-to-r from-orange-400 to-orange-300 rounded-full" />
        </div>
      </div>
                    ))}

                </div>
                <h1 className="text-stone-400 text-[13px] mt-4 font-[Inter] italic">
                    <Info size={15} className="inline-block mr-1 italic" />
                    Optimal for sowing: Corn, Soybeans, and Tomatoes require soil above 15°C.
                </h1>
            </div>

        </div>
      </div>

      {/* Right Side */}
      <div>
{/* Search bar */}
      <div className=" flex items-center justify-center p-8">
      <div className="w-full max-w-lg">

        {/* Label */}
        <div className="flex items-center gap-2 mb-2.5 pl-1">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
          <span className="text-xs font-medium uppercase tracking-widest text-slate-400">
            Find your location
          </span>
        </div>

        {/* Search bar */}
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-2xl pl-4 pr-1.5 py-1.5 shadow-sm focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-50 transition-all duration-200">

          <MapPin size={18} className="text-indigo-500 shrink-0" />

          <input
            type="text"
            placeholder="Search city, district, or area…"
            className="flex-1 min-w-0 bg-transparent outline-none text-slate-700 placeholder-slate-300 text-sm"
            value={placeName}
            onChange={(e) => setplaceName(e.target.value)}
          />

          <div className="w-px h-5 bg-slate-200 shrink-0" />

          <button
            onClick={getMyLocation}
            title="Use my location"
            className="p-2 rounded-xl text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 transition-all duration-150 shrink-0"
          >
            <Locate size={17} />
          </button>

          <button
onClick={()=>searchHandler(placeName)}
          className="flex items-center gap-1.5 bg-indigo-500 hover:bg-indigo-600 active:scale-95 text-white text-sm font-medium px-4 py-2 rounded-xl shadow-md shadow-indigo-200 transition-all duration-150 shrink-0">
            <Search size={14} />
            Search
          </button>
        </div>


      </div>
    </div>


      {/* 7-Day Forecast Panel */}
      <WeatherForecastPanel item={data} />

      {/* Crop Alert */}
      <div className="mt-10 ">
        <h1 className="font-[medium] text-[20px]">Farming Intelligence</h1>
        <div className="flex gap-4 bg-[#FEF2F2] mt-2 p-5 w-100 rounded-3xl">
            <div className="bg-[#EF4444]  p-1 rounded-[10px] h-9">
                <TriangleAlert size={26} color="white" />
            </div>

          <div className="flex gap-1 flex-col">
            {/* <h1 className="font-[medium] text-[#991B1B] ">High Wind Alert</h1> */}
            <h1 className="font-[Inter] text-[#B91C1C] text-[13px]">{data?.farming.alerts[0].en}</h1>
                   <h1 className="font-[Inter] text-[#B91C1C] text-[13px]">{data?.farming.alerts[0].np}</h1>
          </div>
        </div>
      </div>
      {/* Crop Suggestions */}
<div className="bg-white pt-5 pl-9 pb-5 rounded-4xl mt-7">
 <div className="flex items-center gap-2.5 mb-6">
          <div className="relative flex items-center justify-center">
            <Sprout
              size={22}
              className="text-green-500 animate-pulse"
              strokeWidth={2.2}
            />
          </div>
          <h2
            className="text-xl font-bold text-gray-800 tracking-tight"
            style={{ fontFamily: "'Nunito', 'Segoe UI', sans-serif" }}
          >
            Crop Suggestions
          </h2>
        </div>
        {/* Cards */}
        <div>
        <div className="flex flex-col gap-3">
          {data?.farming.crop_suggestions.map((crop:any, i:number) => (
            <div
              key={i}
              className={`flex items-center gap-4 rounded-2xl px-4 py-3.5   transition-all duration-200 hover:scale-[1.02]  cursor-pointer`}
              style={{
                animation: `fadeSlideIn 0.4s ease both`,
                animationDelay: `${i * 0.1}s`,
              }}
            >
              {/* Emoji Icon */}
              <div className="w-11 h-11 rounded-xl bg-white shadow-sm flex items-center justify-center text-2xl shrink-0 border border-white/80">
                {crop.emoji}
              </div>

              {/* Text */}
              <div className="flex-1 font-[medium] min-w-0">
                <p
                  className="text-sm font-bold text-gray-800 leading-tight"
                >
                  {crop.crop}
                </p>
                <p className="text-xs font-[Inter] text-gray-500 mt-0.5 leading-snug">
                  {crop.en}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
</div>
  ) : (
  <div className="flex flex-col font-[Inter] items-center justify-center min-h-screen bg-[#F5F5F4] gap-6 px-4">
  <div className="bg-white rounded-3xl shadow-md border border-orange-100 px-12 py-14 flex flex-col items-center gap-5 max-w-sm w-full">

    {/* Icon */}
    <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5">
      <TriangleAlert size={40} className="text-orange-400" />
    </div>

    {/* Text */}
    <div className="flex flex-col items-center gap-2 text-center">
      <h2 className="text-lg font-bold text-stone-700 tracking-tight">
        Weather Unavailable
      </h2>
      <p className="text-sm text-stone-400 leading-relaxed">
        Unable to fetch weather data.<br />Please check your connection and try again.
      </p>
    </div>

    {/* Retry Button */}
    <button
      onClick={() => window.location.reload()}
      className="mt-2 w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 active:scale-95 transition-all text-white text-sm font-semibold tracking-wide shadow-sm"
    >
      Try Again
    </button>

  </div>
</div>
  )
)}
</>
  );
};

export default Weather;
