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
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=700&q=80",
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
      "https://images.unsplash.com/photo-1561553543-e4c7b608b98d?w=700&q=80",
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
  { icon: "⊞", label: "Dashboard" },
  { icon: "📢", label: "Notices", active: true },
  { icon: "☀", label: "Weather" },
  { icon: "↗", label: "Markets" },
  { icon: "⚖", label: "Policy" },
];

export default function NoticesPage() {
  const [activeTab, setActiveTab] = useState("All Notices");
  const [sortBy, setSortBy] = useState("Latest");

  return (
    <div className="flex min-h-screen bg-stone-50 font-sans">
      {/* Sidebar */}
      <aside className="w-65 shrink-0 flex flex-col py-6 px-4 bg-[#EEEEE9]">
        <div className="mb-8 px-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-800 rounded-sm flex items-center justify-center">
              <span className="text-white text-xs">🌿</span>
            </div>
            <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">
              AgriNotice
            </span>
          </div>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition-all
                ${
                  item.active
                    ? "bg-white text-gray-900 w-full "
                    : "text-gray-500 hover:bg-white/60 hover:text-gray-800"
                }`}
            >
              <span className="w-5 text-center">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Premium card */}
        <div className="mt-4 bg-white rounded-xl p-4 border border-gray-200">
          <p className="text-[10px] font-bold tracking-widest text-green-700 mb-1">
            PREMIUM SUPPORT
          </p>
          <p className="text-xs text-gray-500 mb-3">
            Get direct agronomist consultation 24/7.
          </p>
          <button className="w-full bg-green-800 text-white text-xs font-semibold py-2 rounded-lg hover:bg-green-900">
            Upgrade Now
          </button>
        </div>

        <button className="mt-4 flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:text-gray-700">
          ⚙ Settings
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 pt-10 pl-30 pr-8 py-8">
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

          <div className="text-sm text-gray-500">
            Sort by:
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="ml-2 bg-transparent font-semibold text-gray-800 outline-none"
            >
              <option>Latest</option>
              <option>Oldest</option>
              <option>Most Relevant</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        <div className="flex gap-10 mt-10 flex-wrap">
          {notices.map((notice) => (
            <NoticeCard key={notice.id} notice={notice} />
          ))}

          {/* SMS Card */}
          <div className="rounded-2xl flex flex-col items-center justify-center text-center p-8 gap-4 bg-green-800">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-white/15">
              ✉
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">
                Official Updates via SMS
              </h3>
              <p className="text-green-200 text-sm">
                Subscribe to receive critical alerts directly to your phone.
              </p>
            </div>
            <button className="bg-white text-green-800 font-semibold px-5 py-2 rounded-lg">
              Subscribe Now
            </button>
          </div>
        </div>
      </main>

      {/* Floating Button */}
      <button className="fixed bottom-7 right-7 w-12 h-12 bg-green-800 text-white text-2xl rounded-full shadow-lg flex items-center justify-center hover:bg-green-900">
        +
      </button>
    </div>
  );
}

function NoticeCard({ notice }: { notice: any }) {
  return (
    <div className="bg-white rounded-2xl p-5  w-80 overflow-hidden border border-gray-100 shadow-sm hover:shadow-md flex flex-col">
      <div
        className={`relative h-44 ${
          notice.imageBg ? notice.bgColor : ""
        } flex items-center justify-center`}
      >
        {notice.image ? (
          <img
            src={notice.image}
            alt={notice.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-300 text-4xl">📰</span>
        )}

        <span
          className={`absolute top-3 left-3 text-[10px] font-bold tracking-widest px-2 py-1 rounded-full ${notice.tagBg}`}
        >
          {notice.tag}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <p className="text-xs text-gray-400 mb-2">📅 {notice.date}</p>

        <h3 className="text-sm font-bold text-gray-900 mb-2">
          {notice.title}
        </h3>

        <p className="text-xs text-gray-500 flex-1">
          {notice.description}
        </p>

        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
          <span className="text-[11px] font-bold tracking-widest text-gray-700">
            {notice.cta}
          </span>
          <span>→</span>
        </div>
      </div>
    </div>
  );
}
