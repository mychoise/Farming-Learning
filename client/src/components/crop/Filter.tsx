import { FilterIcon, HelpCircle, Leaf } from "lucide-react";
import { useFilterStore } from "../../store/useFilter";
import { useEffect } from "react";

const Filter = () => {
  const {
    season,
    setSeason,
    difficulty,
    setDifficulty,
    resetFilters,
    applyFilters,
    setCrops,
  } = useFilterStore();

  const FilterOptions = [
    {
      name: "Season",
      options: [
        { label: "Spring(May-Aug)", value: "spring" },
        { label: "Summer(Sept-Nov)", value: "summer" },
        { label: "Monsoon", value: "monsoon" },
        { label: "Winter(Mar-Apr)", value: "winter" },
      ],
    },
    {
      name: "Difficulty",
      options: [
        { label: "Beginner", value: "Beginner" },
        { label: "Intermediate", value: "intermediate" },
        { label: "Advance", value: "Advanced" },
      ],
    },
  ];

  // toggle season
  const toggleSeason = (option: string) => {
    const updated = season.includes(option)
      ? season.filter((o) => o !== option)
      : [...season, option];

    setSeason(updated);
  };

  // toggle difficulty
  const toggleDifficulty = (option: string) => {
    const updated = difficulty.includes(option)
      ? difficulty.filter((o) => o !== option)
      : [...difficulty, option];

    setDifficulty(updated);
  };

  useEffect(() => {
    // Initial load is handled by CropList component
  }, []);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex w-[21vw] gap-2 items-center text-green-600 font-[Inter] font-bold">
        <FilterIcon size={17} />
        <h1>Discover Filters</h1>
      </div>

      {/* Season Filter */}
      <div className="bg-white border mt-4 border-gray-200 rounded-xl font-[Inter] p-4 max-w-xs">
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-800 mb-3">
          Growth Season
        </h2>

        <div className="flex flex-col gap-2">
          {FilterOptions[0].options.map((option) => {
            const checked = season.includes(option.value);

            return (
              <label
                key={option.value}
                className="flex items-center gap-3 cursor-pointer text-sm text-gray-800"
              >
                <span
                  onClick={() => toggleSeason(option.value)}
                  className="w-5 h-5 rounded-md flex items-center justify-center shrink-0"
                  style={{
                    background: checked ? "#22C55E" : "#e5e7eb",
                  }}
                >
                  {checked && (
                    <svg width="12" height="9" viewBox="0 0 13 10" fill="none">
                      <polyline
                        points="1.5,5 5,8.5 11.5,1.5"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>

                {option.label}
              </label>
            );
          })}
        </div>
      </div>

      {/* Difficulty Filter */}
      <div className="bg-white border mt-4 border-gray-200 rounded-xl font-[Inter] p-4 max-w-xs">
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-800 mb-3">
          Skill Level
        </h2>

        <div className="flex flex-col gap-2">
          {FilterOptions[1].options.map((option) => {
            const checked = difficulty.includes(option.value);

            return (
              <label
                key={option.value}
                className="flex items-center gap-3 cursor-pointer text-sm text-gray-800"
              >
                <span
                  onClick={() => toggleDifficulty(option.value)}
                  className="w-5 h-5 rounded-md flex items-center justify-center shrink-0"
                  style={{
                    background: checked ? "#22C55E" : "#e5e7eb",
                  }}
                >
                  {checked && (
                    <svg width="12" height="9" viewBox="0 0 13 10" fill="none">
                      <polyline
                        points="1.5,5 5,8.5 11.5,1.5"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>

                {option.label}
              </label>
            );
          })}
        </div>
      </div>

      {/* Tip Card */}
      <div className="relative mt-4 font-[Inter] overflow-hidden bg-green-100 border border-green-200 rounded-2xl p-4 max-w-xs">
        <div className="absolute -bottom-4 -right-4 z-0 text-green-200 select-none pointer-events-none">
          <Leaf size={90} />
        </div>

        <div className="flex items-center gap-2 mb-2">
          <HelpCircle size={18} className="text-green-600" />
          <h3 className="text-green-600 font-bold text-base">Farmer's Tip</h3>
        </div>

        <p className="text-gray-700 z-10 relative text-sm leading-relaxed">
          Planting during the rainy season ensures better germination and
          growth.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col max-w-xs mt-6">
        <button
          onClick={applyFilters}
          className="bg-[#E28C36] cursor-pointer font-[Inter] text-white px-4 py-2 rounded-lg mt-4"
        >
          Update Results
        </button>

        <button
          onClick={() => {
            console.log("clicked");
            console.log("hi");
            resetFilters();
            setCrops();
          }}
          className="bg-gray-200 cursor-pointer font-[Inter] text-gray-700 px-4 py-2 rounded-lg mt-4"
        >
          Reset all filter
        </button>
      </div>
    </div>
  );
};

export default Filter;
