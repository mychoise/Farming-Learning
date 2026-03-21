import { NavLink } from "react-router-dom";
import { FlaskConical, Scale, Ruler, ChevronRight, Wifi } from "lucide-react";

type Tool = {
  id: string;
  icon: React.ReactNode;
  label: string;
  sub: string;
  path: string;
};

const tools: Tool[] = [
  {
    id: "Organic Fertilizer",
    icon: <FlaskConical size={22} strokeWidth={1.8} />,
    label: "Organic Fertilizer",
    sub: "ORGANIC REQUIREMENT",
    path: "/calculate/organic",
  },
   {
    id: "InOrganic Fertilizer",
    icon: <FlaskConical size={22} strokeWidth={1.8} />,
    label: "InOrganic Fertilizer",
    sub: "INORGANIC REQUIREMENT",
    path: "/calculate/inorganic",
  },
  {
    id: "animal",
    icon: <Scale size={22} strokeWidth={1.8} />,
    label: "Animal Weight",
    sub: "LIVESTOCK ESTIMATION",
    path: "/calculate/animal",
  },
  {
    id: "unit",
    icon: <Ruler size={22} strokeWidth={1.8} />,
    label: "Unit Conversion",
    sub: "SPATIAL MATRIX",
    path: "/calculate/unit-conversion",
  },
];

export default function CalculatorsPanel() {
  return (
    <aside className="w-85 min-h-screen bg-[#F4F4EF] font-[font3] p-6 pt-7 shadow-[0_8px_40px_rgba(60,80,40,0.10),0_1px_4px_rgba(60,80,40,0.07)] flex flex-col">

      {/* Header */}
      <div className="mb-5 pl-1">
        <h1 className="text-[22px]  text-[#2d3a1e] leading-tight tracking-tight font-[font3]">
          Calculators
        </h1>
        <p className="text-[10px] font-semibold text-[#8a9472] tracking-[0.12em] uppercase mt-1">
          Precision Agriculture Tools
        </p>
      </div>

      {/* Tool List */}
      <div className="flex font-[font5] flex-col gap-2.5 flex-1">
        {tools.map((tool) => (
          <NavLink
            key={tool.id}
            to={tool.path}
            className={({ isActive }) =>
              `flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-left transition-all duration-200
              ${
                isActive
                  ? "bg-white shadow-[0_2px_12px_rgba(60,80,40,0.10),0_1px_3px_rgba(60,80,40,0.08)]"
                  : "hover:bg-white/50"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {/* Icon */}
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all
                  ${
                    isActive
                      ? "bg-[#e8f5e2] text-[#3a6b2a]"
                      : "bg-[#e0ddd6] text-[#7a806e]"
                  }`}
                >
                  {tool.icon}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div
                    className={`text-[15px] font-semibold leading-tight ${
                      isActive ? "text-[#3a6b2a]" : "text-[#3d4435]"
                    }`}
                  >
                    {tool.label}
                  </div>
                  <div
                    className={`text-[9.5px] font-semibold tracking-widest uppercase mt-1 ${
                      isActive ? "text-[#7aab62]" : "text-[#9ea891]"
                    }`}
                  >
                    {tool.sub}
                  </div>
                </div>

                {/* Arrow */}
                {isActive && (
                  <ChevronRight
                    size={16}
                    strokeWidth={2}
                    className="text-[#7aab62] shrink-0"
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px bg-[rgba(100,110,80,0.13)] my-6 mx-1" />

      {/* System Status */}
      <div className="pl-1">
        <div className="text-[9.5px] font-bold text-[#8a9472] tracking-[0.13em] uppercase mb-2.5">
          System Status
        </div>

        <div className="flex items-center gap-2">
          <div className="relative w-2.5 h-2.5">
            <span className="absolute inset-0 rounded-full bg-green-500 animate-ping"></span>
            <span className="absolute inset-0 rounded-full bg-green-500"></span>
          </div>

          <span className="text-[13px] text-[#3d4435] font-medium">
            All Models Active
          </span>

          <Wifi
            size={13}
            strokeWidth={2}
            className="ml-auto text-[#7aab62]"
          />
        </div>
      </div>
    </aside>
  );
}
