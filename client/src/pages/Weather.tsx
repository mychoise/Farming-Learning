import React, { useRef } from "react";
import {
  CloudRain,
  FlaskConical,
  MoveRight,
  Sun,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Weather = () => {
  const weatherDetails = [
    {
      name: "Humidity",
      icon: <FlaskConical size={22} className="text-blue-500" />,
      bg: "bg-blue-50",
      value: "64%",
    },
    {
      name: "Wind",
      icon: <MoveRight size={22} className="text-teal-500" />,
      bg: "bg-teal-50",
      value: "5 km/h",
    },
    {
      name: "Precip.",
      icon: <CloudRain size={22} className="text-indigo-500" />,
      bg: "bg-indigo-50",
      value: "10%",
    },
    {
      name: "Rain",
      icon: <Sun size={22} className="text-amber-500" />,
      bg: "bg-amber-50",
      value: "0.0mm",
    },
  ];
  const WeatherHourDetail = [
    {
      time: "Now",
      temp: "24°C",
      image: "https://source.unsplash.com/random/160x160/?sunset",
    },
    {
      time: "14:00",
      temp: "25°C",
      image: "https://source.unsplash.com/random/160x160/?water",
    },
    {
      time: "15:00",
      temp: "27°C",
      image: "https://source.unsplash.com/random/160x160/?mountain",
    },
    {
      time: "16:00",
      temp: "28°C",
      image: "https://source.unsplash.com/random/160x160/?sea",
    },
    {
      time: "17:00",
      temp: "26°C",
      image: "https://source.unsplash.com/random/160x160/?forest",
    },
    {
      time: "18:00",
      temp: "24°C",
      image: "https://source.unsplash.com/random/160x160/?city",
    },
    {
      time: "19:00",
      temp: "22°C",
      image: "https://source.unsplash.com/random/160x160/?desert",
    },
    {
      time: "20:00",
      temp: "20°C",
      image: "https://source.unsplash.com/random/160x160/?beach",
    },
  ];

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
    <div className=" pt-12 pl-45 bg-[#F8FAFC] w-screen h-[200vh]">
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
        <div className="bg-linear-to-br mt-9 flex justify-between from-[#22c55e] to-[#10b981] rounded-4xl p-8 text-white relative overflow-hidden custom-shadow w-[790px] h-[260px]">
          {/* Left part green */}
          <div className=" flex-col flex -gap-[90px]">
            <h1 className="text-[20px] text-[#E9F9F0] font-[Inter]">
              Kathmandu,Nepal
            </h1>
            <h1 className="text-[75px] font-[medium] -mt-3">24.5°C</h1>
            <h1 className="text-[25px] -mt-1 font-[Inter]">Partly Cloudy</h1>
            <div className="flex mt-2 text-[15px] font-[Inter] gap-4">
              <div className="bg-white/40 rounded-full px-4 py-0.5">
                <h1>H: 26°</h1>
              </div>
              <div className="bg-white/40 rounded-full px-4 py-0.5">
                <h1>L: 18°</h1>
              </div>
            </div>
          </div>
          {/* Right part green */}
          <div className="w-[160px] mt-4 h-[160px] bg-orange-300"></div>
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

          <div className="relative w-[calc(100%-141px*5)]">
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
              {WeatherHourDetail.map((hour, index) => (
                <div
                  key={index}
                  className="shrink-0 font-[Inter] justify-center items-center mt-10 bg-white rounded-2xl shadow-lg p-6 w-36 border border-gray-100"
                >
                  {/* Time */}
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-400">
                      {hour.time}
                    </h3>
                  </div>

                  {/* Weather Image */}
                  <div className="flex justify-center w-16 h-16 bg-amber-300 ml-4 mb-4" />

                  {/* Temperature */}
                  <div className="text-center">
                    <p className="text-[18px] font-bold text-gray-800">
                      {hour.temp}
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
      </div>

      {/* Right Side */}
      <div></div>
    </div>
  );
};

export default Weather;
