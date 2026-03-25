import { useQuery } from "@tanstack/react-query";
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllAiChat } from "../api/api";
import { useAI } from "../store/useAI";
const INITIAL_MESSAGES = [
  {
    id: 1,
    role: "ai",
    text: "Hello, John! I've analyzed the local weather data for your region. It looks like humidity will rise significantly this week. Are you concerned about fungal growth on your corn crops?",
  },
  {
    id: 2,
    role: "user",
    text: "Yes, I noticed some yellow spots on the lower leaves. What treatment do you recommend for early-stage rust?",
  },
  {
    id: 3,
    role: "ai",
    text: "For early-stage Common Rust, I recommend a focused fungicide application. Here is a summary of the best immediate actions:",
    cards: [
      {
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2d6a2f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          </svg>
        ),
        label: "ACTION",
        value: "Reduce Irrigation",
      },
      {
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2d6a2f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 3h6M9 3v8l-4 9h14L15 11V3" />
          </svg>
        ),
        label: "PRODUCT",
        value: "Azoxystrobin (7%)",
      },
    ],
  },
];

function LeafIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 4 13c0-5 6-11 8-11s8 6 8 11a7 7 0 0 1-7 7z" />
      <line x1="12" y1="2" x2="12" y2="20" />
    </svg>
  );
}

export default function AiChatDescription() {
    const {id} = useParams()

  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);
  const {getSpecificDataAll} = useAI()

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    getSpecificDataAll(id)
  }, [messages, typing]);



  const send = () => {
    if (!input.trim()) return;
    setMessages((m) => [...m, { id: Date.now(), role: "user", text: input }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [
        ...m,
        {
          id: Date.now() + 1,
          role: "ai",
          text: "Thanks for the update! I'd recommend monitoring the spread daily and keeping detailed records. Would you like me to generate a full 2-week treatment schedule with dosage details?",
        },
      ]);
    }, 1800);
  };

const params= useParams();
  console.log("params is" , params)

  const {data} = useQuery({
    queryKey: ["aiChatHistory", params.id],
    queryFn: () => getAllAiChat(params.id!),
    enabled: !!params.id,
    // onSuccess: (data: any) => {
    //   console.log("AI chat history data:", data);
    // },
  });

  return (
    <div
      className="flex h-full w-full overflow-hidden font-[font3] "
      style={{ background: "#FAF9F5" }}
    >
      {/* ═══ SIDEBAR ═══ */}


      {/* ═══ MAIN ═══ */}
      <div className="flex flex-col flex-1 overflow-hidden">


        {/* Messages */}
        <div className="flex-1 overflow-y-auto py-8 px-10 space-y-8">
          {messages.map((msg) =>
            msg.role === "ai" ? (
              /* AI message */
              <div key={msg.id} className="flex gap-4" style={{ maxWidth: "620px" }}>
                <div className="flex-1">

                  <div
                    className="rounded-2xl rounded-tl-sm px-5 py-4 text-[15px] font-[font5] leading-relaxed"
                    style={{ background: "#FAF9F5", color: "#1c1c18", border: "1px solid #e2e0d8" }}
                  >
                    {msg.text}
                  </div>

                </div>
              </div>
            ) : (
              /* User message */
              <div key={msg.id} className="flex flex-row-reverse items-start gap-4 ml-auto" style={{ maxWidth: "580px" }}>

                <div className="flex flex-col items-end">
                  <div
                    className="rounded-2xl rounded-tr-sm bg-[#F0EEE6] font-[font5] px-5 py-4 text-[15px] leading-relaxed"
                    style={{  color: "black" }}
                  >
                    {msg.text}
                  </div>
                </div>
              </div>
            )
          )}

          {/* Typing indicator */}
          {typing && (
            <div className="flex gap-4">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-white shrink-0"
                style={{ background: "#2d6a2f" }}
              >
                <LeafIcon size={15} />
              </div>
              <div
                className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm px-5 py-4"
                style={{ background: "#f8f7f3", border: "1px solid #e2e0d8" }}
              >
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-2 h-2 rounded-full inline-block animate-bounce"
                    style={{ background: "#2d6a2f", animationDelay: `${i * 160}ms` }}
                  />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-10 pb-6 pt-2 shrink-0">
          <div
            className="flex items-center gap-3 rounded-2xl px-5 py-3"
            style={{
              background: "#ffffff",
              border: "1px solid #dedad2",
              boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
            }}
          >
            <input
              className="flex-1 bg-transparent font-[font3] text-[16px] outline-none placeholder-gray-400"
              placeholder="Ask anything about your crops..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              style={{ color: "#1c1c18" }}
            />
            <button
              onClick={send}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white transition-all hover:opacity-90 active:scale-95 shrink-0"
              style={{ background: "#2d6a2f" }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
          <p
            className="text-center mt-2.5 uppercase tracking-widest"
            style={{ color: "#c8c5bc", fontSize: "9px" }}
          >
            AgriAI can make mistakes. Verify important information with local agronomists.
          </p>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: #ccc9bf; border-radius: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
      `}</style>
    </div>
  );
}
