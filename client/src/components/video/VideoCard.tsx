function VideoCard({ video, isActive, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`relative rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 ${
        isActive ? "ring-2 ring-[#5db85a] scale-[1.02]" : "hover:scale-[1.02] hover:ring-1 hover:ring-white/20"
      }`}
      style={{ aspectRatio: "16/10" }}
    >
      <img
        src={video.thumbnail}
        alt={video.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
            isActive
              ? "bg-[#5db85a] shadow-lg shadow-[#5db85a]/40"
              : "bg-white/20 backdrop-blur-sm group-hover:bg-white/30"
          }`}
        >
          <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <p className="text-white text-[15px] font-[font5] leading-tight line-clamp-2 ">
          {video.title}
        </p>
      </div>
    </div>
  );
}

export default VideoCard;
