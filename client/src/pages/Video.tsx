import { useState, } from "react";
import VideoCard from "../components/video/VideoCard";
import { useGetAllVideo } from "../hooks/hooks";
import { useNavigate } from "react-router-dom";


function CategoryBadge({ label }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-widest bg-[#2d5a27] text-[#a8d5a2] border border-[#3a7a32]/60 uppercase">
      {label}
    </span>
  );
}



export default function Video() {
  const [showPlayer, setShowPlayer] = useState(false);
console.log("hello");
const { data:videos } = useGetAllVideo();
console.log("data is", videos);
const navigate  =useNavigate()
//   const [activeVideo, setActiveVideo] = useState(videos?.videos?.[0]);

console.log(videos?.videos?.[0]?.video_link);




  const handleSelectVideo = (video) => {
navigate(`/video/${video.id}`)
  };

  return (
    <div
      className="min-h-screen w-full px-35 py-10 "
      style={{ backgroundColor: "#f0ede6", fontFamily: "'Georgia', 'Times New Roman', serif" }}
    >
      {/* Header */}
      <div className="mb-6">
        <p
          className="text-xs font-[font3] tracking-[0.25em] uppercase mb-1"
          style={{ color: "#4a7c40"}}
        >
          Editor's Choice
        </p>
        <h1
          className="text-3xl font-[medium] leading-tight"
          style={{ color: "#1a3a14" }}
        >
          Featured Insights
        </h1>
      </div>

      {/* Featured Player */}
      <div className="relative rounded-2xl overflow-hidden mb-5 group" style={{ backgroundColor: "#0d1a0c" }}>
        {/* Thumbnail / Player */}
        <div onClick={()=>handleSelectVideo(videos?.videos?.[0])} className="relative w-full" style={{ aspectRatio: "16/7" }}>

            <>
              {/* Background image with rings overlay */}
              <img
                src={videos?.videos?.[0]?.thumbnail}
                alt={videos?.videos?.[0]?.title}
                className="absolute inset-0 w-full h-full object-cover opacity-20"
              />
              {/* Concentric ring decorative effect */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full border border-white/5"
                    style={{
                      width: `${(i + 1) * 120}px`,
                      height: `${(i + 1) * 120}px`,
                    }}
                  />
                ))}
              </div>
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1a0c]/90 via-transparent to-transparent" />

              {/* Center play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  className="w-20 h-20 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-2xl transition-transform duration-200 hover:scale-110 active:scale-95"
                >
                  <svg className="w-8 h-8 text-[#1a3a14] ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>

              {/* Bottom-left info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                <div className="space-y-2 max-w-md">
                  <div className="flex items-center gap-3">
                  </div>
                  <h2 className="text-white text-2xl md:text-3xl font-[font3] leading-tight drop-shadow-lg">
                    {videos?.videos?.[0]?.title}
                  </h2>
                </div>

                {/* Corner play button */}
                <button
                  className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center border border-white/20 transition-all duration-200 hover:scale-110 flex-shrink-0"
                >
                  <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
            </>
        </div>
      </div>

      {/* Small Video Cards */}
      <div className="grid grid-cols-2 mt-10  md:grid-cols-4 gap-5">
        {videos?.videos?.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            isActive={false}
            onClick={() => handleSelectVideo(video)}
          />
        ))}
      </div>
    </div>
  );
}
