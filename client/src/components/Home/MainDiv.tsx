
const MainDiv = () => {
    return (
        <div className="flex w-screen ">
            <div className="bg-[#F4F4F4]  gap-2 flex-col pt-15 pl-20 w-[50%]  ">
                <h1 className="font-[font10] text-[70px] leading-19">
                    SMARTER FARMING STARTS HERE
                </h1>
                <img className="pl-20 mt-10" src="https://static.wixstatic.com/media/c837a6_640e5c4cf79446709979b7c8910fab10~mv2.png/v1/fill/w_474,h_331,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c837a6_640e5c4cf79446709979b7c8910fab10~mv2.png"/>

                <div className="mt-20 flex gap-7">
                    <div className="w-[60%]">
                        <h1 className="font-[font10] text-[21px] ">
                            [WE ARE AGRILEARN,]
                            <br/>
                            <h1 className="font-[font3] mt-2 text-[22px]">
                                We transform your farm’s information into simple, actionable steps that increase efficiency, improve yield, and grow profits.                            </h1>
                        </h1>
                    </div>

                    <div className="flex flex-col gap-3 mt-8">
                        <button className="bg-[#F3FFB2] font-[font10] cursor-pointer text-[18px] hover:underline px-10 border rounded-4xl py-2">START A DEMO</button>
                        <button className="bg-[#F4F4F4] font-[font10] cursor-pointer text-[18px] hover:underline px-10 border rounded-4xl py-2">LEARN MORE</button>

                    </div>
                    <div>

                    </div>
                </div>
            </div>

            <div>
                <img src="https://static.wixstatic.com/media/c837a6_c4ed95fbed47474ebda947b3f5fb94ff~mv2.png/v1/fill/w_820,h_882,fp_0.54_0.36,q_90,usm_0.66_1.00_0.01,enc_auto/weavy-Gemini%203%20(Nano%20Banana%20Pro)-2025-12-23%20at%2015_19_47.png"/>
            </div>
        </div>
    )
}
export default MainDiv
