import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAI } from "../store/useAI";
import { useSendMessageToAI, useAiChatAll } from "../hooks/hooks";
import ReactMarkdown from "react-markdown";
import { useQueryClient } from "@tanstack/react-query";
const INITIAL_MESSAGES = [
  {
    "id": "95ab829e-6526-434b-9b5c-dec6012609d1",
    "communicationId": "1905930f-42dc-4fed-8c03-5473341e9312",
    "question": "hi",
    "response": "Namaste! I am your agricultural consultant...",
    "createdAt": "2026-03-25T21:15:14.298Z"
  },
  {
    "id": "87b76ad4-fd6a-40c3-b2d3-9d656e4cad82",
    "communicationId": "1905930f-42dc-4fed-8c03-5473341e9312",
    "question": "namaste",
    "response": "Namaste! As an agricultural consultant...",
    "createdAt": "2026-03-26T15:24:48.289Z"
  },
  {
    "id": "a191d400-9314-415e-9c07-08ae68ce02b2",
    "communicationId": "1905930f-42dc-4fed-8c03-5473341e9312",
    "question": "what is compost manure",
    "response": "Namaste! As an agricultural consultant working in the diverse landscapes of Nepal...",
    "createdAt": "2026-03-26T15:25:39.150Z"
  }
]

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
  const {questionForAI}: any = useAI()

  const [messages, setMessages] = useState<any | null>(null);
  const [input, setInput] = useState(questionForAI || "");
  const [typing] = useState(false);
  const bottomRef = useRef(null);

  const{data:chatAll} = useAiChatAll(id || "")

  console.log("all data is",chatAll)
// const likelyMessage = chatAll?.data.map((item)=>(
// id:item.id,
// role
// ))


  useEffect(() => {
    if (chatAll?.data) {
        setMessages(chatAll.data);
    }
}, [chatAll])

    const queryClient = useQueryClient()




  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const {mutate , isPending} = useSendMessageToAI()





const send = () => {
    if (!input.trim()) return;

    const finalData = { id, question: input };

    // add user message with proper structure
    const tempMessage = {
        id: Date.now().toString(),
        communicationId: id || "",
        question: input,
        createdAt: new Date().toISOString()
    };

    setMessages((m) => [...m, tempMessage]);
    setInput("");
    mutate(finalData, {
        onSuccess: (data) => {
            setMessages((m) => [
                ...(m || []).slice(0, -1), // Remove the temporary message
                {
                    id: data?.data?.id || Date.now().toString(),
                    communicationId: data?.data?.communicationId || id || "",
                    question: input,
                    response: data?.data?.response || "No response",
                    createdAt: data?.data?.createdAt || new Date().toISOString()
                },

            ]);
            queryClient.invalidateQueries({
                queryKey: ["ai-chats"],
            });
        },
        onError: () => {
            setMessages((m) => [
                ...(m || []).slice(0, -1), // Remove the temporary message
                {
                    id: (Date.now() + 1).toString(),
                    communicationId: id || "",
                    question: input,
                    response: "Something went wrong.",
                    createdAt: new Date().toISOString()
                },
            ]);
        }
    });

};



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
{messages?.map((msg) => (
  <div key={msg.id}>
    {/* User message */}
    <div className="flex flex-row-reverse items-start gap-4 ml-auto" style={{ maxWidth: "580px" }}>
      <div className="flex flex-col items-end">
        <div
          className="rounded-2xl rounded-tr-sm bg-[#F0EEE6] font-[font5] px-5 py-4 text-[15px] leading-relaxed"
          style={{ color: "black" }}
        >
          {msg.question}
        </div>
      </div>
    </div>

    {/* AI message */}
    {msg.response && (
    <div className="flex gap-4 mt-4" style={{ maxWidth: "820px" }}>
      <div className="flex-1">
        <div
          className="rounded-2xl rounded-tl-sm px-5 py-4 text-[15px] font-[font5] leading-relaxed"
          style={{ background: "#FAF9F5", color: "#1c1c18", border: "1px solid #e2e0d8" }}
        >
          <ReactMarkdown>{msg.response}</ReactMarkdown>
        </div>
      </div>
    </div>
    )}
  </div>
))}

          {/* Typing indicator */}
          {isPending && (
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
