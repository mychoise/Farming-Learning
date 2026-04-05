import { useState, useRef, useEffect } from "react";
import { UserCircle, ChevronDown, FlaskConical, Sprout, Scale, PawPrint } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const calcItems = [
  {
    label: "Organic Fertilizer",
    href: "/calculate/organic",
    icon: Sprout,
    desc: "Compost, manure & bio inputs",
  },
  {
    label: "Inorganic Fertilizer",
    href: "/calculate/inorganic",
    icon: FlaskConical,
    desc: "NPK, urea & chemical inputs",
  },
  {
    label: "Animal Weight",
    href: "/calculate/animal",
    icon: PawPrint,
    desc: "Livestock weight estimation",
  },
  {
    label: "Unit Conversion",
    href: "/calculate/unit-conversion",
    icon: Scale,
    desc: "Land measurement conversions",
  },
];

const Navbar = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const [calcOpen, setCalcOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setCalcOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setCalcOpen(false);
  }, [pathname]);

  const isCalcActive = pathname.startsWith("/calculate");

  // Nav links matching the screenshot exactly
  const navLinks = [
    { label: "Crops Library", href: "/crops" },
    { label: "Weather", href: "/weather" },
    { label: "Crop Calender", href: "/crop-calendar" },
    { label: "Notices", href: "/notices" },
    { label: "Assistant", href: "/ai" },
    {label:"Community", href:"/post"},
    {label:"Video", href:"/video"}
  ];

  return (
    <nav className="w-full bg-[#F7F7F0] font-[font4] flex items-center justify-between px-8 h-14 relative z-50">

      {/* Logo — text only, no icon, matching screenshot */}
      <Link
        to="/"
        className="flex items-center shrink-0 no-underline"
      >
        <span className="text-[19px] font-bold text-[#1a3a1a] tracking-tight">
          AgriLearn
        </span>
      </Link>

      {/* Nav Links — centered absolutely */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-0.5">
        {navLinks.map(({ label, href }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={label}
              to={href}
              className={`relative text-[14px] font-medium px-3.5 py-1.5 rounded-md transition-all duration-150 no-underline
                ${
                  isActive
                    ? "text-[#2d6a2d] font-semibold"
                    : "text-[#4a4a4a] hover:text-gray-900 hover:bg-green-50/60"
                }`}
            >
              {label}
              {isActive && (
                <span className="absolute -bottom-0.5 left-3.5 right-3.5 h-[1.5px] bg-[#2d6a2d] rounded-full" />
              )}
            </Link>
          );
        })}

        {/* Calculations Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setCalcOpen((prev) => !prev)}
            className={`relative flex items-center gap-1 text-[14px] font-medium px-3.5 py-1.5 rounded-md transition-all duration-150 cursor-pointer
              ${
                isCalcActive || calcOpen
                  ? "text-[#2d6a2d] font-semibold"
                  : "text-[#4a4a4a] hover:text-gray-900 hover:bg-green-50/60"
              }`}
          >
            Calculations
            <ChevronDown
              size={13}
              className={`transition-transform duration-200 ${calcOpen ? "rotate-180" : ""}`}
            />
            {isCalcActive && (
              <span className="absolute -bottom-0.5 left-3.5 right-[20px] h-[1.5px] bg-[#2d6a2d] rounded-full" />
            )}
          </button>

          {/* Dropdown Panel */}
          {calcOpen && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden">
              <div className="p-1.5">
                {calcItems.map(({ label, href, icon: Icon, desc }) => {
                  const isActive = pathname === href;
                  return (
                    <Link
                      key={href}
                      to={href}
                      className={`flex items-start gap-3 px-3 py-2.5 rounded-lg transition-all duration-100 no-underline group
                        ${isActive ? "bg-green-50" : "hover:bg-gray-50"}`}
                    >
                      <div
                        className={`mt-0.5 w-7 h-7 rounded-md flex items-center justify-center shrink-0 transition-colors
                        ${isActive ? "bg-green-500" : "bg-gray-100 group-hover:bg-green-100"}`}
                      >
                        <Icon
                          size={14}
                          className={isActive ? "text-white" : "text-gray-500 group-hover:text-green-600"}
                        />
                      </div>
                      <div>
                        <p className={`text-[13.5px] font-semibold leading-tight ${isActive ? "text-green-600" : "text-gray-800"}`}>
                          {label}
                        </p>
                        <p className="text-[12px] text-gray-400 mt-0.5">{desc}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right: user avatar icon only — matching screenshot */}
      <div className="flex items-center shrink-0">
        <button onClick={() => navigate("/auth/login")} className="flex items-center justify-center text-[#2d6a2d] hover:text-green-700 transition-colors duration-150 cursor-pointer">
          <UserCircle size={26} strokeWidth={1.5} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
