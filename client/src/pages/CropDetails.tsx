import {
  Sprout,
  Calendar,
  Sun,
  Layers,
  BarChart2,
  IndianRupee,
  CircleAlert,
  BookOpen,
  Scissors,
  CircleCheck,
  Save,
} from "lucide-react";
import { useEffect, useMemo } from "react";
import { Colors } from "../constants/crops";
import { useFilterStore } from "../store/useFilter";
import { useParams } from "react-router-dom";
const CropDetails = () => {
  const { IndividualCrop, getIndividualCrop } = useFilterStore();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getIndividualCrop(id);
    }
  }, [id]);

  const cropStats = [
    {
      name: "CLIMATE",
      icon: <Sun size={20} className="text-green-500" />,
      value: "Cool and temperate",
    },
    {
      name: "CATEGORY",
      icon: <Sprout size={20} className="text-green-500" />,
      value: "Floriculture",
    },
    {
      name: "SEASON",
      icon: <Calendar size={20} className="text-green-500" />,
      value: "Autumn / Spring",
    },
    {
      name: "SOIL TYPE",
      icon: <Layers size={20} className="text-green-500" />,
      value: "Well-drained Loamy",
    },
    {
      name: "DIFFICULTY",
      icon: <BarChart2 size={20} className="text-green-500" />,
      value: "Beginner Friendly",
    },
    {
      name: "EST. PROFIT",
      icon: <IndianRupee size={20} className="text-green-500" />,
      value: "₹ 15,000 - 45,000",
    },
  ];

  const nutrients = [
    {
      key: "nitrogen",
      label: "Nitrogen",
      letter: "N",
      desc: "Vital for leafy foliage development",
      value: Number(IndividualCrop?.crop.nitrogen),
      max: 200,
      badgeColor: "bg-green-500",
      barColor: "bg-green-500",
    },
    {
      key: "phosphorus",
      label: "Phosphorus",
      letter: "P",
      desc: "Encourages strong root and seed growth",
      value: Number(IndividualCrop?.crop.phosphorus),
      max: 200,
      badgeColor: "bg-blue-500",
      barColor: "bg-blue-500",
    },
    {
      key: "potassium",
      label: "Potassium",
      letter: "K",
      desc: "Improves flower quality & disease resistance",
      value: Number(IndividualCrop?.crop.potassium),
      max: 200,
      badgeColor: "bg-amber-400",
      barColor: "bg-amber-400",
    },
  ];
  const shuffledColors = useMemo(() => {
    return [...Colors].sort(() => Math.random() - 0.5);
  }, []);

  console.log("IndividualCrop", IndividualCrop);

  return (
    <div className="bg-[#FAFAF9] ">
      {/* Headin part */}
      <div className="w-full gap-15 flex flex-row justify-between bg-[#F2FDF6]">
        <div className="pl-32 pt-24  flex flex-col w-full gap-9">
          <h1 className="inline-block border border-[#1DC964] font-[Inter] w-50 pt-1.5 text-center text-[#1DC964] pl-1 pr-1 py-1 rounded-full">
            Category: {IndividualCrop?.crop_category.name || "Vegetables"}
          </h1>
          <h1 className="text-[110px] font-[medium]  leading-26 word-spacing-[0.5rem]">
            {IndividualCrop?.crop.name || "Golden Marigold"}
          </h1>
          <h1 className="text-[30px] w-125  italic text-[#1DC964] font-[medium]">
            {" "}
            {IndividualCrop?.crop.nepaliName}{" "}
            <span className=" font-[Inter] ">
              ({IndividualCrop?.crop.scientificName})
            </span>
          </h1>
          <button className="bg-[#1DC964] w-62.5 pt-2 pb-2 font-[Inter] text-white text-lg  px-6 py-2 rounded-full">
            Get Growing Guide
          </button>
        </div>
        <div>
          <div className="w-[60vw] ml-40 h-[70vh]">
            <img
              className="w-full h-full object-cover"
              src={
                IndividualCrop?.crop.imageUrl ||
                "https://cdn.create.vista.com/api/media/medium/358927096/stock-photo-marigold-flower-or-tagetes-background?token="
              }
            ></img>
          </div>
        </div>
        <div className="w-full items-center justify-center">
          <div className="absolute w-[70vw] h-27 flex flex-row shadow-xl/30 left-50 top-165 items-center justify-between rounded-2xl bg-white/80 backdrop-blur px-6 py-4 shadow-sm border border-gray-100">
            {cropStats.map((stat, i) => (
              <div
                key={i}
                className="relative flex flex-col items-center gap-1 flex-1 font-[Inter]
    before:absolute before:left-0 before:-top-2.5 before:bg-gray-300 before:h-20 before:w-px
    first:before:hidden"
              >
                <span className="text-green-500">{stat.icon}</span>

                <span className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase">
                  {stat.name}
                </span>

                <span className="text-sm font-bold text-gray-800 text-center">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-16 ">
        {/* Crop Overview Left side*/}
        <div className="pl-32">
          {/* Crop description */}
          <div>
            <div className="flex w-[50vw] gap-2 items-center  mt-15 flex-row  rounded-2xl p-4">
              <h1 className="text-2xl p-2 rounded-4xl bg-[#E4F5EA] font-bold">
                <CircleAlert color="green" size={20} />
              </h1>
              <span className="text-[20px] font-[medium]">Crop Overview</span>
            </div>

            <div className="bg-white shadow-xl  rounded-4xl mt-2 w-220 pr-7 pb-10 text-[18px] pt-12 pl-14 font-[Inter]">
              <p className="text-[#3D3834]">
                {IndividualCrop?.crop.description ||
                  "The Golden Marigold is a vibrant, hardy annual plant celebrated in Nepal for its cultural significance and pest-repelling properties. Widely used in festivals like Tihar, these flowers thrive in various soil types and are essential for organic pest management in diverse agricultural systems."}
              </p>
            </div>
          </div>

          {/* Crop Step By Step Process */}

          <div>
            <div className="flex w-[50vw] gap-2 items-center  mt-15 flex-row  rounded-2xl p-4">
              <h1 className="text-2xl p-2 rounded-4xl bg-[#FAF2E6] font-bold">
                <BookOpen color="#F5A83D" size={20} />
              </h1>
              <span className="text-[20px] font-[medium]">
                Step-by-Step Growing Guide
              </span>
            </div>
            <div className="bg-white shadow-xl  rounded-4xl mt-2 w-220 pr-7 pb-10 text-[18px] pt-12 pl-14 font-[Inter]">
              <div className="flex flex-col gap-8">
                {IndividualCrop?.crop?.growingGuide.map(
                  (
                    step: { title: string; description: string },
                    index: number,
                  ) => (
                    <div className="flex gap-8" key={index}>
                      <div
                        style={{
                          backgroundColor:
                            shuffledColors[index % shuffledColors.length].color,
                        }}
                        className=" w-12.5 h-12.5 rounded-xl flex items-center justify-center shrink-0"
                      >
                        <h1 className="text-white font-bold">{index + 1}</h1>
                      </div>
                      <div className="flex gap-2 flex-col">
                        <h2 className="text-[20px] text-gray-800 font-[medium]">
                          {step.title}
                        </h2>
                        <p>{step.description}</p>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* Crop Harvesting Tips */}
          <div>
            <div className="flex w-[50vw] gap-2 items-center  mt-15 flex-row  rounded-2xl p-4">
              <h1 className="text-2xl p-2 rounded-4xl bg-[#F8E7E6] font-bold">
                <Scissors color="red" size={20} />
              </h1>
              <span className="text-[20px] font-[medium]">Crop Overview</span>
            </div>

            <div className="bg-[#D2F9E2] shadow-xl  rounded-4xl mt-2 w-220 pr-7 pb-10 text-[18px] pt-12 pl-14 font-[Inter]">
              <p className="text-[#3D3834]">
                {IndividualCrop?.crop.harvestingTips}
              </p>
            </div>
          </div>
        </div>

        {/* Crop Overview Righth side */}
        <div className=" flex-col shrink-0 flex-wrap flex gap-8 mt-20 w-[27%] ">
          {/* Crop Action */}
          <div className="flex flex-col pt-10 pl-10 rounded-2xl shadow-2xl h-45 w-full bg-[#1DC964] gap-4">
            <div className="flex gap-2 items-center">
              <CircleCheck color="white" />
              <h1 className="text-[18px] text-white font-[medium]">
                Grower Actions
              </h1>
            </div>
            <button className="flex rounded-2xl gap-4 font-[medium] text-[#1DC964] w-75 items-center justify-center text-center mt-3 bg-white pr-5 ml-5  pt-3 pb-3">
              <Save className="pb-1" size={22} color="#1DC964" />
              Save As PDF
            </button>
          </div>
          {/* Nutriorion */}
          <div className="bg-white font-[Inter] rounded-2xl shadow-md p-7 w-full max-w-md">
            <h1 className="text-2xl font-bold text-gray-900">
              Nutrient Requirements
            </h1>
            <p className="text-sm text-gray-400 mt-1 mb-7">
              Optimal soil profile for growth
            </p>

            {nutrients.map((n, i) => {
              const pct = Math.min(100, Math.round((n.value / 200) * 100));
              return (
                <div
                  key={n.key}
                  className={i !== nutrients.length - 1 ? "mb-6" : ""}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full ${n.badgeColor} flex items-center justify-center text-white text-xs font-semibold`}
                      >
                        {n.letter}
                      </div>
                      <span className="text-base font-semibold text-gray-900">
                        {n.label}
                      </span>
                    </div>
                    <span className="text-base font-bold text-gray-900">
                      {pct}%
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 ml-11 mb-2">{n.desc}</p>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${n.barColor} rounded-full transition-all duration-700`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          {/* Water Schedule */}
          <div className="bg-[#F0F7FE] rounded-2xl font-[Inter] p-5 w-full max-w-md">
            {/* Title */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-blue-400 text-lg">💧</span>
              <h2 className="text-lg font-bold text-gray-900">
                Watering Schedule
              </h2>
            </div>

            {/* Weekly Cadence Card */}
            <div className="bg-gray-50 rounded-xl flex items-center gap-3 px-4 py-3 mb-4">
              <div className="w-11 h-11 rounded-2xl bg-blue-100 flex items-center justify-center shrink-0">
                <Calendar color="#2F92F4" />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Weekly Calender
                </p>
                <p className="text-xs text-gray-400">Best for current season</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-500 leading-relaxed">
              {IndividualCrop?.crop.wateringSchedule}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropDetails;
