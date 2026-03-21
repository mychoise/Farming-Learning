import { useState } from "react";

const crops = [
  { name: "Wheat", color: "#8B6914", icon: "🌾", sow: [10, 11, 12], grow: [1, 2, 3], harvest: [4, 5], region: "Cereal" },
  { name: "Rice", color: "#2E7D32", icon: "🌿", sow: [5, 6], grow: [7, 8], harvest: [9, 10], region: "Cereal" },
  { name: "Maize", color: "#F57F17", icon: "🌽", sow: [3, 4], grow: [5, 6, 7], harvest: [8, 9], region: "Cereal" },
  { name: "Tomato", color: "#C62828", icon: "🍅", sow: [2, 3], grow: [4, 5, 6], harvest: [7, 8], region: "Vegetable" },
  { name: "Potato", color: "#6D4C41", icon: "🥔", sow: [1, 2], grow: [3, 4, 5], harvest: [6, 7], region: "Vegetable" },
  { name: "Onion", color: "#6A1B9A", icon: "🧅", sow: [11, 12], grow: [1, 2, 3], harvest: [4, 5], region: "Vegetable" },
  { name: "Sunflower", color: "#E65100", icon: "🌻", sow: [4, 5], grow: [6, 7], harvest: [8, 9], region: "Oilseed" },
  { name: "Soybean", color: "#388E3C", icon: "🫘", sow: [6, 7], grow: [8, 9], harvest: [10, 11], region: "Legume" },
  { name: "Cotton", color: "#546E7A", icon: "🌸", sow: [4, 5], grow: [6, 7, 8], harvest: [9, 10], region: "Fiber" },
  { name: "Mango", color: "#BF360C", icon: "🥭", sow: [7, 8], grow: [9,10,11,12,1,2], harvest: [3, 4, 5], region: "Fruit" },
];

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const seasons = [
  { name: "Winter", months: [12, 1, 2], color: "#1565C0", bg: "#DBEAFE" },
  { name: "Spring", months: [3, 4, 5],  color: "#2E7D32", bg: "#DCFCE7" },
  { name: "Summer", months: [6, 7, 8],  color: "#B45309", bg: "#FEF3C7" },
  { name: "Autumn", months: [9, 10, 11],color: "#9A3412", bg: "#FFEDD5" },
];

const getSeasonForMonth = (m) => {
  const idx = m === 0 ? 12 : m;
  return seasons.find(s => s.months.includes(idx));
};

const getCellType = (crop, monthIndex) => {
  const m = monthIndex + 1;
  if (crop.sow.includes(m)) return "sow";
  if (crop.harvest.includes(m)) return "harvest";
  if (crop.grow.includes(m)) return "grow";
  return null;
};

const regions = ["All", "Cereal", "Vegetable", "Oilseed", "Legume", "Fiber", "Fruit"];

