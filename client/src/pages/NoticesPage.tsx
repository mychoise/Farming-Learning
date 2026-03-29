import { CalendarDaysIcon, Hammer, LayoutDashboard, Mic2Icon, Sun,ArrowUpRight,Scale } from "lucide-react";
import { useState } from "react";

const notices = [
  {
    id: 1,
    tag: "MARKET",
    tagBg: "bg-white text-green-800 border border-green-200",
    date: "MAY 12, 2024",
    title: "Wheat Prices Projected to Rise in Kathmandu Wholesale Market",
    description:
      "Economic analysts predict a 15% increase in procurement rates due to supply chain adjustments in neighboring provinces.",
    cta: "VIEW DETAILS",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCk6ff5txalF2VP25rXG8lCykGs_ViyLT9Ib4r1sDA5VDYydzkvGTCzxBU6OvNwKTZmKoiwW6-nubhFl_PpDpWAaLynRdyOm7rHDbFVBbmZn0a1pKuIanKOmk6XzrgN7r4UJ2hoeru7NxPVEpYkftTHEUNjA6vmZMB60mZrTrUKDA8RcNU4lCccGkmx6gqsu3rGglEp_bklzKRWk00-zMu26-P0sXcGPi8NS0W9HW5_ec18bbHKEScNgpqcpIYGXdoY0mKR7feovco",
    imageBg: false,
  },
  {
    id: 2,
    tag: "GOVERNMENT",
    tagBg: "bg-red-100 text-red-700 border border-red-200",
    date: "MAY 10, 2024",
    title: "New Tax Incentives for Organic Fertilizer Production Units",
    description:
      "Small-scale production units are now eligible for a 3-year tax holiday under the new Agricultural Sustainability Act.",
    cta: "READ FULL NOTICE",
    image: null,
    imageBg: true,
    bgColor: "bg-red-50",
  },
  {
    id: 3,
    tag: "WEATHER ALERT",
    tagBg: "bg-red-500 text-white",
    date: "MAY 09, 2024",
    title: "Severe Hailstorm Warning: Pokhara and Surrounding Valleys",
    description:
      "Meteorological department issues high alert for the next 48 hours. Farmers are advised to protect fragile crops.",
    cta: "CHECK FORECAST",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDeMe_2MqxaeghphXOvxAAfR1UlXL2T1VKjP0K2camAyR4bDJ2b7gsB-gCG_h-_cisYyNHJhTKOU6bOmBvfIshWZJSxEF1-Gcemhc_INE5-hysobRjsbNK7i00e9Q-ddUaPAsE3uhm6T3Ko2bniixVxuzghQZg0b-DUa112Mw7cRFW2Sm_6F7ul1J79LekMA8AcQ2WHzOuayGtj26cRslK0332GHArmmMYWV1LBlKGZHMh1clzVcAzyyhqW7rcwngTj8egwXryXd-0",
    imageBg: false,
  },
  {
    id: 4,
    tag: "OTHER",
    tagBg: "bg-white text-gray-700 border border-gray-200",
    date: "MAY 08, 2024",
    title: "Community Harvest Festival: Registration Now Open",
    description:
      "Annual inter-district harvest festival invites farmers to showcase produce and compete for prizes.",
    cta: "REGISTER NOW",
    image:
      "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=700&q=80",
    imageBg: false,
  },

];

const tabs = [
  "All Notices",
  "Weather Alerts",
  "Market Rates",
  "Government Policy",
  "Other",
];

const navItems = [
  { icon: <LayoutDashboard/>, label: "Dashboard" },
  { icon: <Mic2Icon/>, label: "Notices", active: true },
  { icon: <Sun/>, label: "Weather" },
  { icon: <ArrowUpRight />, label: "Markets" },
  { icon: <Scale />, label: "Policy" },
];

export default function NoticesPage() {
  const [activeTab, setActiveTab] = useState("All Notices");
  const [sortBy, setSortBy] = useState("Latest");

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
          {notices.map((notice) => (
            <NoticeCard key={notice.id} notice={notice} />
          ))}

        </div>
      </main>

    </div>
  );
}

function NoticeCard({ notice }: { notice: any }) {
  return (
    <div className="bg-[#FFFFFF] cursor-pointer rounded-3xl pt-5 pl-4 pr-4 w-97 overflow-hidden border border-gray-100 transition-all duration-200 hover:shadow-md flex flex-col">
      <div
        className={`relative h-55  ${
          notice.imageBg ? notice.bgColor : ""
        } flex items-center justify-center`}
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
          className={`absolute top-3 left-3 text-[12px] font-[font6] tracking-widest px-2 py-1 rounded-full ${notice.tagBg}`}
        >
          {notice.tag}
        </span>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <p className="text-[14px]  text-[#707A75] tracking-normal flex items-center gap-2 font-[font3] mb-2">
          <CalendarDaysIcon width={16} height={16} className="inline mr-1 text-[#707A75] " /> {notice.date}
        </p>

        <h3 className=" font-[font6] tracking-wider font-bold text-[19px] text-gray-900 mb-2">
          {notice.title}
        </h3>

        <p className="text-[14px] font-[font5] text-gray-500 flex-1">
          {notice.description}
        </p>

        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
          <span className="text-[13px] font-[font4] tracking-widest text-gray-700">
            {notice.cta}
          </span>
          <span className="text-[13px] font-[font4] tracking-widest text-gray-700">→</span>
        </div>
      </div>
    </div>
  );
}
