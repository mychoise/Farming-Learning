import Filter from "../components/crop/Filter"

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
    <div className="ml-31.75 mt-10">
      <Filter/>
    </div>
    </>
  )
}

export default CropList