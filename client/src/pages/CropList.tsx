import { ChevronRight, Flower2 } from "lucide-react";
import Filter from "../components/crop/Filter";
import CropCard from "../components/crop/CropCard";
import { Crops } from "../constants/crops";
import { useEffect, useState } from "react";
import { useFilterStore } from "../store/useFilter";
const CropList = () => {
  const [selectedvalue, setselectedvalue] = useState<string[]>([]);
  const {
    season,
    filteredCrops,
    allCrops,
    setCrops,
    setPagination,
    totalPage,
    currentPage,
    totalCrops,
  } = useFilterStore();
  useEffect(() => {
    setCrops(Crops.crop);
  }, []);
  const simpleArray = Array.from({ length: totalPage }, (_, i) => i + 1);
  const formatArray = (arr: string[]) =>
    arr.length < 3
      ? arr.join(" & ")
      : `${arr.slice(0, -1).join(", ")} & ${arr.at(-1)}`;

  return (
    <>
      <div className="bg-[#F2FDF5] shadow pl-31.75 h-[25vh] pt-12 pb-6 flex flex-col w-full">
        <h1 className=" text-[40px] font-black font-[medium] text-black">
          Explore our{" "}
          <span className=" font-black italic text-green-600">
            Crop Catalog
          </span>
        </h1>
        <div className="text-[17px] w-[43%] mt-5 font-[font1] text-black">
          <p className="text-[#676056] font-[Inter]">
            Discover the best crops for your region in Nepal. Filter by season
            and difficulty to find your perfect match and start your growing
            journey today.
          </p>
        </div>
      </div>
      {/* Filters and Result */}
      <div className="ml-31.75 flex flex-row gap-20 mt-10">
        <Filter />
        <div className="flex flex-col  gap-5">
          <div className="flex flex-row items-center h-5 -gap-[6px]">
            <h1 className="bg-[#F2FDF5] px-4 py-2 rounded-full text-green-600 font-bold">
              {Crops.crop.length} Total Crops
            </h1>
            <span>
              <ChevronRight size={20} />
            </span>
            <span className="text-gray-600 font-[medium] text-[16px]">
              Showing {formatArray(season)} crops
            </span>
          </div>
          <h1 className="text-3xl font-black">Matching Results</h1>
          <hr className="border-gray-300 w-[60vw]" />
          <div className="flex flex-row flex-wrap mt-7 gap-11">
            {filteredCrops.length > 0 ? (
              filteredCrops.map((crop) => (
                <div>
                  <CropCard
                    crop={crop.crop}
                    name={crop.crop_category.name}
                    key={crop.crop.id}
                  />
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center w-[60vw] h-[50vh] bg-white border-2 border-dashed border-emerald-100 rounded-[2.5rem] p-8 text-center">
                {/* Icon Container with a soft glow */}
                <div className="flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-emerald-50">
                  <Flower2
                    className="text-emerald-600 animate-pulse"
                    size={48}
                    strokeWidth={1.5}
                  />
                </div>

                {/* Text Content */}
                <h3 className="text-2xl font-semibold text-slate-800 mb-2">
                  No crops found
                </h3>
                <p className="text-slate-500 max-w-[280px] mb-8 leading-relaxed">
                  It looks like your field is empty. Try adjusting your filters
                  or adding a new crop to get started.
                </p>
              </div>
            )}
          </div>
          <hr className="border-gray-300 w-[60vw] mt-5 mb-5" />
          {/* Pagination */}
          <div className="mb-9">
            <div className="flex justify-between items-center flex-row w-[86%]">
              <h1 className="text-[14px] font-[Inter]">
                Showing{" "}
                <span className="font-bold">
                  {currentPage} of {totalPage}{" "}
                </span>
                of {totalCrops} crops
              </h1>
              <div className="join">
                {simpleArray.map((item) => (
                  <input
                    key={item}
                    className="join-item btn btn-square"
                    type="radio"
                    onClick={() => {
                      // TODO: Implement pagination logic
                      setPagination(item);
                    }}
                    name="pagination"
                    aria-label={item.toString()}
                    defaultChecked={item === 1}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CropList;
