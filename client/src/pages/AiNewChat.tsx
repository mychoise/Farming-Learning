import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {useAI} from "../store/useAI"
import { toast } from "react-hot-toast";
import { createNewSession } from "../api/api";
import { useNewSession } from "../hooks/hooks";
import { useQueryClient } from "@tanstack/react-query";

const FEATURES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2d6a2f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 4 13c0-5 6-11 8-11s8 6 8 11a7 7 0 0 1-7 7z" />
        <line x1="12" y1="2" x2="12" y2="20" />
      </svg>
    ),
    iconBg: "bg-[#e8f0e8]",
    title: "Crop Advisor",
    desc: "Optimization & rotation strategies.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7a6a50" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M5 12H3M21 12h-2M12 5V3M12 21v-2" />
        <path d="M7.05 7.05L5.64 5.64M18.36 18.36l-1.41-1.41M16.95 7.05l1.41-1.41M5.64 18.36l1.41-1.41" />
      </svg>
    ),
    iconBg: "bg-[#edeae3]",
    title: "Field Diagnosis",
    desc: "Disease detection from drone imagery.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4a6fa5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
    iconBg: "bg-[#e8ecf5]",
    title: "Market Intelligence",
    desc: "Real-time pricing and demand forecasts.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4a6fa5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    iconBg: "bg-[#e8ecf5]",
    title: "Weather Insights",
    desc: "Hyper-local climate impact modeling.",
  },
];

export default function AiNewChat() {
    const navigate = useNavigate()
  const [query, setQuery] = useState("");
    const {setSessionID , paramForId , setQuestionForAI} = useAI()

    const {mutateAsync  } = useNewSession()

    const queryClient = useQueryClient()

useEffect(() => {
  queryClient.invalidateQueries({
    queryKey: ["ai-chats"],
  });
}, [queryClient]);


  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  useEffect(() => {
const params  = paramForId
console.log("id is" , params)
  }, [])


  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-hidden bg-[#f0efe8] font-sans">
      {/* Grain texture */}
      <div className="pointer-events-none fixed inset-0 opacity-30 bg-[url('data:image/svg+xml,%3Csvg_viewBox%3D%270_0_200_200%27_xmlns%3D%27http://www.w3.org/2000/svg%27%3E%3Cfilter_id%3D%27n%27%3E%3CfeTurbulence_type%3D%27fractalNoise%27_baseFrequency%3D%270.75%27_numOctaves%3D%274%27_stitchTiles%3D%27stitch%27/%3E%3C/filter%3E%3Crect_width%3D%27100%25%27_height%3D%27100%25%27_filter%3D%27url(%23n)%27_opacity%3D%270.15%27/%3E%3C/svg%3E')] bg-size-[200px_200px]" />

      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-16 pb-8 relative z-10">
        <h1 className="text-center font-bold leading-tight mb-4 text-[clamp(2.2rem,5vw,3.6rem)] tracking-tight text-[#1a1a14]">
          {greeting},{" "}
          <span className="text-[#2d6a2f]">Agronomist.</span>
        </h1>

        <p className="text-center max-w-md mb-10 leading-relaxed text-[#7a7a6e] text-base">
          The current moisture levels in Sector 7 look promising for late planting.
          What analysis shall we run?
        </p>

        <div className="flex items-center gap-3 w-full max-w-2xl rounded-full px-5 py-3 mb-14 bg-white shadow-[0_2px_20px_rgba(0,0,0,0.08)] border border-[#e8e6de]">
          <div className="text-[#2d6a2f] shrink-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.88A2.5 2.5 0 0 1 9.5 2" />
              <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.88A2.5 2.5 0 0 0 14.5 2" />
            </svg>
          </div>
          <input
            className="flex-1 bg-transparent font-[font4] text-[17px] outline-none text-[#1a1a14]"
            placeholder="How can I help you today?"
            value={query}
            onChange={(e) =>
                {
                    setQuery(e.target.value)
                }
            }
          />
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0 transition-all hover:opacity-90 active:scale-95 bg-[#2d6a2f]"
            onClick={async() => {
                if(!query.trim()) {
                    toast.error("Please enter a query");
                    return;
                }
               const data =  await mutateAsync()
               setSessionID(data?.data?.id)
               setQuestionForAI(query)
               navigate(`/ai/text/${data?.data?.id}`)
            }}
          >
            <span className="text-white">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="text-left rounded-2xl font-[font4] px-5 py-5 transition-all  bg-white border border-[#e8e6de] shadow-[0_1px_6px_rgba(0,0,0,0.05)]"
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${f.iconBg}`}>
                {f.icon}
              </div>
              <p className="text-[15px] font-[font5] mb-1 text-[#1a1a14]">{f.title}</p>
              <p className="text-[13px] font-[font33 leading-relaxed text-[#8a8a7e]">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-between px-8 py-3 border-t border-[#e2e0d8]">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full animate-pulse bg-[#2d6a2f]" />
            <span className="text-[9.5px] font-semibold uppercase tracking-widest text-[#5a5a52]">
              Neural Engine Online
            </span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#5a5a52" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="2" />
              <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14" />
            </svg>
            <span className="text-[9.5px] font-semibold uppercase tracking-widest text-[#5a5a52]">
              KTM-01 Satellite Link
            </span>
          </div>
        </div>
        <span className="text-[10px] italic text-[#aaa89c]">
          Powered by TerraForma Precision Agriscience V4.2
        </span>
      </div>


    </div>
  );
}
