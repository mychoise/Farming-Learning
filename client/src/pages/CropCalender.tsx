import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { getCropCalender } from "../api/api";

interface Crop {
  id: string;
  name: string;
  nepaliName?: string;
  icon?: string;
  season?: string;
  description?: string;
  soilType?: string;
  climate?: string;
  difficulty?: string;
  profitMin?: number;
  profitMax?: number;
}

interface Region {
  id: string;
  name: string;
}

interface CropCalendarEntry {
  eventType: string;
  month: number;
}

interface ApiEntry {
  crop: Crop;
  crop_calendar: CropCalendarEntry;
  regions: Region;
}

interface CropListItem {
  crop: Crop;
  region: string;
  calendar: Record<string, string>;
}

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const seasons = [
  { name: "Winter", months: [12, 1, 2], color: "#1565C0", bg: "#DBEAFE" },
  { name: "Spring", months: [3, 4, 5],  color: "#2E7D32", bg: "#DCFCE7" },
  { name: "Summer", months: [6, 7, 8],  color: "#B45309", bg: "#FEF3C7" },
  { name: "Autumn", months: [9, 10, 11],color: "#9A3412", bg: "#FFEDD5" },
];

const getSeasonForMonth = (m: number) => {
  const idx = m === 0 ? 12 : m;
  return seasons.find(s => s.months.includes(idx));
};

const EVENT_TYPE_MAP: Record<string, string> = {
  // sow variants
  seed:          "sow",
  seeding:       "sow",
  sow:           "sow",
  sowing:        "sow",
  plant:         "sow",
  planting:      "sow",
  transplant:    "sow",
  transplanting: "sow",
  // grow variants
  growth:        "grow",
  grow:          "grow",
  growing:       "grow",
  vegetative:    "grow",
  // harvest variants
  harvest:       "harvest",
  harvesting:    "harvest",
  maturity:      "harvest",
  mature:        "harvest",
};

const cellColors: Record<string, { bg: string; border: string; dot: string }> = {
  sow:     { bg: "rgba(2,119,189,0.12)",  border: "#0277BD", dot: "#0277BD" },
  grow:    { bg: "rgba(46,125,50,0.12)",  border: "#2E7D32", dot: "#2E7D32" },
  harvest: { bg: "rgba(245,127,23,0.15)", border: "#F57F17", dot: "#F57F17" },
};

// FIX 6: moved outside component so it's not recreated on every render
const getPhaseMonths = (calendar: Record<string, string>, type: string) =>
  Object.entries(calendar)
    .filter(([, t]) => t === type)
    .map(([m]) => Number(m))
    .sort((a, b) => a - b);

// FIX 2: key by `cropId__regionId` so a crop appearing in multiple regions
//         gets a separate row per region instead of the first region winning.
function buildCropList(data: ApiEntry[] | undefined): CropListItem[] {
  if (!Array.isArray(data)) return [];
  const map: Record<string, CropListItem> = {};

  for (const entry of data) {
    const { crop, crop_calendar, regions } = entry;
    if (!crop || !crop_calendar) continue;

    const regionName = regions?.name ?? "Unknown";
    const regionId   = regions?.id   ?? "unknown";
    // unique key per crop+region combination
    const key = `${crop.id}__${regionId}`;

    if (!map[key]) {
      map[key] = { crop, region: regionName, calendar: {} };
    }

    const displayType = EVENT_TYPE_MAP[crop_calendar.eventType?.toLowerCase()] ?? crop_calendar.eventType;
    // FIX 1: store month as a STRING key so `calendar[String(month)]` lookups
    //        always match regardless of how JS coerces numeric vs string keys.
    map[key].calendar[String(crop_calendar.month)] = displayType;
  }

  return Object.values(map);
}

