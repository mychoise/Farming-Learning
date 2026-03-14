import { Leaf } from "lucide-react";

const CropCard = ({ crop, name }: { crop: any; name: any }) => {
  return (
    <div className="w-72 rounded-2xl overflow-hidden shadow h-140">
      <div className="w-full h-[50%] overflow-hidden bg-red-700">
        <img className="w-full h-full object-cover" src={crop.imageUrl}></img>
      </div>
      <div>
        <div className="p-4 font-[Inter] flex justify-between">
          <h1 className="text-black font-[medium] text-[25px]">{crop.name}</h1>
          <h1 className="text-black pt-2 pl-6 pr-6 border border-gray-500 bg-gray-100 text-[12px] rounded-full">
            {crop.difficulty.charAt(0).toUpperCase() + crop.difficulty.slice(1)}
          </h1>
        </div>
        <div className="pl-4 -mt-3">
          <h1 className=" text-[18px] text-green-600">{crop.nepaliName}</h1>
          <h1 className="font-[Inter] mt-5 text-gray-500 text-[14px]">
            {crop.description.slice(0, 130)}
          </h1>
          <div className="flex pt-2 pb-2 pr-2 pl-2  bg-[#FAFAF9] w-47 rounded-full items-center gap-2 mt-5">
            <Leaf size={17} color="green" />
            <h1 className="text-[#676056] font-[Inter] text-[13px]">
              Category: {name}
            </h1>
          </div>
          <div>
            <button className="bg-green-600 font-[Inter] text-white px-4 py-2 w-[95%] rounded-xl text-[14px] mt-5">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropCard;
