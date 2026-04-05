import { useState } from "react";
import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { chatHistory } from "../../api/api";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
     const [activeChat, setActiveChat] = useState(1);
  const [activeTab, setActiveTab] = useState("chat");

  const {data} = useQuery({
    queryKey: ["ai-chats"],
    queryFn: chatHistory,
    staleTime:0,
    refetchOnWindowFocus:false,
  })


  console.log(data);
  const navigate = useNavigate();


  
  return (
    <div>

              <aside
        className="flex flex-col pt-5 h-[93.5vh]  shrink-0"
        style={{ width: "300px", background: "#e8e7e0", borderRight: "1px solid #d4d2ca" }}
      >
        {/* AI chat and disease detection selection */}
{/* AI chat and disease detection selection */}
<div className="px-3 pb-3">
  <div
    className="flex rounded-xl p-1"
    style={{ background: "#dddbd3" }}
  >
    {[{ key: "chat", label: "AI Chat", path:"/ai" }, { key: "disease", label: "Disease Detection", path:"/ai/disease" }].map((t) => (
      <button
        key={t.key}
        onClick={() => {
          setActiveTab(t.key);
          navigate(t.path);
        }}
        className="flex-1 text-[14px] font-[font3] py-2 rounded-lg transition-all"
        style={{
          background: activeTab === t.key ? "#ffffff" : "transparent",
          color: activeTab === t.key ? "#2d6a2f" : "#9a9a8c",
          boxShadow: activeTab === t.key ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
        }}
      >
        {t.label}
      </button>
    ))}
  </div>
</div>

        {/* Chat list */}
        <div className="flex-1 font-[Inter] overflow-y-auto px-2 space-y-0.5 pb-2">
            <h1 className=" ml-2 font-[font4] text-[#2F2F2E] text-[13px]">Recents</h1>
            <div className="mt-3">

                {data?.data?.length === 0 ? (
                    <div className="text-center text-[#9a9a8c] text-[14px] py-4">
                        No chats yet
                    </div>
                ) : (
          data?.data?.map((chat: any) => {
            const active = activeChat === chat.id;
            return (
              <button
                key={chat.id}
                onClick={() => {
                  console.log(chat);
                  setActiveChat(chat.id);
                  navigate(`/ai/text/${chat.id}`);
                }}
                className="w-full px-2  cursor-pointer rounded-xl py-2.5 transition-all"
                style={{
                  background: active ? "#F0EEE6" : "transparent",
                  boxShadow: active ? "0 1px 4px rgba(0,0,0,0.07)" : "none",
                }}
              >
                <div className="flex items-center gap-2">
                </div>
                <div className="flex items-center justify-between mt-0.5 pl-1">
                  <span
                    className="text-[13.7px]  font-[font4] truncate"
                    style={{ color: "#aeac a4", maxWidth: "200px" }}
                  >
                    {chat.title}
                  </span>
                </div>
              </button>
            );
          })
                )}
          </div>
        </div>

        {/* Settings */}


        {/* New Consultation */}
        <div className="px-4 py-3">
          <button
          onClick={() => navigate("/ai")}
            className="w-full flex font-[font4] tracking-wide items-center justify-center gap-2 rounded-xl py-2.5 text-[17px]font-semibold text-white transition-all hover:opacity-90 active:scale-95"
            style={{ background: "#2d6a2f" }}
          >
            <Plus size={15}/>
            {/* <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg> */}
            New Chat
          </button>
        </div>

        {/* User */}

      </aside>
    </div>
  )
}

export default Sidebar
