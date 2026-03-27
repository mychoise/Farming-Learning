import { Microscope } from "lucide-react";
import { useState, useRef } from "react";
import { useDetectDisease } from "../hooks/hooks";
import { useQueryClient } from "@tanstack/react-query";

const protocols = [
  {
    icon: "🌿",
    bg: "bg-[#eef4ee]",
    iconBg: "bg-[#d4e8d4]",
    title: "Potassium Bicarbonate Application",
    desc: "Apply organic spray during morning hours to disrupt spore germination.",
  },
  {
    icon: "💨",
    bg: "bg-[#fdf3f0]",
    iconBg: "bg-[#fde0d8]",
    title: "Canopy Thinning",
    desc: "Reduce local humidity by increasing airflow through selective pruning of North-side vines.",
  },
  {
    icon: "🧪",
    bg: "bg-[#eef4ee]",
    iconBg: "bg-[#d4e8d4]",
    title: "Neem Oil Integration",
    desc: "Bi-weekly application to strengthen plant resistance and prevent further spread.",
  },
];

const sampleImages = [
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='70' viewBox='0 0 80 70'%3E%3Crect width='80' height='70' fill='%23c8d8c8'/%3E%3Cellipse cx='40' cy='35' rx='22' ry='18' fill='%23a0b89a' opacity='0.7'/%3E%3Cellipse cx='40' cy='35' rx='12' ry='10' fill='%23788f72' opacity='0.6'/%3E%3Cellipse cx='40' cy='35' rx='5' ry='4' fill='%23556b52' opacity='0.8'/%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='70' viewBox='0 0 80 70'%3E%3Crect width='80' height='70' fill='%23d4d0c8'/%3E%3Cellipse cx='40' cy='35' rx='25' ry='20' fill='%23b8b49a' opacity='0.5'/%3E%3Cellipse cx='40' cy='35' rx='16' ry='13' fill='%239a9680' opacity='0.6'/%3E%3Cellipse cx='40' cy='35' rx='8' ry='6' fill='%2378786a' opacity='0.7'/%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='70' viewBox='0 0 80 70'%3E%3Crect width='80' height='70' fill='%23c4ccc4'/%3E%3Ccircle cx='30' cy='28' r='12' fill='%23a0b09a' opacity='0.6'/%3E%3Ccircle cx='50' cy='42' r='10' fill='%238a9e84' opacity='0.5'/%3E%3Ccircle cx='38' cy='38' r='7' fill='%23708870' opacity='0.7'/%3E%3C/svg%3E",
];



function CircleProgress({ value }) {
  const r = 38;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  return (
    <svg width="90" height="90" viewBox="0 0 90 90">
      <circle cx="45" cy="45" r={r} fill="none" stroke="#e0e8d8" strokeWidth="7" />
      <circle
        cx="45"
        cy="45"
        r={r}
        fill="none"
        stroke="#2d5a27"
        strokeWidth="7"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 45 45)"
        style={{ transition: "stroke-dashoffset 1s ease" }}
      />
      <text x="45" y="40" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1a3a18" className="font-[font3]" >
        {value}%
      </text>
      <text x="45" y="54" textAnchor="middle" fontSize="7" fill="#6b7c69" className="font-[font3]" letterSpacing="0.5">
        CONFIDENCE
      </text>
    </svg>
  );
}