export default function CropCalendar() {
  const [filter, setFilter] = useState("All");
  const [hovered, setHovered] = useState(null);
  const [selectedCrop, setSelectedCrop] = useState(null);

  const filtered = filter === "All" ? crops : crops.filter(c => c.region === filter);
  const currentMonth = new Date().getMonth();

  return (
    <div className="min-h-screen bg-gray-100 font-[font3] p-8 text-green-800">
      {/* Header */}
      <div className="text-center mb-9">
        <div className="text-[13px] tracking-widest text-green-700 uppercase mb-2">
          Agricultural Planning Guide
        </div>
        <h1 className="text-[clamp(28px,5vw,52px)] font-black m-0 bg-gradient-to-br from-green-700 via-yellow-700 to-green-800 bg-clip-text text-transparent tracking-tight leading-tight">
          Crop Calendar
        </h1>
        <p className="text-green-800/80 mt-2 font-[font5] text-[15px]">
          Plan your farming season with precision
        </p>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mb-7 flex-wrap">
        {[
          { type: "sow",     label: "Sowing",  color: "#0277BD", bg: "rgba(2,119,189,0.12)" },
          { type: "grow",    label: "Growing", color: "#2E7D32", bg: "rgba(46,125,50,0.12)" },
          { type: "harvest", label: "Harvest", color: "#F57F17", bg: "rgba(245,127,23,0.12)" },
        ].map(l => (
          <div key={l.type} className="flex items-center gap-2">
            <div className="w-7 h-4 rounded" style={{ background: l.bg, border: `2px solid ${l.color}` }} />
            <span className="text-[13px] text-green-900 tracking-wide">{l.label}</span>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center gap-2 mb-8 flex-wrap">
        {regions.map(r => (
          <button
            key={r}
            onClick={() => setFilter(r)}
            className={`px-4 py-1.5 rounded-full text-[12px] uppercase tracking-wide font-inherit transition-all duration-200 cursor-pointer shadow-sm ${
              filter === r
                ? "bg-gradient-to-br from-green-700 to-green-800 text-white shadow-lg"
                : "bg-white text-green-700 border border-green-700/30"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Calendar Table */}
      <div className="overflow-x-auto">
        <div className="min-w-[700px] max-w-[1100px] mx-auto bg-white rounded-2xl border border-black/8 shadow-md overflow-hidden">
          {/* Season Row */}
          <div className="grid grid-cols-[160px_repeat(12,1fr)]">
            <div className="px-4 py-2 text-[11px] text-gray-400 tracking-wider bg-gray-100">SEASON</div>
            {months.map((_, i) => {
              const s = getSeasonForMonth(i + 1);
              return (
                <div
                  key={i}
                  className="py-2 text-center text-[9px] tracking-wide font-[font3] border-l border-black/6"
                  style={{ color: s?.color || "#999", background: s?.bg || "#F5F5F4" }}
                >
                  {s?.name.slice(0,3).toUpperCase()}
                </div>
              );
            })}
          </div>

          {/* Month Header */}
          <div className="grid grid-cols-[160px_repeat(12,1fr)] bg-gray-50 border-b border-black/8 border-t border-black/6">
            <div className="px-4 py-3 text-[11px] font-[font5] text-green-700 ">CROP</div>
            {months.map((m, i) => (
              <div
                key={i}
                className={`px-1 py-3 text-center text-[11px] border-l border-black/6 relative ${i === currentMonth ? "font-extrabold text-orange-700 bg-orange-100/20" : "font-semibold text-green-700"}`}
              >
                {m.toUpperCase()}
                {i === currentMonth && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-orange-700" />
                )}
              </div>
            ))}
          </div>

          {/* Crop Rows */}
          {filtered.map((crop, ci) => (
            <div
              key={crop.name}
              onClick={() => setSelectedCrop(selectedCrop?.name === crop.name ? null : crop)}
              onMouseEnter={() => setHovered(crop.name)}
              onMouseLeave={() => setHovered(null)}
              className={`grid font-[Inter] grid-cols-[160px_repeat(12,1fr)] border-b ${ci < filtered.length - 1 ? "border-black/5" : ""} cursor-pointer transition-colors duration-200 ${
                selectedCrop?.name === crop.name ? "bg-green-700/5" : hovered === crop.name ? "bg-gray-50" : "bg-white"
              }`}
            >
              <div className="px-4 py-3 flex items-center gap-2.5">
                <span className="text-2xl">{crop.icon}</span>
                <div>
                  <div className="text-[13px] font-bold text-green-900 tracking-tight">{crop.name}</div>
                  <div className="text-[10px] uppercase tracking-wide opacity-90" style={{ color: crop.color }}>{crop.region}</div>
                </div>
              </div>

              {months.map((_, mi) => {
                const type = getCellType(crop, mi);
                const isCurrentMonth = mi === currentMonth;
                const cellColors = {
                  sow:     { bg: "rgba(2,119,189,0.12)",  border: "#0277BD", dot: "#0277BD" },
                  grow:    { bg: "rgba(46,125,50,0.12)",  border: "#2E7D32", dot: "#2E7D32" },
                  harvest: { bg: "rgba(245,127,23,0.15)", border: "#F57F17", dot: "#F57F17" },
                };
                const c = type ? cellColors[type] : null;
                return (
                  <div key={mi} className={`px-1 py-2 flex items-center justify-center border-l border-black/5 ${isCurrentMonth ? "bg-orange-100/20" : ""}`}>
                    {type && (
                      <div className="w-4/5 h-5 rounded flex items-center justify-center" style={{ background: c.bg, border: `1.5px solid ${c.border}`, boxShadow: `0 0 6px ${c.dot}20` }}>
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: c.dot }} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Selected Crop Detail */}
      {selectedCrop && (
        <div className="max-w-[1100px] mx-auto mt-6 bg-white rounded-xl font-[font4] border p-6 flex items-center gap-8 flex-wrap" style={{ borderColor: `${selectedCrop.color}25`, boxShadow: `0 4px 20px rgba(0,0,0,0.08)` }}>
          <div className="text-5xl">{selectedCrop.icon}</div>
          <div>
            <div className="text-xl font-black mb-1" style={{ color: selectedCrop.color }}>{selectedCrop.name}</div>
            <div className="text-[12px] uppercase tracking-wider text-green-800">{selectedCrop.region}</div>
          </div>
          <div className="flex gap-6 flex-wrap">
            {[
              { label: "Sowing",  months: selectedCrop.sow,     color: "#0277BD" },
              { label: "Growing", months: selectedCrop.grow,    color: "#2E7D32" },
              { label: "Harvest", months: selectedCrop.harvest, color: "#F57F17" },
            ].map(phase => (
              <div key={phase.label}>
                <div className="text-[11px] uppercase tracking-wide mb-1" style={{ color: phase.color }}>{phase.label}</div>
                <div className="flex gap-1">
                  {phase.months.map(m => (
                    <span
                      key={m}
                      className="px-2 py-[2px] rounded text-[11px] font-bold"
                      style={{ background: `${phase.color}12`, border: `1px solid ${phase.color}40`, color: phase.color }}
                    >
                      {months[m - 1]}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="text-center mt-10 text-green-200 text-[12px] tracking-widest opacity-80">
        CLICK ANY CROP FOR DETAILS • {new Date().getFullYear()} CROP CALENDAR
      </div>
    </div>
  );
}
