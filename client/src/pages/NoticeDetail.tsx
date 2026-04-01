import { useState  } from "react";
import {
  ArrowLeft,
  Clock,
  Shield,
  Send,
  ChevronRight,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetNoticeById } from "../hooks/hooks";
import {useQueryClient} from "@tanstack/react-query";


const recentPolicies = [
  {
    tag: "MARKET ALERT",
    tagColor: "text-emerald-700",
    time: "2d ago",
    title: "Wheat Export Regulation Adjustments",
    desc: "New quotas announced for central grain elevators starting next week...",
  },
  {
    tag: "INFRASTRUCTURE",
    tagColor: "text-emerald-700",
    time: "4d ago",
    title: "Rural Broadband Grant Applications Open",
    desc: "Funding available for smart-farm connectivity infrastructure in zone B...",
  },
  {
    tag: "WEATHER",
    tagColor: "text-emerald-700",
    time: "1w ago",
    title: "Extended Drought Relief Measures",
    desc: "Tax credits extended for farmers implementing water recycling systems...",
  },
];

export default function NoticeDetail() {
  const [email, setEmail] = useState("");
  const {id} = useParams();
  console.log("id is",id)

  const {data:notice} = useGetNoticeById(id!)

  console.log("data is",notice)

  const navigate = useNavigate()
  const queryClient = useQueryClient();
const data = queryClient.getQueryData(["notices",1])

console.log("hello my data is", data)

const filteredData  = data?.data?.filter((item:any)=>item.category === notice?.data?.category)

console.log("all data sisisi" , filteredData)




  return (
    <div className="min-h-screen bg-stone-100 font-serif">
      {/* Top Nav */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-8 py-4  bg-stone-100">
        <button onClick={()=> navigate("/notices")} className="flex cursor-pointer items-center gap-2 text-sm font-medium text-stone-700 hover:text-stone-900 transition-colors font-[font5]">
          <ArrowLeft size={16} />
          Back to Notices
        </button>
      </header>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-6  flex gap-10">
        {/* Main Content */}
        <article className="flex-1 max-w-[860px]">
          {/* Tag + Date */}
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs font-bold tracking-widest px-3 py-1 rounded-full text-emerald-800 bg-[#ACF4A4] font-[font5]">
              {notice?.data?.category.toUpperCase()} UPDATE
            </span>

            <span className="flex items-center gap-1.5 text-[14px] text-[#40493D] font-[font5]">
              <Clock size={13} />
              Published {notice?.data?.createdAt.split("T")[0]} • {notice?.data?.createdAt.split("T")[1]}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl font-[medium] leading-tight text-stone-900 mb-8 tracking-tight">
            {notice?.data?.title}
          </h1>

          {/* Author */}

          {/* Hero Image */}
          <div className="rounded-2xl overflow-hidden mb-3">
            {notice?.data?.image ? (
            <img
              src={notice?.data?.image}
              alt="Sustainable crop fields"
              className="w-full h-[380px] object-cover"
            />
            ):
             <div className="p-4 space-y-4">
      <div className="w-full h-[380px] skeleton rounded-full"></div>
    </div>
            }
          </div>
          {/* Lead paragraph */}
          <p className="text-[20px] mt-7  font-[Inter] font-bold tracking-normal text-[#206223] leading-relaxed mb-6">
            The Department of Agriculture has officially announced the
            "Terra-Green 2024" initiative, a comprehensive financial stimulus
            package aimed at accelerating the adoption of regenerative farming
            techniques across the northern territories.
          </p>

          <p className="text-[18px]  text-stone-700 leading-relaxed mb-8 font-[font3]">
            {notice?.data?.content}
          </p>

          {/* Footer */}
          <div className="flex items-center font-[font4] mb-20 justify-between pt-6 border-t border-stone-200">
            <div className="flex items-center gap-2 text-stone-500">
              <Shield size={16} className="text-emerald-700" />
              <span className="text-[16px] font-sans">
                Official Government Notice #AG-2023-9941
              </span>
            </div>

            <div className="flex gap-2">
              {["CERTIFIED", "CONFIDENTIAL"].map((badge) => (
                <span
                  key={badge}
                  className="text-xs font-semibold bg-[#EEEEE9] tracking-widest px-3 py-1 rounded-md border border-stone-300 text-stone-500 font-[font4]"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="w-[350px] shrink-0 sticky top-20 self-start space-y-5">
          {/* Recent Policies */}
          <div className="bg-[#EEEEE9] rounded-2xl p-5 border border-stone-200">
            <h2 className="text-[25px] font-[medium] text-stone-800 mb-5">
              Recent in {notice?.data?.category.slice(0,1).toUpperCase() + notice?.data?.category.slice(1)}
            </h2>

            <div className="space-y-5">
              {filteredData?.map((item, i) => (
                <div onClick={()=> navigate(`/notice/${item.id}`)} key={i} className="cursor-pointer group">
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-[12px] font-[font3] tracking-wider text-[#206223]`}
                    >
                      {item.category.toUpperCase()}
                    </span>

                    <span className="text-[11px] font-[font3] text-stone-400">
                      {item.createdAt.split("T")[0]}
                    </span>
                  </div>

                  <p className="text-[15.5px] font-[font7] font-bold tracking-wide text-stone-800 group-hover:text-[#3A7B3A] transition-colors mb-1 leading-snug">
                    {item.title}
                  </p>

                  <p className="text-[14px] text-stone-500 font-[font3] leading-relaxed">
                    {item.content.slice(0,90)}...
                  </p>

                  {i < filteredData.length - 1 && (
                    <div className="border-b border-stone-200 mt-4" />
                  )}
                </div>
              ))}
            </div>

            <button className="mt-6 w-full bg-[#EEEEE9] flex items-center tracking-wider cursor-pointer font-bold justify-center gap-2 border-2 border-[#3A7B3A] text-[#3A7B3A] text-[15px] font-[font3] py-3 rounded-xl hover:bg-[#E5E8E0] transition-colors">
              View All Policy Notices
              <ChevronRight size={15} />
            </button>
          </div>

          {/* Newsletter */}
          <div className="rounded-2xl p-5 text-white bg-[#3A7B3A]">
            <h3 className="text-[20px] text-[#CBFFB9] font-[medium] mb-1">Stay Ahead</h3>

            <p className="text-[16px] font-[font4] text-[#CBFFB9] mb-4 leading-relaxed">
              Get critical notices delivered to your inbox instantly.
            </p>

            <div className="flex items-center gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="flex-1 bg-[#4E884E]/50  font-[font4]  text-white  text-sm px-3 py-2.5 rounded-lg outline-none focus:border-emerald-300"
              />

              <button className=" p-2.5 rounded-lg cursor-pointer transition-colors">
                <Send size={16} />
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