export default function AiDiseaseDetection() {
  const [dragging, setDragging] = useState(false);
  const [uploaded, setUploaded] = useState<{ url: string; name: string } | false>(false);
  const [context, setContext] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("");
  const [diagnosed, setDiagnosed] = useState(true);
  const fileRef = useRef<HTMLInputElement>(null);

const queryClient = useQueryClient();
  const {mutate} = useDetectDisease();
  const data = queryClient.getQueryData(["disease"]) as any;
  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length) loadFile(e.dataTransfer.files[0]);
  }

  function handleFile(e) {
    if (e.target.files.length) loadFile(e.target.files[0]);
  }

    function loadFile(file) {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setUploaded({ url, name: file.name });
  }

  function handleSend() {
    setDiagnosed(true);
    console.log("Sending diagnosis request...");
    console.log("file is" , fileRef.current?.files[0])
    console.log("context is" , context)

const finalData = new FormData();

const image = (fileRef.current as any)?.files?.[0];
if (image) {
  finalData.append("image", image);
}

finalData.append("descriptionOfDisease", context);
finalData.append("plantName", selectedCrop)

for (const pair of finalData.entries()) {
  console.log(pair[0], pair[1]);
}
    mutate(finalData);
    console.log('your fucking data is', data)
  }


  function removeImage(e)    {
    e.stopPropagation();
    setUploaded(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  return (
    <div
      className="h-[200vh] overflow-auto bg-[#FAFAF5] font-[font3] w-full"
    >
      {/* Header */}
      <div className="px-8 pt-10 pb-6 max-w-6xl mx-auto">
        <h1
          className="text-4xl font-bold text-[#1a3a18] font-[font5] mb-2 tracking-tight"
        >
          Crop Health Diagnosis
        </h1>
        <p className="text-[#5a6b58] text-base max-w-xl leading-relaxed font-[font3]">
          Deploy advanced neural network analysis to identify plant pathogens and receive immediate organic treatment recommendations.
        </p>
      </div>

      {/* Main Grid */}
      <div className="px-8 h-full pb-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT PANEL */}
        <div className="flex flex-col gap-5">
          {/* Upload Box */}
          <div className="bg-white rounded-2xl border border-[#dde8d8] p-5 shadow-sm">
            <p
              className="text-xs font-semibold text-[#8a9e88] mb-3 font-[font4] tracking-widest uppercase"
            >
              Image Input
            </p>
            <div
              onClick={() => ! uploaded && fileRef.current.click()}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              className={`rounded-xl border-2 font-[font3] border-dashed transition-all flex flex-col items-center justify-center px-4 mb-4 overflow-hidden ${
                 uploaded ? "border-[#2d5a27] bg-[#f0f7ee] cursor-default" : "cursor-pointer py-10"
              } ${dragging ? "border-[#2d5a27] bg-[#f0f7ee]" : ! uploaded ? "border-[#c4d4c0] bg-[#fafaf6]" : ""}`}
            >
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />

              { uploaded ? (
                /* ── Uploaded state: show preview + remove button ── */
                <div className="relative w-full">
                  <img
                    src={uploaded.url}
                    alt="uploaded leaf"
                    className="w-full max-h-64 object-contain rounded-lg py-3"
                  />
                  {/* File name bar */}
                  <div className="flex items-center justify-between px-3 py-2 bg-[#eef4ee] rounded-b-lg border-t border-[#d4e8d4]">
                    <span className="text-xs text-[#2d5a27] font-semibold truncate max-w-[200px]" style={{ fontFamily: "sans-serif" }}>
                      ✓ { uploaded.name}
                    </span>
                    <button
                      onClick={removeImage}
                      className="ml-2 flex-shrink-0 w-6 h-6 rounded-full bg-white border border-[#c4d4c0] flex items-center justify-center text-[#7a8e78] hover:bg-red-50 hover:border-red-300 hover:text-red-500 transition-colors"
                      title="Remove image"
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <line x1="1" y1="1" x2="9" y2="9" />
                        <line x1="9" y1="1" x2="1" y2="9" />
                      </svg>
                    </button>
                  </div>
                </div>
              ) : (
                /* ── Empty state ── */
                <>
                  <div className="text-3xl mb-3">📷</div>
                  <p className="font-[font3] text-[#2d5a27] text-base mb-1">
                    Upload Leaf Sample
                  </p>
                  <p className="text-[#8a9e88] text-[15px] text-center">
                    Drag and drop or click to browse high-resolution JPG/PNG
                  </p>
                  {/* Sample thumbnails */}
                  <div className="flex gap-2 mt-5">
                    {sampleImages.map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt={`sample-${i}`}
                        className="w-16 h-14 rounded-lg object-cover border border-[#d0dcc8]"
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Crop Selection */}
          <div className="bg-white rounded-2xl border border-[#dde8d8] p-5 shadow-sm">
            <p
              className="text-xs font-semibold text-[#8a9e88] mb-3 tracking-widest uppercase font-[font3]"
            >
              Crop Selection
            </p>
            <div className="relative">
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="w-full rounded-xl border border-[#d4e0d0] bg-[#fafaf6] p-4 text-[#3a4e38] text-[15px] outline-none focus:border-[#2d5a27] transition-colors font-[font3] appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%232d5a27' stroke-width='2' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 16px center',
                  paddingRight: '40px'
                }}
              >
                <option value="" className="text-[#8a9e88]">
                  Select crop type...
                </option>
                <option value="Tomato" className="text-[#3a4e38]">
                  🍅 Tomato
                </option>
                <option value="Potato" className="text-[#3a4e38]">
                  🥔 Potato
                </option>
                <option value="Corn" className="text-[#3a4e38]">
                  🌽 Corn
                </option>
                <option value="Wheat" className="text-[#3a4e38]">
                  🌾 Wheat
                </option>
                <option value="Rice" className="text-[#3a4e38]">
                  🌾 Rice
                </option>
                <option value="Cucumber" className="text-[#3a4e38]">
                  🥒 Cucumber
                </option>
                <option value="Pepper" className="text-[#3a4e38]">
                  🌶️ Bell Pepper
                </option>
                <option value="Lettuce" className="text-[#3a4e38]">
                  🥬 Lettuce
                </option>
                <option value="Strawberry" className="text-[#3a4e38]">
                  🍓 Strawberry
                </option>
                <option value="Grape" className="text-[#3a4e38]">
                  🍇 Grape
                </option>
                <option value="Apple" className="text-[#3a4e38]">
                  🍎 Apple
                </option>
              </select>
              {!selectedCrop && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                    <path d="M1 1l5 5 5-5" stroke="#2d5a27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
            {selectedCrop && (
              <div className="mt-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#2d5a27]"></span>
                <span className="text-xs text-[#5a6b58] font-[font3]">
                  {selectedCrop.charAt(0).toUpperCase() + selectedCrop.slice(1)} selected for analysis
                </span>
              </div>
            )}
          </div>

          {/* Environmental Context */}
          <div className="bg-white rounded-2xl border border-[#dde8d8] p-5 shadow-sm">
            <p
              className="text-xs font-semibold text-[#8a9e88] mb-3 tracking-widest uppercase font-[font3]"

            >
              Environmental Context
            </p>
            <textarea
              className="w-full rounded-xl border border-[#d4e0d0] bg-[#fafaf6] p-4 text-[#3a4e38] text-[15px] resize-y outline-none focus:border-[#2d5a27] transition-colors h-30 font-[font3]"
              placeholder="Describe symptoms, humidity levels, recent rain, or fertilization history..."
              value={context}
              onChange={(e) => setContext(e.target.value)}
            />
          </div>

          {/* Start Diagnosis Button */}
          <button
            onClick={() => {
              handleSend();
            }}
            className="w-full py-4 rounded-xl text-white text-base flex items-center justify-center gap-2 transition-all active:scale-95 font-[font3]"
            style={{
              background: "linear-gradient(135deg, #2d5a27 0%, #1a3a18 100%)",
              boxShadow: "0 4px 16px rgba(45,90,39,0.25)",
            }}
          >
            <span>
                <Microscope/>
            </span>
            Start Diagnosis
          </button>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex flex-col gap-5">
          {diagnosed && (
            <>
              {/* Result Card */}
              <div
                className="bg-white rounded-2xl border-t-4 border-[#2d5a27] shadow-sm p-6"
                style={{ borderTop: "4px solid #2d5a27" }}
              >
                <div className="flex items-start justify-between mb-1">
                  <p
                    className="text-xs font-[font3] text-[#8a9e88] tracking-widest uppercase"

                  >
                    Real-Time Result
                  </p>
                  <span
                    className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full"
                    style={{
                      background: "#eef4ee",
                      color: "#2d5a27",
                    }}
                  >
                    <span className="w-2 h-2 rounded-full bg-[#2d5a27] inline-block" />
                    CONFIRMED
                  </span>
                </div>

                <h2
                  className="text-4xl font-bold text-[#1a3a18] mt-1 mb-5 font-[font5] leading-tight"
                >
                  Powdery Mildew<br />detected
                </h2>

                <div className="flex font-[font3] items-start gap-5">
                  <CircleProgress value={94} />
                  <p
                    className="text-[#4a5e48] text-[2xl] leading-relaxed italic mt-2 flex-1 font-[font3]"
                  >
                    "Visual signatures match <em>Podosphaera xanthii</em> colonies. Early-stage detection on lower leaf surface."
                  </p>
                </div>
              </div>

              {/* Recommended Protocol */}
              <div className="bg-white rounded-2xl border border-[#dde8d8] p-6 shadow-sm">
                <p
                  className="text-xs font-[font3] text-[#8a9e88] mb-4 tracking-widest uppercase"

                >
                  Recommended Protocol
                </p>
                <div className="flex flex-col gap-3">
                  {protocols.map((p, i) => (
                    <div key={i} className={`flex items-start gap-4 rounded-xl p-4 ${p.bg}`}>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${p.iconBg}`}>
                        {p.icon}
                      </div>
                      <div>
                        <p
                          className="font-[font5] text-[#1a3a18] texxt-[17px] mb-1"
                        >
                          {p.title}
                        </p>
                        <p className="text-[#5a6b58] text-[15px] leading-relaxed"  >
                          {p.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </>
          )}

          {!diagnosed && (
            <div className="bg-white rounded-2xl border border-[#dde8d8] p-10 flex flex-col items-center justify-center text-center h-64 shadow-sm">
              <div className="text-5xl mb-4">🌱</div>
              <p className="text-[#2d5a27] font-[font5] text-lg">
                Awaiting Diagnosis
              </p>
              <p className="text-[#8a9e88] text-sm mt-2"  >
                Upload a leaf sample and start diagnosis to see results here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
