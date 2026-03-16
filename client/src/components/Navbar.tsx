import { useState } from "react";
import { Leaf } from "lucide-react";

const Navbar = () => {
  const [active, setActive] = useState("Crops Library");
  const navItems = [
    "Crops Library",
    "Market Trends",
    "Soil Analysis",
    "Resources",
  ];

  return (
    <nav className="w-full h-17 font-[Inter] bg-white border-b border-gray-100 shadow-sm flex items-center justify-between px-8 relative">
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 bg-green-500 rounded-full flex items-center justify-center shrink-0">
          <Leaf size={18} color="white" strokeWidth={2} />
        </div>
        <span className="text-[20px] font-bold text-gray-900 tracking-tight">
          AgriLearn
        </span>
      </div>

      {/* Nav Links - centered */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1">
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => setActive(item)}
            className={`relative text-[14.5px] font-medium px-3.5 py-1.5 rounded-md transition-all duration-150
              ${
                active === item
                  ? "text-green-500 font-semibold"
                  : "text-gray-500 hover:text-gray-900 hover:bg-green-50"
              }`}
          >
            {item}
            {active === item && (
              <span className="absolute -bottom-0.5 left-3.5 right-3.5 h-0.5 bg-green-500 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Sign In */}
      <button className="text-sm font-semibold text-gray-800 border border-gray-200 rounded-lg px-4 py-1.5 hover:border-green-400 hover:text-green-500 hover:bg-green-50 transition-all duration-150">
        Sign In
      </button>
    </nav>
  );
};

export default Navbar;
