import { useState } from "react";
import {Amphora, CircleDollarSign, Image, ImagePlus, Leaf, PlusCircle, Tractor} from "lucide-react";

const SEASONS = ["Spring (Basanta)", "Summer (Grishma)", "Autumn (Sharad)", "Winter (Hemanta)", "Pre-monsoon (Chaitra)", "Monsoon (Barkha)"];
const CATEGORIES = ["Vegetable", "Fruit", "Grain", "Herb", "Flower", "Spice", "Legume", "Root Crop"];
const DIFFICULTIES = ["Beginner Friendly", "Intermediate", "Advanced", "Expert"];

function SectionHeader({ icon, title, color = "bg-green-100 text-green-700" }) {
    return (
        <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${color}`}>
                {icon}
            </div>
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        </div>
    );
}

function Label({ children }) {
    return (
        <label className="block text-[15px] font-[medium] tracking-wide text-[#7A5969] uppercase mb-2">
            {children}
        </label>
    );
}

const inputBase = "w-full font-[font5] rounded-xl bg-[#E3E3DC] border-2  border-transparent px-4 py-4 text-gray-800 placeholder-gray-400 text-[16px] focus:outline-none focus:border-black  transition-all duration-200";

export default function AddCrop() {
    const [steps, setSteps] = useState([{ id: 1, title: "", description: "" }]);
    const [dragOver, setDragOver] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [form, setForm] = useState({
        commonName: "", nepaliName: "", botanicalName: "",
        category: "Vegetable", difficulty: "Beginner Friendly",
        description: "",
        nitrogen: 0, phosphorus: 0, potassium: 0,
        soilType: "", idealClimate: "", season: "Spring (Basanta)",
        wateringSchedule: "", harvestingTips: "",
        minProfit: "50,000", maxProfit: "120,000",
    });

    function handleChange(field, value) {
        setForm(f => ({ ...f, [field]: value }));
    }

    function handleImageDrop(e) {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer?.files?.[0] || e.target?.files?.[0];
        if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
            const reader = new FileReader();
            reader.onload = ev => setImagePreview(ev.target.result);
            reader.readAsDataURL(file);
        }
    }

    function addStep() {
        setSteps(s => [...s, { id: Date.now(), title: "", description: "" }]);
    }

    function updateStep(id, field, value) {
        setSteps(s => s.map(st => st.id === id ? { ...st, [field]: value } : st));
    }

    function removeStep(id) {
        if (steps.length > 1) setSteps(s => s.filter(st => st.id !== id));
    }

    return (
        <div className="min-h-screen py-12 px-4 bg-[#FBF9F2] font-[font5]">
            <div className="max-w-5xl mx-15">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-5xl w-full  font-[medium] text-green-900 leading-tight mb-3">
                        New Botanical Entry
                    </h1>
                    <p className="text-[17px]  text-[#7A5649] leading-relaxed font-[font6] max-w-2xl ">
                        Expand the AgriLearn Arboretum. Contribute your expertise to our growing database of agricultural knowledge.
                    </p>
                </div>

                {/* Basic Info */}
                <div className=" rounded-3xl p-8  ">
                    {/*Header*/}
                    <div className={" mb-7 flex items-center  gap-4"}>
                        <div className={"bg-[#BCEFC0] pr-3 pl-3 pt-3  pb-3 rounded-full"}>
                            <Leaf/>
                        </div>
                        <h1 className={"text-2xl font-[medium]"}>Basic Info</h1>
                    </div>

                    {/* Image Upload */}
                    <div
                        className={`relative rounded-2xl border-2  border-dashed mb-6 overflow-hidden cursor-pointer transition-all duration-200 h-[220px] flex items-center justify-center
                            ${dragOver ? "border-green-400 bg-green-50" : "border-gray-200 bg-[#D1D2C8]"}`}
                        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={handleImageDrop}
                        onClick={() => document.getElementById("imgInput").click()}
                    >
                        <input id="imgInput" type="file" accept="image/png,image/jpeg" className="hidden" onChange={handleImageDrop} />

                        {imagePreview ? (
                            <img src={imagePreview} alt="Crop" className="w-full h-full object-cover" />
                        ) : (
                            <div className="flex flex-col items-center justify-center gap-2 text-center">
                                <div className="text-[#6C7368]">
                                    <ImagePlus size={32} />
                                </div>
                                <p className="text-[17px] font-[font6] text-gray-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                                    Upload Crop Portrait
                                </p>
                                <p className="text-[14px] text-gray-400 font-[font3]" >
                                    PNG, JPG up to 10MB
                                </p>
                            </div>
                        )}

                        {!imagePreview && (
                            <div className="absolute bottom-4 right-4 opacity-10 text-8xl select-none pointer-events-none">🌿</div>
                        )}
                    </div>

                    {/* Names */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <Label >Common Name</Label>
                            <input
                                className={`${inputBase} font-[font5]`}
                                placeholder="e.g. Golden Marigold"
                                value={form.commonName}
                                onChange={e => handleChange("commonName", e.target.value)}
                            />
                        </div>
                        <div>
                            <Label>Nepali Name</Label>
                            <input
                                className={`${inputBase} font-[font5]`}
                                placeholder="e.g. गेंदा"
                                value={form.nepaliName}
                                onChange={e => handleChange("nepaliName", e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <Label>Botanical Name</Label>
                        <input
                            className={`${inputBase} `}
                            placeholder="e.g. Tagetes erecta"
                            value={form.botanicalName}
                            onChange={e => handleChange("botanicalName", e.target.value)}
                        />
                    </div>

                    {/* Category & Difficulty */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <Label>Category</Label>
                            <select className={`${inputBase}  appearance-none cursor-pointer`} value={form.category} onChange={e => handleChange("category", e.target.value)}>
                                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                            </select>
                        </div>
                        <div>
                            <Label>Difficulty</Label>
                            <select className={`${inputBase}  appearance-none cursor-pointer`} value={form.difficulty} onChange={e => handleChange("difficulty", e.target.value)}>
                                {DIFFICULTIES.map(d => <option key={d}>{d}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <Label>Description</Label>
                        <textarea
                            className={`${inputBase}  resize-none`}
                            rows={4}
                            placeholder="Describe the crop's characteristics, historical significance, or unique properties..."
                            value={form.description}
                            onChange={e => handleChange("description", e.target.value)}
                        />
                    </div>
                </div>

                {/* Soil & Nutrients */}
                <div className="bg-[#F5F4ED] rounded-3xl p-8 mb-6 ">
                    <div className={" mb-7 flex items-center  gap-4"}>
                        <div className={"bg-[#FDCDBC] text-[#7A5649] pr-3 pl-3 pt-3  pb-3 rounded-full"}>
                            <Tractor/>
                        </div>
                        <h1 className={"text-2xl font-[medium]"}>Soil & Nutrients</h1>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                        {[
                            ["nitrogen", "Nitrogen (N)"],
                            ["phosphorus", "Phosphorus (P)"],
                            ["potassium", "Potassium (K)"]
                        ].map(([field, label]) => (
                            <div key={field}>
                                <Label>{label}</Label>
                                <input
                                    type="number"
                                    className={`${inputBase} font-[font5]`}
                                    value={form[field]}
                                    onChange={e => handleChange(field, e.target.value)}
                                    min={0}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <Label>Soil Type</Label>
                            <input className={`${inputBase} font-[font5]`} placeholder="e.g. Loamy, Sandy, Clay" value={form.soilType} onChange={e => handleChange("soilType", e.target.value)} />
                        </div>
                        <div>
                            <Label>Ideal Climate</Label>
                            <input className={`${inputBase} font-[font5]`} placeholder="e.g. Temperate, Tropical" value={form.idealClimate} onChange={e => handleChange("idealClimate", e.target.value)} />
                        </div>
                        <div>
                            <Label>Season</Label>
                            <select className={`${inputBase} font-[font5] appearance-none cursor-pointer`} value={form.season} onChange={e => handleChange("season", e.target.value)}>
                                {SEASONS.map(s => <option key={s}>{s}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Growing Guide */}
                <div className=" rounded-3xl p-8 mb-6 ">
                    <div className={" mb-7 flex items-center  gap-4"}>
                        <div className={"bg-[#BDF19C] text-[#244E0B] pr-3 pl-3 pt-3  pb-3 rounded-full"}>
                            <Amphora />
                        </div>
                        <h1 className={"text-2xl font-[medium]"}>Growing Guide</h1>
                    </div>


                    <div className="space-y-4 mb-4">
                        {steps.map((step, idx) => (
                            <div key={step.id} className="bg-gray-50 rounded-2xl p-5 relative animate-fadeIn">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-[13px] font-[medium] px-3 py-1 rounded-4xl bg-[#3B6722] text-[#B0E490] uppercase tracking-wide ">Step {idx + 1}</span>
                                    {steps.length > 1 && (
                                        <button
                                            onClick={() => removeStep(step.id)}
                                            className="text-gray-400 cursor-pointer hover:text-red-500 text-xl leading-none transition-colors"
                                        >
                                            ×
                                        </button>
                                    )}
                                </div>
                                <input
                                    className={`${inputBase} text-[#73757a] font-[medium] mb-3`}
                                    placeholder="Title: e.g. Seed Preparation"
                                    value={step.title}
                                    onChange={e => updateStep(step.id, "title", e.target.value)}
                                />
                                <textarea
                                    className={`${inputBase} font-[font5] resize-none`}
                                    rows={3}
                                    placeholder="Describe this growth phase..."
                                    value={step.description}
                                    onChange={e => updateStep(step.id, "description", e.target.value)}
                                />
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={addStep}
                        className="w-full cursor-pointer rounded-xl border-2 border-dashed border-[#C1C9BE] text-[#204E31] text-sm font-medium py-3 hover:bg-green-50 hover:border-green-400 transition-all duration-200 flex items-center justify-center gap-2 font-sans"
                    >
                        <span className="text-lg">
                            <PlusCircle/>
                        </span>
                        <span className={"font-[font9] font-black text-[15px]"}>
                            Add Another Step

                        </span>
                    </button>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <div>
                            <Label>Watering Schedule</Label>
                            <input className={`${inputBase} font-sans`} placeholder="e.g. Twice weekly, early morning" value={form.wateringSchedule} onChange={e => handleChange("wateringSchedule", e.target.value)} />
                        </div>
                        <div>
                            <Label>Harvesting Tips</Label>
                            <input className={`${inputBase} font-sans`} placeholder="e.g. Harvest when petals are firm" value={form.harvestingTips} onChange={e => handleChange("harvestingTips", e.target.value)} />
                        </div>
                    </div>
                </div>

                {/* Market Potential */}
                <div className="bg-[#EFF7E8] rounded-3xl p-8 mb-6">
                    <div className={" mb-7 flex items-center  gap-4"}>
                        <div className={"bg-[#A0D3A5] text-[#244E0B] pr-3 pl-3 pt-3  pb-3 rounded-full"}>
                            <CircleDollarSign />
                        </div>
                        <h1 className={"text-2xl font-[medium]"}>Market Potential</h1>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Minimum Profit (per acre)</Label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500 font-[font5]">Rs.</span>
                                <input
                                    className={`${inputBase}  pl-12 bg-white`}
                                    placeholder="50,000"
                                    value={form.minProfit}
                                    onChange={e => handleChange("minProfit", e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <Label>Maximum Profit (per acre)</Label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500 font-[font5]">Rs.</span>
                                <input
                                    className={`${inputBase} font-[font5] pl-12 bg-white`}
                                    placeholder="120,000"
                                    value={form.maxProfit}
                                    onChange={e => handleChange("maxProfit", e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-4 pb-8">
                    <button className="px-7 py-3 rounded-2xl border-2 border-gray-300 text-gray-600 text-sm  hover:border-red-300 hover:text-red-500 transition-all duration-200 font-[font5] cursor-pointer">
                        Discard Draft
                    </button>
                    <button className="px-8 py-3 rounded-2xl bg-green-900 text-white text-sm font-[font5] hover:-translate-y-0.5 hover:shadow-xl transition-all cursor-pointer duration-200 ">
                        Publish to Catalog
                    </button>
                </div>
            </div>
        </div>
    );
}