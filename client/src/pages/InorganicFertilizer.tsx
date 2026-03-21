import { useEffect, useState } from "react";
import { ChevronDown, BarChart2, Leaf, Beaker, FlaskConical } from "lucide-react";
import StrategyCard from "../components/organic/StrategyCard";
import { useInorganicFertilizer } from "../hooks/hooks";
import {  useQueryClient } from "@tanstack/react-query";
import type { InOrganicFertilizerCalculation } from "../api/api";
const CROPS = [
  { name: "Rice",
    scientific: "Oryza sativa"
  },
  { name: "Chilli Pepper",
    scientific: "Capsicum annuum"
  },
  { name: "Maize",
    scientific: "Zea mays"
  },
  { name: "Potato",
    scientific: "Solanum tuberosum"
  },
  { name: "Tomato",
    scientific: "Solanum lycopersicum"
  },
];

const LAND_SYSTEMS = ["Bigha", "Ropani"];

function NutrientBar({ value, max, color }:{ value: number; max: number; color: string }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="w-full h-2 rounded-full bg-stone-200 overflow-hidden mt-2">
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${pct}%`, backgroundColor: color }}
      />
    </div>
  );
}


export default function InorganicFertilizer() {
  const [crop, setCrop] = useState(CROPS[0]);
  const [landSystem, setLandSystem] = useState("Bigha");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [showCropDrop, setShowCropDrop] = useState(false);
  const [showLandDrop, setShowLandDrop] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [animating, setAnimating] = useState(false);

 const { mutate } = useInorganicFertilizer();
const queryClient = useQueryClient();

const data = queryClient.getQueryData<InOrganicFertilizerCalculation>(["inorganicFertilizerResult"]);

useEffect(() => {
  if (data) {
    console.log("Final data from server:", data);
  }
}, [data])


  // Fertilizer calc
   function handleGenerate() {
    setAnimating(true);
    setTimeout(() => {
      setGenerated(true);
      setAnimating(false);
    }, 400);

    const finalData = {
        cropName:crop.name,
        SystemOfLandCalculation:landSystem,
        length:parseFloat(length),
        wide:parseFloat(width)
    }
    mutate(finalData);
  }


const FERTILIZERS = [
  {
    name: "Urea",
    key: "Urea",
    defaultAmount: data?.fertilizers.Urea || 260,
    unit: "kg",
    icon: Beaker,
    borderColor: "#2d6a2d",
    badgeBg: "#dcfce7",
    badgeText: "#166534",
  },
  {
    name: "DAP",
    key: "DAP",
    defaultAmount: data?.fertilizers.DAP || 130,
    unit: "kg",
    icon: FlaskConical,
    borderColor: "#9b2335",
    badgeBg: "#fee2e2",
    badgeText: "#991b1b",
  },
  {
    name: "MOP",
    key: "MOP",
    defaultAmount: data?.fertilizers.MOP || 1.5,
    unit: "kg",
    icon: Leaf,
    borderColor: "#d97706",
    badgeBg: "#fef9c3",
    badgeText: "#92400e",
  },
];

const total = (data?.nutrientsNeeded?.N_kg || 0) + (data?.nutrientsNeeded?.P_kg || 0) + (data?.nutrientsNeeded?.K_kg || 0);
  const maxN = total || 200, maxP =  total || 100, maxK = total || 220;

  return (
    <div className="min-h-screen bg-stone-100 font-[font4]">
      {/* Google Fonts */}
      <style>{`

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="max-w-5xl mx-15  px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-[font3] tracking-[0.25em] text-green-700 uppercase mb-3">
            Precision Agronomy / Volume 04
          </p>
          <h1 className="text-5xl font-[font3] text-stone-900 leading-tight">
            Fertilizer Requirement
          </h1>
          <h2 className=" text-5xl font-[font3] text-green-700 leading-tight mb-4">
            Optimization Engine
          </h2>
          <div className="w-16 h-1 bg-green-800 rounded-full" />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-50">
          {/* Left: Field Parameters */}
          <div>
            <h3 className="text-xl font-bold text-stone-900 mb-1">Field Parameters</h3>
            <p className="text-sm text-stone-500 mb-6">
              Define your crop and land dimensions for precise nutrient mapping.
            </p>

            {/* Crop Selector */}
            <div className="mb-5">
              <label className="text-xs font-bold tracking-widest uppercase text-stone-500 block mb-2">
                Target Crop Selection
              </label>
              <div className="relative">
                <button
                  onClick={() => { setShowCropDrop(!showCropDrop); setShowLandDrop(false); }}
                  className="w-full bg-white border border-stone-200 rounded-2xl px-5 py-4 flex items-center justify-between text-stone-800 font-semibold shadow-sm hover:border-green-400 transition-colors"
                >
                  <span>{crop.name}  ({crop.scientific})</span>
                  <ChevronDown size={18} className={`text-stone-400 transition-transform ${showCropDrop ? "rotate-180" : ""}`} />
                </button>
                {showCropDrop && (
                  <div className="absolute z-20 w-full mt-2 bg-white border border-stone-200 rounded-2xl shadow-xl overflow-hidden">
                    {CROPS.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => { setCrop(c); setShowCropDrop(false); setGenerated(false); }}
                        className={`w-full text-left px-5 py-3 text-sm font-medium hover:bg-green-50 hover:text-green-800 transition-colors ${crop.name === c.name ? "bg-green-50 text-green-800" : "text-stone-700"}`}
                      >
                        {c.name}  ({c.scientific})
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Land System + Area */}
            <div className="grid grid-cols-2 gap-4 mb-7">
              <div>
                <label className="text-xs font-bold tracking-widest uppercase text-stone-500 block mb-2">
                  Land System
                </label>
                <div className="relative">
                  <button
                    onClick={() => { setShowLandDrop(!showLandDrop); setShowCropDrop(false); }}
                    className="w-full bg-white border border-stone-200 rounded-2xl px-4 py-4 flex items-center justify-between text-stone-800 font-semibold shadow-sm hover:border-green-400 transition-colors"
                  >
                    <span>{landSystem}</span>
                    <ChevronDown size={16} className={`text-stone-400 transition-transform ${showLandDrop ? "rotate-180" : ""}`} />
                  </button>
                  {showLandDrop && (
                    <div className="absolute z-20 w-full mt-2 bg-white border border-stone-200 rounded-2xl shadow-xl overflow-hidden">
                      {LAND_SYSTEMS.map((ls) => (
                        <button
                          key={ls}
                          onClick={() => { setLandSystem(ls); setShowLandDrop(false); setGenerated(false); }}
                          className={`w-full text-left px-4 py-3 text-sm font-medium hover:bg-green-50 hover:text-green-800 transition-colors ${landSystem === ls ? "bg-green-50 text-green-800" : "text-stone-700"}`}
                        >
                          {ls}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold tracking-widest uppercase text-stone-500 block mb-2">
                  Length
                </label>
                <input
                  type="number"
                  min="0"
                  value={length}
                  onChange={(e) => { setLength(e.target.value); setGenerated(false); }}
                  placeholder="0.0"
                  className="w-full bg-white border border-stone-200 rounded-2xl px-4 py-4 text-stone-800 font-semibold shadow-sm focus:outline-none focus:border-green-500 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-bold tracking-widest uppercase text-stone-500 block mb-2">
                  Width
                </label>
                <input
                  type="number"
                  min="0"
                  value={width}
                  onChange={(e) => { setWidth(e.target.value); setGenerated(false); }}
                  placeholder="0.0"
                  className="w-full bg-white border border-stone-200 rounded-2xl px-4 py-4 text-stone-800 font-semibold shadow-sm focus:outline-none focus:border-green-500 transition-colors"
                />
              </div>

            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={!length || !width || parseFloat(length) <= 0 || parseFloat(width) <= 0}
              className="w-full bg-stone-900 hover:bg-green-900 disabled:bg-stone-300 text-white font-bold tracking-widest uppercase text-sm rounded-2xl py-5 flex items-center justify-center gap-3 transition-colors duration-200 shadow-md"
            >
              <BarChart2 size={18} />
              Generate Precision Plan
            </button>
          </div>

          {/* Right: Results */}
          {generated?(<div className="-mt-[40%] -ml-[20%] space-y-5 w-122.5">
            {/* NPK Targets */}
            <div className={`bg-white w-175 rounded-3xl p-6 shadow-sm ${animating ? "opacity-50" : "fade-in"}`}>
              <div className="flex items-center justify-between mb-5">
                <p className="text-xs font-bold tracking-widest uppercase text-green-700">
                  Nutrient Target (NPK)
                </p>
                <p className="text-xs font-semibold text-stone-400 tracking-widest uppercase">
                  Unit: Kilograms (KG)
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {/* N */}
                <div>
                  <p className="text-4xl font-black text-green-700">{data?.nutrientsNeeded.N_kg || 0}</p>
                  <p className="text-xs font-bold tracking-widest uppercase text-stone-400 mt-1">Nitrogen (N)</p>
                  <NutrientBar value={data?.nutrientsNeeded.N_kg || 0} max={maxN} color="#2d6a2d" />
                </div>
                {/* P */}
                <div>
                  <p className="text-4xl font-black text-rose-700">{data?.nutrientsNeeded.P_kg || 0}</p>
                  <p className="text-xs font-bold tracking-widest uppercase text-stone-400 mt-1">Phosphorus (P)</p>
                  <NutrientBar value={data?.nutrientsNeeded.P_kg || 0 } max={maxP} color="#9b2335" />
                </div>
                {/* K */}
                <div>
                  <p className="text-4xl font-black text-amber-600">{data?.nutrientsNeeded.K_kg || 0}</p>
                  <p className="text-xs font-bold tracking-widest uppercase text-stone-400 mt-1">Potassium (K)</p>
                  <NutrientBar value={data?.nutrientsNeeded.K_kg || 0} max={maxK} color="#b45309" />
                </div>
              </div>
            </div>

            {/* Application Strategy */}
            <div>
              <h3 className="text-xl font-bold text-stone-900 mb-4">Application Strategy</h3>
              <div className={`grid grid-cols-2 gap-5 w-160 ${animating ? "opacity-50" : "fade-in"}`}>
 {FERTILIZERS.map((f) => (
    <StrategyCard
      key={f.name}
      label="Organic Supply"
      name={f.name}
      amount={data?.fertilizers?.[f.key as keyof InOrganicFertilizerCalculation['fertilizers']] || f.defaultAmount}
      unit={f.unit}
      icon={f.icon}
      borderColor={f.borderColor}
      badgeBg={f.badgeBg}
      badgeText={f.badgeText}
    />
  ))}
              </div>
            </div>
          </div>):(
            <div className="bg-white w-175 -ml-[20%] rounded-3xl p-6 shadow-sm flex flex-col items-center justify-center h-64 border-2 border-dashed border-stone-200">
      <BarChart2 size={40} className="text-stone-300 mb-4" />
      <p className="text-lg font-bold text-stone-400">No Data Yet</p>
      <p className="text-sm text-stone-400 mt-1">
        Enter your field values and click{" "}
        <span className="text-green-700 font-semibold">Generate Precision Plan</span>{" "}
        to get started.
      </p>
    </div>
          )}
        </div>
      </div>
    </div>
  );
}
