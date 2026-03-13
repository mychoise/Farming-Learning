import { ChevronRight } from "lucide-react"
import Filter from "../components/crop/Filter"
import CropCard from "../components/crop/CropCard"

const CropList = () => {
  return (
    <>
    <div className='bg-[#F2FDF5] shadow pl-31.75 h-[25vh] pt-12 pb-6 flex flex-col w-full'>
        <h1 className=" text-[40px] font-black font-[medium] text-black">Explore our <span className=" font-black italic text-green-600">Crop Catalog</span></h1>
        <div className="text-[17px] w-[43%] mt-5 font-[font1] text-black">
          <p className="text-[#676056] font-[Inter]">
            Discover the best crops for your region in Nepal. Filter by season and difficulty to find your perfect match and start your growing journey today.
          </p>
        </div>
    </div>
    {/* Filters and Result */}
    <div className="ml-31.75 flex flex-row gap-20 mt-10">
      <Filter/>
      <div className="flex flex-col gap-5">
      <div className="flex flex-row items-center h-5 -gap-[6px]">
        <h1 className="bg-[#F2FDF5] px-4 py-2 rounded-full text-green-600 font-bold">48 Total Crops</h1>
        <span><ChevronRight size={20} /></span>
        <span className="text-gray-600 font-[medium] text-[16px]">Showing Winter & Summer</span>
      </div>
      <h1 className="text-3xl font-black">Matching Results</h1>
      <hr className="border-gray-300 w-[60vw]" />
      <div className="flex flex-row mt-7 gap-11">
        <CropCard/>
        <CropCard/>
        <CropCard/>
      </div>
      </div>
    </div>
    </>
  )
}

export default CropList