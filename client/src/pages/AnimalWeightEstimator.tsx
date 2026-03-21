import { useState } from "react";
import { Scale, Ruler, Heart } from "lucide-react";
import { useAnimalWeightEstimation } from "../hooks/hooks";
import { useQueryClient } from "@tanstack/react-query";

const ANIMALS = [
  {
    id: "buffalo",
    label: "BUFFALO",
    image:"/buffalo.png",

  },
  {
    id: "cow",
    label: "COW",
    image:"/cow.png",
  },
  {
    id: "goat",
    label: "GOAT",
    image:"/goat.svg",
  },
  {
    id: "sheep",
    label: "SHEEP",
    image:"/sheep.png",
  },
];



function AnimalWeightEstimator() {
  const [selected, setSelected] = useState("buffalo");
  const [heartGirth, setHeartGirth] = useState("");
  const [bodyLength, setBodyLength] = useState("");


  const {mutate} = useAnimalWeightEstimation();
  const queryClient = useQueryClient();

  const data = queryClient.getQueryData(["animalWeightEstimationResult"]) as any;

  const handleEstimate = () => {
console.log("Estimating weight for", { selected, heartGirth, bodyLength });
 // Clear previous result while loading
const finalData :{animalName: string, heartGirth: string, bodyLength: string} = {
    animalName: selected,
    heartGirth: heartGirth,
    bodyLength: bodyLength
};

mutate(finalData);

  };

  return (
    <div className="min-h-screen bg-[#FAFAF5]  pt-10 pl-50 font-[font3]">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.18em] text-[#8B6355] mb-3">
          Livestock Management / Bio-Metrics
        </p>

        <h1 className="text-5xl font-[font3] font-bold text-[#2C1A10] leading-tight">
          Animal Weight
        </h1>
        <h1 className="text-6xl font-bold text-[#7C4A2D]">
          Biometric Estimator
        </h1>

        <div className="mt-4 w-16 h-1 bg-[#7C4A2D] rounded-full" />
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left Panel */}
        <div className="flex-1 max-w-xl">
          {/* Subject Selection */}
          <div className="mb-8">
            <h2 className="text-2xl mb-3 font-bold text-[#2C1A10]">
              Subject Selection
            </h2>
            <p className=" text-[18px] text-[#765C5B] mb-5">
              Choose the livestock category for biometric analysis.
            </p>

            <div className="flex gap-3">
              {ANIMALS.map((animal) => {
                const isActive = selected === animal.id;

                return (
                  <button
                    key={animal.id}
                    onClick={() => setSelected(animal.id)}
                    className={`flex-1 flex flex-col font-[font5]  items-center justify-center py-6 rounded-2xl transition-all
                    ${isActive
                        ? "bg-[#7C4A2D] text-[#FFF8F0] shadow-lg scale-[1.02]"
                        : "bg-[#FFFFF8] text-[#5C3D2A] border border-[#E2D5C8]"
                    }`}
                  >
                    <div className="w-25 h-25 ">
                        <img src={animal.image} alt={animal.label} />
                    </div>
                    <span className="mt-3 text-xs font-bold tracking-[0.15em]">
                      {animal.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Heart Girth */}
          <div className="mb-5">
            <label className="block text-xs font-bold tracking-[0.14em] text-[#8B6355] mb-2">
              <Heart className="inline w-3.5 h-3.5 mr-1" />
              HEART GIRTH (INCHES)
            </label>

            <input
              type="number"
              value={heartGirth}
              onChange={(e) => setHeartGirth(e.target.value)}
              placeholder="0.0"
              className="w-full px-5 py-4 rounded-xl bg-[#F4F4EF] border border-[#D6CCBC] text-lg text-[#2C1A10]
              focus:outline-none focus:border-[#7C4A2D] transition-all"
            />
          </div>

          {/* Body Length */}
          <div className="mb-8">
            <label className="block text-xs font-bold tracking-[0.14em] text-[#8B6355] mb-2">
              <Ruler className="inline w-3.5 h-3.5 mr-1" />
              BODY LENGTH (INCHES)
            </label>

            <input
              type="number"
              value={bodyLength}
              onChange={(e) => setBodyLength(e.target.value)}
              placeholder="0.0"
              className="w-full px-5 py-4 rounded-xl bg-[#F4F4EF] border border-[#D6CCBC] text-lg text-[#2C1A10]
              focus:outline-none focus:border-[#7C4A2D] transition-all"
            />
          </div>

          <button
            onClick={handleEstimate}
            className="w-full py-4 rounded-2xl bg-[#4A2410] text-[#FFF8F0] font-bold tracking-[0.15em]
            flex items-center justify-center gap-2 transition hover:bg-[#7C4A2D] active:scale-95"
          >
            <Scale className="w-4 h-4" />
            ESTIMATE WEIGHT
          </button>
        </div>

        {/* Right Panel */}
        <div className="flex flex-col gap-5 lg:w-80">
          {/* Output Card */}
          <div className="rounded-3xl p-8 bg-[#EDE8DF] border border-dashed border-[#C4B5A5] flex flex-col items-center text-center min-h-65 justify-center">
            <p className="text-xs font-bold tracking-[0.18em] text-[#8B6355] mb-6">
              COMPUTED OUTPUT
            </p>

            <div className="text-7xl font-bold text-[#5C2E10] mb-3">
              {data?.weight ?? "--"}
            </div>

            {data?.weight && (
              <span className="px-3 py-1 bg-[#7C4A2D] text-[#FFF8F0] rounded-full text-sm font-bold mb-4">
                KG
              </span>
            )}

            <p className="text-sm text-[#7A6558] mb-6">
              Estimation based on standard Shaeffer's formula for livestock.
            </p>


          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimalWeightEstimator;