// FIX 4: extracted detail panel into its own component — no more IIFE in JSX
function CropDetailPanel({ selectedCrop }: { selectedCrop: CropListItem | null }) {
  if (!selectedCrop) return null;
  const { crop, region, calendar } = selectedCrop;

  const sowMonths     = getPhaseMonths(calendar, "sow");
  const growMonths    = getPhaseMonths(calendar, "grow");
  const harvestMonths = getPhaseMonths(calendar, "harvest");

  return (
    <div
      className="max-w-275 mx-auto mt-6 bg-white rounded-xl font-[font3] border p-6 flex items-start gap-8 flex-wrap"
      style={{ borderColor: "rgba(46,125,50,0.15)", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
    >
      {/* Icon + Name */}
      <div className="flex items-center gap-4">
        <div className="text-5xl">{crop.icon || "🌱"}</div>
        <div>
          <div className="text-xl font-black text-green-800">{crop.name}</div>
          {crop.nepaliName && (
            <div className="text-[14px] text-green-600">{crop.nepaliName}</div>
          )}
          <div className="text-[11px] uppercase tracking-wider text-green-700/60 mt-0.5">
            {region} · {crop.season}
          </div>
        </div>
      </div>

      {/* Phase Badges */}
      <div className="flex gap-6 flex-wrap">
        {[
          { label: "Sowing",  phaseMonths: sowMonths,     color: "#0277BD" },
          { label: "Growing", phaseMonths: growMonths,    color: "#2E7D32" },
          { label: "Harvest", phaseMonths: harvestMonths, color: "#F57F17" },
        ].map(phase => (
          <div key={phase.label}>
            <div className="text-[13px] font-[font5] uppercase tracking-wide mb-1" style={{ color: phase.color }}>
              {phase.label}
            </div>
            {phase.phaseMonths.length > 0 ? (
              <div className="flex gap-1 flex-wrap">
                {phase.phaseMonths.map(m => (
                  <span
                    key={m}
                    className="px-2 py-0.5 rounded text-[11px] font-[font4]"
                    style={{
                      background: `${phase.color}12`,
                      border:     `1px solid ${phase.color}40`,
                      color:      phase.color,
                    }}
                  >
                    {months[m - 1]}
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-[11px] text-gray-400 italic">—</span>
            )}
          </div>
        ))}
      </div>

      {/* Description */}
      {crop.description && (
        <p className="w-full text-[15px] text-green-800 font-[font5] leading-relaxed border-t border-black/5 pt-4 mt-2">
          {crop.description}
        </p>
      )}

      {/* Info chips */}
      <div className="flex gap-3 flex-wrap w-full">
        {crop.soilType && (
          <span className="px-3 py-1 rounded-full text-[13px] bg-amber-50 border border-amber-200 text-amber-800">
            🪨 {crop.soilType}
          </span>
        )}
        {crop.climate && (
          <span className="px-3 py-1 rounded-full text-[13px] bg-sky-50 border border-sky-200 text-sky-800">
            🌤 {crop.climate}
          </span>
        )}
        {crop.difficulty && (
          <span className="px-3 py-1 rounded-full text-[13px] bg-purple-50 border border-purple-200 text-purple-800 capitalize">
            ⚡ {crop.difficulty}
          </span>
        )}
        {crop.profitMin && crop.profitMax && (
          <span className="px-3 py-1 rounded-full text-[13px] bg-green-50 border border-green-200 text-green-800">
            💰 Rs. {Number(crop.profitMin).toLocaleString()} – {Number(crop.profitMax).toLocaleString()}
          </span>
        )}
      </div>
    </div>
  );
}

export default function CropCalendar() {
  const [regionFilter, setRegionFilter] = useState<string>("All");
  const [hovered, setHovered]           = useState<string | null>(null);
  const [selectedKey, setSelectedKey]   = useState<string | null>(null); // FIX 3: track by stable key, not object ref

  const currentMonth = new Date().getMonth(); // 0-indexed

  const { data: rawData, isLoading, isError } = useQuery({
    queryKey: ["cropCalendarData"],
    queryFn: getCropCalender,
    staleTime: 1000 * 60 * 60,
  });

  // FIX 5: memoize so expensive transform only re-runs when rawData changes
  const allCrops = useMemo(() => buildCropList(rawData), [rawData]);

  const regions = useMemo(
    () => ["All", ...Array.from(new Set(allCrops.map(c => c.region))).sort()],
    [allCrops]
  );

  const filtered = useMemo(
    () => regionFilter === "All" ? allCrops : allCrops.filter(c => c.region === regionFilter),
    [allCrops, regionFilter]
  );

  // FIX 3: derive selectedCrop from the stable key; auto-clears if crop leaves filtered list
  const selectedCrop = selectedKey
    ? (filtered.find(c => `${c.crop.id}__${c.region}` === selectedKey) ?? null)
    : null;

  const handleRegionChange = (r: string) => {
    setRegionFilter(r);
    setSelectedKey(null); // clear detail panel when region changes
  };

  return (
    <div className="min-h-screen bg-gray-100 font-[font3] p-8 text-green-800">
      {/* Header */}
      <div className="text-center mb-9">
        <div className="text-[13px] tracking-widest text-green-700 uppercase mb-2">
          Agricultural Planning Guide
        </div>
        <h1 className="text-[clamp(28px,5vw,52px)] font-black m-0 bg-linear-to-br from-green-700 via-yellow-700 to-green-800 bg-clip-text text-transparent tracking-tight leading-tight">
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

      {/* Region Filter Tabs */}
      <div className="flex justify-center gap-2 mb-8 flex-wrap">
        {regions.map(r => (
          <button
            key={r}
            onClick={() => handleRegionChange(r)}
            className={`px-4 py-1.5 rounded-full text-[12px] uppercase tracking-wide font-inherit transition-all duration-200 cursor-pointer shadow-sm ${
              regionFilter === r
                ? "bg-linear-to-br from-green-700 to-green-800 text-white shadow-lg"
                : "bg-white text-green-700 border border-green-700/30"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-16 text-green-700 text-[15px] tracking-wide animate-pulse">
          Loading crop data…
        </div>
      )}

      {/* FIX 7: error state */}
      {isError && (
        <div className="text-center py-16 text-red-600 text-[15px]">
          Failed to load crop data. Please try again.
        </div>
      )}

      {/* Calendar Table — only render when we have data */}
      {!isLoading && !isError && rawData && (
        <div className="overflow-x-auto">
          {/* FIX 6: replaced border-black/6 and border-black/8 with valid arbitrary values */}
          <div className="min-w-175 max-w-275 mx-auto bg-white rounded-2xl border border-black/8 shadow-md overflow-hidden">

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
                    {s?.name.slice(0, 3).toUpperCase()}
                  </div>
                );
              })}
            </div>

            {/* Month Header */}
            <div className="grid grid-cols-[160px_repeat(12,1fr)] bg-gray-50 border-b border-black/8 border-t border-black/6">
              <div className="px-4 py-3 text-[11px] font-[font5] text-green-700">CROP</div>
              {months.map((m, i) => (
                <div
                  key={i}
                  className={`px-1 py-3 text-center text-[11px] border-l border-black/6 relative ${
                    i === currentMonth
                      ? "font-extrabold text-orange-700 bg-orange-100/20"
                      : "font-semibold text-green-700"
                  }`}
                >
                  {m.toUpperCase()}
                  {i === currentMonth && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-orange-700" />
                  )}
                </div>
              ))}
            </div>

            {/* Crop Rows */}
            {filtered.length === 0 && (
              <div className="text-center py-12 text-green-700/60 text-[14px]">
                No crops found for this region.
              </div>
            )}

            {filtered.map(({ crop, region, calendar }, ci) => {
              const rowKey      = `${crop.id}__${region}`;
              const isSelected  = selectedKey === rowKey;

              return (
                <div
                  key={rowKey}
                  onClick={() => setSelectedKey(isSelected ? null : rowKey)}
                  onMouseEnter={() => setHovered(rowKey)}
                  onMouseLeave={() => setHovered(null)}
                  className={`grid font-[Inter] grid-cols-[160px_repeat(12,1fr)] ${
                    ci < filtered.length - 1 ? "border-b border-black/5" : ""
                  } cursor-pointer transition-colors duration-200 ${
                    isSelected
                      ? "bg-green-700/5"
                      : hovered === rowKey
                      ? "bg-gray-50"
                      : "bg-white"
                  }`}
                >
                  {/* Crop Label */}
                  <div className="px-4 py-3 flex items-center gap-2.5">
                    <span className="text-2xl">{crop.icon || "🌱"}</span>
                    <div>
                      <div className="text-[13px] font-bold text-green-900 tracking-tight">
                        {crop.name}
                      </div>
                      <div className="text-[10px] uppercase tracking-wide text-green-700/70">
                        {region}
                      </div>
                    </div>
                  </div>

                  {/* Month Cells */}
                  {months.map((_, mi) => {
                    const rawType    = calendar[String(mi + 1)] ?? null;
                    const c          = rawType ? (cellColors[rawType] ?? null) : null;
                    const isCurrentM = mi === currentMonth;

                    return (
                      <div
                        key={mi}
                        className={`px-1 py-2 flex items-center justify-center border-l border-black/5 ${
                          isCurrentM ? "bg-orange-100/20" : ""
                        }`}
                      >
                        {c && (
                          <div
                            className="w-4/5 h-5 rounded flex items-center justify-center"
                            style={{
                              background: c.bg,
                              border:     `1.5px solid ${c.border}`,
                              boxShadow:  `0 0 6px ${c.dot}20`,
                            }}
                          >
                            <div className="w-1.5 h-1.5 rounded-full" style={{ background: c.dot }} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* FIX 4: detail panel is now a proper component, not an IIFE */}
      <CropDetailPanel selectedCrop={selectedCrop} />

      <div className="text-center mt-10 text-green-200 text-[12px] tracking-widest opacity-80">
        CLICK ANY CROP FOR DETAILS · {new Date().getFullYear()} CROP CALENDAR
      </div>
    </div>
  );
}
