import { CalendarDaysIcon, Hammer, LayoutDashboard, Mic2Icon, Sun,ArrowUpRight,Scale, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useNotices } from "../hooks/hooks";
import { useState,useEffect } from "react";

const tabs = [
  "All Notices",
  "Weather Alerts",
  "Market Rates",
  "Government Policy",
  "Other",
];

const noticesColor = [
    {
        tag: "market",
    tagBg: "bg-white text-green-800 border border-green-200",
    },
    {
        tag: "government",
    tagBg: "bg-red-100 text-red-700 border border-red-200",
    },
    {
        tag: "weather",
    tagBg: "bg-red-500 text-white",
    },
    {
        tag: "other",
    tagBg: "bg-white text-gray-700 border border-gray-200",
    },
]

const navItems = [
  { icon: <LayoutDashboard/>, label: "Dashboard" },
  { icon: <Mic2Icon/>, label: "Notices", active: true },
  { icon: <Sun/>, label: "Weather" },
  { icon: <ArrowUpRight />, label: "Markets" },
  { icon: <Scale />, label: "Policy" },
];

export default function NoticesPage() {
  const [activeTab, setActiveTab] = useState("All Notices");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

const {data,isLoading,isError} = useNotices(page)

console.log("data is",data)
console.log("loadig is",isLoading)
console.log("error is",isError)

console.log("total pages is",Math.ceil(data?.pagination?.total / 9))

useEffect(() => {
  setTotalPages(Math.ceil(data?.pagination?.total / 9))
}, [data])



  return (
    <div className="flex bg-stone-50 font-sans">
      {/* Sidebar */}
      <aside className="w-65 h-[98vh] sticky top-0 shrink-0 flex flex-col py-6 px-4 bg-[#EEEEE9]">
        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`flex cursor-pointer items-center gap-3 font-[font3] px-3 py-2.5 rounded-lg text-[15px] font-medium text-left transition-all
                ${
                  item.active
                    ? "bg-white text-[#14532D] w-full "
                    : "text-gray-500 hover:bg-white/60 hover:text-gray-800"
                }`}
            >
<span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 bg-[#FAFAF5] pt-10 pl-30 pr-8 py-8">
        {/* Tabs */}
        <div className="flex items-center justify-between mb-7">
          <div className="flex gap-2 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full cursor-pointer text-[15px] font-[font4]
                  ${
                    activeTab === tab
                      ? "bg-green-800 text-white"
                      : "bg-[#E8E8E3] text-gray-600  border border-gray-200 hover:bg-[#3A7B3A] hover:text-[#C6E47C]"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>


        </div>

        {/* Grid */}
        <div className="flex gap-10 mt-10 flex-wrap">
          {data?.data?.map((notice) => (
            <NoticeCard key={notice._id} notice={notice} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center mt-16 mb-4">
          <nav className="flex items-center gap-2" aria-label="Pagination">
            <button
              disabled
              className="flex items-center justify-center p-2.5 rounded-full border border-gray-200 text-gray-400 bg-white cursor-not-allowed shadow-sm"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 bg-white px-2 py-1.5 rounded-full shadow-sm border border-gray-100">

{   Array.from({ length: totalPages }, (_, i) => (
  <button
    key={i}
    onClick={() => setPage(i + 1)}
    className={`w-9 h-9 flex items-center justify-center rounded-full font-medium text-[15px] font-[font4] transition-all
      ${page === i + 1
        ? "bg-[#14532D] text-white"
        : "bg-transparent text-gray-600 hover:bg-[#EEEEE9] hover:text-[#14532D]"
      }`}
  >
    {i + 1}
  </button>
))}
            </div>

            <button
              className="flex items-center justify-center p-2.5 rounded-full border border-gray-200 text-gray-600 bg-white hover:bg-[#EEEEE9] hover:text-[#14532D] cursor-pointer transition-all shadow-sm"
              aria-label="Next page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </nav>
        </div>
      </main>
    </div>
  );
}

function NoticeCard({ notice }: { notice: any }) {
      const navigate = useNavigate()

  return (
    <div onClick={()=> navigate(`/notice/${notice._id}`)} className="bg-[#FFFFFF] cursor-pointer rounded-3xl pt-5 pl-4 pr-4 w-97 overflow-hidden border border-gray-100 transition-all duration-200 hover:shadow-md flex flex-col">
      <div
        className={`relative rounded-2xl h-55  bg-red-50 flex items-center justify-center`}
      >
        <div className="w-90 rounded-3xl h-full flex overflow-hidden items-center justify-center transition-transform duration-200">
        {notice.image ? (
          <img
            src={notice.image}
            alt={notice.title}
            className=" w-[120%] h-[120%] rounded-4xl "
          />
        ) : (
          <span className="text-gray-300 ">
            <Hammer width={70} height={70} className="" color="#C9B2AA" />
          </span>
        )}
        </div>

      <span
          className={`absolute top-3 left-3 ${noticesColor.find((item) => item.tag === notice.category)?.tagBg} uppercase text-[12px] font-[font6] tracking-wider px-2 py-1 rounded-full`}
        >
          {notice.category}
        </span>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <p className="text-[14px]  text-[#707A75] tracking-normal flex items-center gap-2 font-[font3] mb-2">
          <CalendarDaysIcon width={16} height={16} className="inline mr-1 text-[#707A75] " /> {notice.createdAt}
        </p>

        <h3 className=" font-[font6] tracking-wider font-bold text-[19px] text-gray-900 mb-2">
          {notice.title}
        </h3>

        <p className="text-[14px] font-[font5] text-gray-500 flex-1">
          {notice.content}
        </p>

        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
          <span className="text-[13px] font-[font4] tracking-widest text-gray-700">
            View Details
          </span>
          <span className="text-[13px] font-[font4] tracking-widest text-gray-700">→</span>
        </div>
      </div>
    </div>
  );
}
