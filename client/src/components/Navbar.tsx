import { useState, useRef, useEffect } from "react";
import { Leaf, ChevronDown, FlaskConical, Sprout, MapPin,Scale,PawPrint } from "lucide-react";
import { href, Link, useLocation } from "react-router-dom";

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
    label:"Unit Conversion",
    href:"/calculate/unit-conversion",
    icon: Scale,
    desc: "Land measurement conversions"
  }
];

const Navbar = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const [calcOpen, setCalcOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  const navLinks = [
    { label: "Crops Library", href: "/crops" },
    { label: "Weather", href: "/weather" },
    { label: "Resources", href: "/resources" },
    { label: "Crop Calendar", href: "/crop-calendar" },
  ];

  return (
    <nav className="w-full h-17 font-[Inter] bg-white border-b border-gray-100 shadow-sm flex items-center justify-between px-8 relative z-50">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2.5 shrink-0 no-underline">
        <div className="w-9 h-9 bg-green-500 rounded-full flex items-center justify-center shrink-0">
          <Leaf size={18} color="white" strokeWidth={2} />
        </div>
        <span className="text-[20px] font-bold text-gray-900 tracking-tight">
          AgriLearn
        </span>
      </Link>

      {/* Nav Links - centered */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1">
        {navLinks.map(({ label, href }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={label}
              to={href}
              className={`relative text-[14.5px] font-medium px-3.5 py-1.5 rounded-md transition-all duration-150 no-underline
                ${
                  isActive
                    ? "text-green-500 font-semibold"
                    : "text-gray-500 hover:text-gray-900 hover:bg-green-50"
                }`}
            >
              {label}
              {isActive && (
                <span className="absolute -bottom-0.5 left-3.5 right-3.5 h-0.5 bg-green-500 rounded-full" />
              )}
            </Link>
          );
        })}

        {/* Calculations Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setCalcOpen((prev) => !prev)}
            className={`relative flex items-center gap-1 text-[14.5px] font-medium px-3.5 py-1.5 rounded-md transition-all duration-150
              ${
                isCalcActive || calcOpen
                  ? "text-green-500 font-semibold"
                  : "text-gray-500 hover:text-gray-900 hover:bg-green-50"
              }`}
          >
            Calculations
            <ChevronDown
              size={14}
              className={`transition-transform duration-200 ${calcOpen ? "rotate-180" : ""}`}
            />
            {isCalcActive && (
              <span className="absolute -bottom-0.5 left-3.5 right-[18px] h-0.5 bg-green-500 rounded-full" />
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

      {/* Right: Location + Sign In */}
      <div className="flex items-center gap-3 shrink-0">
        <button className="flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-green-500 transition-colors duration-150">
          <MapPin size={14} />
          <span className="font-medium">Pokhara, NP</span>
        </button>

        <div className="w-px h-4 bg-gray-200" />

        <button className="text-sm font-semibold text-gray-800 border border-gray-200 rounded-lg px-4 py-1.5 hover:border-green-400 hover:text-green-500 hover:bg-green-50 transition-all duration-150">
          Sign In
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
