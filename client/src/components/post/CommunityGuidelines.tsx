import { useState } from "react";
import { Leaf, MessageSquare, List, Image as ImageIcon, Sprout } from "lucide-react";

const guidelines = [
  {
    icon: List,
    title: "Use clear titles",
    desc: "State the primary cultivar or challenge clearly in the header.",
  },
  {
    icon: ImageIcon,
    title: "Attach high-quality media",
    desc: "Visual data helps agronomists diagnose issues and appreciate progress.",
  },
  {
    icon: Sprout,
    title: "Detail your soil health",
    desc: "Context is key. Mention soil type, pH, or local climate zone.",
  },
];

export default function CommunityGuidelines() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="flex mr-20 mt-20 rounded-2xl sticky top-20 items-center justify-center bg-[#e8e8e0] font-[font5]">
      <div className="w-full max-w-[420px] bg-[#E1E1DC] rounded-2xl overflow-hidden shadow-xl">
        {/* Community Guidelines Section */}
        <div className="px-7 pt-8 pb-6">
          <h2 className="text-[22px] font-[medium] mb-1 text-[#2c3323] tracking-tight">
            Community Guidelines
          </h2>
          <div className="mb-4 mt-1 h-[2px] w-10 bg-[#7a9a50] rounded" />
          <p className="text-[15px] mb-6 font-[font3] text-[#536161] leading-7">
            The Harvest is built on shared knowledge. Follow these tips for better 'sowing' within our collective.
          </p>

          {/* Guidelines List */}
          <div className="flex flex-col gap-5">
            {guidelines.map((g, i) => {
              const Icon = g.icon;
              const isHovered = hovered === i;

              return (
                <div
                  key={i}
                  className={`flex items-start gap-4 cursor-pointer transition-transform duration-200 ${
                    isHovered ? "translate-x-1" : "translate-x-0"
                  }`}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div
                    className={`shrink-0 flex items-center justify-center rounded-lg mt-0.5 w-10 h-10 transition-colors ${
                      isHovered
                        ? "bg-[#7a9a50] text-white"
                        : "bg-[#ddddd4] text-[#5a5f4a]"
                    }`}
                  >
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="font-[medium] text-sm mb-0.5 text-[#2c3323]">
                      {g.title}
                    </p>
                    <p className="text-[14px] font-[font5] text-[#7a7d6a] ">{g.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#d8d8cf] mx-7" />

        {/* Post Engagement Section */}
        <div className="px-7 pt-5 pb-5">
          <p className="text-xs font-bold tracking-widest mb-3 uppercase text-[#9a9d8a]">
            Post Engagement
          </p>

          <div className="rounded-xl p-4 flex flex-col gap-4 bg-[#e8e8df]">
            {/* Leaves */}
            <div className="flex items-start gap-3">
              <div className="shrink-0 flex items-center justify-center rounded-lg w-9 h-9 bg-[#c9d8b0] text-[#4a7230]">
                <Leaf size={18} />
              </div>
              <p className="text-xs text-[#5a5f4a] leading-7 pt-0.5">
                <span className="font-semibold text-[#2c3323]">Leaves:</span>{' '}
                Use the leaf icons to upvote (green) or downvote (clay) posts based on utility.
              </p>
            </div>

            <div className="h-px bg-[#d0d0c6]" />

             <div className="flex items-start gap-3">
              <div className="shrink-0 rotate-180 flex items-center justify-center rounded-lg w-9 h-9 bg-[#FBD9CC] text-[#582006]">
                <Leaf size={18} />
              </div>
              <p className="text-xs text-[#5a5f4a] leading-7 pt-0.5">
                <span className="font-semibold text-[#2c3323]">Leaves:</span>{' '}
                Use the leaf icons to upvote (green) or downvote (clay) posts based on utility.
              </p>
            </div>

                        <div className="h-px bg-[#d0d0c6]" />


            {/* Comments */}
            <div className="flex items-start gap-3">
              <div className="shrink-0 flex items-center justify-center rounded-lg w-9 h-9 bg-[#ddddd4] text-[#5a5f4a]">
                <MessageSquare size={18} />
              </div>
              <p className="text-xs text-[#5a5f4a] leading-7 pt-0.5">
                <span className="font-semibold text-[#2c3323]">Comments:</span>{' '}
                Professional feedback and constructive critique are encouraged.
              </p>
            </div>
          </div>
        </div>

        {/* Banner Image */}
        <div className="relative mx-4 mb-4 rounded-xl overflow-hidden h-[130px]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,#7aad40_0%,#4a7a28_35%,#2c5218_70%,#1a3810_100%)]" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(220,255,150,0.25)_0%,transparent_50%),radial-gradient(circle_at_70%_60%,rgba(180,230,100,0.15)_0%,transparent_40%)]" />

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120px] h-[70px] opacity-85 bg-[radial-gradient(ellipse_at_50%_80%,#6b4c2a_0%,#4a3018_60%,transparent_100%)] rounded-t-full" />

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-20 h-8 opacity-90 bg-[radial-gradient(ellipse_at_50%_50%,#8b6540_0%,#5c3e22_80%)] rounded-full" />

          <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-linear-to-t from-[rgba(20,38,10,0.75)] to-transparent">
            <p className="font-bold text-sm text-white drop-shadow">
              Join the 2024 Soil Health Summit
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
