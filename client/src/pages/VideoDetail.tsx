import { useState, useRef, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetAllVideo, useGetVideoById } from "../hooks/hooks";

// ─── Icons ────────────────────────────────────────────────────────────────────

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);

const VolumeHighIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
  </svg>
);

const VolumeMuteIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
  </svg>
);

const FullscreenIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
  </svg>
);

const ExitFullscreenIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
  </svg>
);

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatTime(secs: number) {
  if (!secs || isNaN(secs)) return "0:00";
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// ─── Custom Video Player ───────────────────────────────────────────────────────

function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(0);       // 0-1
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [muted, setMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showCenterFlash, setShowCenterFlash] = useState(false);
  const [centerFlashPlaying, setCenterFlashPlaying] = useState(false);
  const [buffered, setBuffered] = useState(0);   // 0-1
  const [isDragging, setIsDragging] = useState(false);

  // ── Auto-hide controls ───────────────────────────────────────────────────
  const scheduleHide = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShowControls(false), 3000);
  }, []);

  const revealControls = useCallback(() => {
    setShowControls(true);
    scheduleHide();
  }, [scheduleHide]);

  useEffect(() => {
    scheduleHide();
    return () => { if (hideTimer.current) clearTimeout(hideTimer.current); };
  }, [scheduleHide]);

  // ── Event handlers ────────────────────────────────────────────────────────
  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
    // center flash
    setCenterFlashPlaying(!v.paused);
    setShowCenterFlash(true);
    setTimeout(() => setShowCenterFlash(false), 600);
  };

  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || isDragging) return;
    setPlayed(v.currentTime / v.duration || 0);
    // buffered
    if (v.buffered.length > 0) {
      setBuffered(v.buffered.end(v.buffered.length - 1) / v.duration || 0);
    }
  };

  const onLoadedMetadata = () => {
    setDuration(videoRef.current?.duration || 0);
  };

  const onEnded = () => setPlaying(false);

  // ── Seek ──────────────────────────────────────────────────────────────────
  const seekTo = (clientX: number) => {
    const bar = progressRef.current;
    const v = videoRef.current;
    if (!bar || !v) return;
    const rect = bar.getBoundingClientRect();
    const frac = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    v.currentTime = frac * v.duration;
    setPlayed(frac);
  };

  const onProgressClick = (e: React.MouseEvent<HTMLDivElement>) => seekTo(e.clientX);

  const onProgressMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    seekTo(e.clientX);
    const onMove = (ev: MouseEvent) => seekTo(ev.clientX);
    const onUp = () => { setIsDragging(false); window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  // ── Volume ────────────────────────────────────────────────────────────────
  const onVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) videoRef.current.volume = val;
    setMuted(val === 0);
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    if (muted) { v.muted = false; v.volume = volume || 0.5; setMuted(false); }
    else { v.muted = true; setMuted(true); }
  };

  // ── Fullscreen ────────────────────────────────────────────────────────────
  const toggleFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  // ── Keyboard ────────────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      if (e.code === "Space") { e.preventDefault(); togglePlay(); }
      if (e.code === "ArrowRight" && videoRef.current) videoRef.current.currentTime += 5;
      if (e.code === "ArrowLeft" && videoRef.current) videoRef.current.currentTime -= 5;
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const controlsVisible = showControls || !playing;

  return (
    <div
      ref={containerRef}
      className="relative rounded-2xl overflow-hidden bg-black select-none"
      style={{ aspectRatio: "16/9", cursor: controlsVisible ? "default" : "none" }}
      onMouseMove={revealControls}
      onMouseLeave={() => playing && setShowControls(false)}
      onClick={togglePlay}
    >
      {/* ── Video Element ── */}
      <video
        ref={videoRef}
        key={src}
        src={src}
        className="w-full h-full object-contain"
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={onEnded}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={(e) => console.error("Video error:", e)}
      />

      {/* ── Gradient overlays ── */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10 transition-opacity duration-300 pointer-events-none"
        style={{ opacity: controlsVisible ? 1 : 0 }}
      />

      {/* ── Center Play/Pause Flash ── */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          opacity: showCenterFlash ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      >
        <div className="w-20 h-20 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center border border-white/20 scale-100"
          style={{
            transform: showCenterFlash ? "scale(1)" : "scale(1.3)",
            transition: "transform 0.4s ease, opacity 0.4s ease",
          }}
        >
          <div className="w-9 h-9 text-white ml-0.5">
            {centerFlashPlaying ? <PauseIcon /> : <PlayIcon />}
          </div>
        </div>
      </div>

      {/* ── Center static play button (only when paused & controls hidden center) ── */}
      {!playing && !showCenterFlash && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-20 h-20 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-2xl"
            style={{ transition: "all 0.2s ease" }}
          >
            <div className="w-9 h-9 text-white ml-1">
              <PlayIcon />
            </div>
          </div>
        </div>
      )}

      {/* ── Bottom controls bar ── */}
      <div
        className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-10 pointer-events-none"
        style={{
          opacity: controlsVisible ? 1 : 0,
          transform: controlsVisible ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
        }}
      >
        {/* Progress bar */}
        <div
          ref={progressRef}
          className="relative h-1.5 rounded-full mb-3 group/bar cursor-pointer pointer-events-auto"
          style={{ background: "rgba(255,255,255,0.2)" }}
          onClick={(e) => { e.stopPropagation(); onProgressClick(e); }}
          onMouseDown={(e) => { e.stopPropagation(); onProgressMouseDown(e); }}
        >
          {/* Buffered */}
          <div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{ width: `${buffered * 100}%`, background: "rgba(255,255,255,0.3)" }}
          />
          {/* Played */}
          <div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              width: `${played * 100}%`,
              background: "linear-gradient(90deg, #52b788, #74c69d)",
            }}
          />
          {/* Thumb */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-lg opacity-0 group-hover/bar:opacity-100 transition-opacity"
            style={{ left: `calc(${played * 100}% - 7px)` }}
          />
          {/* Hover grow effect */}
          <div className="absolute inset-0 rounded-full group-hover/bar:scale-y-[1.8] transition-transform origin-center pointer-events-none" />
        </div>

        {/* Controls row */}
        <div className="flex items-center justify-between pointer-events-auto" onClick={(e) => e.stopPropagation()}>
          {/* Left: play + volume + time */}
          <div className="flex items-center gap-3">
            {/* Play/Pause */}
            <button
              className="w-8 h-8 flex items-center justify-center text-white hover:text-[#74c69d] transition-colors"
              onClick={togglePlay}
            >
              <div className="w-5 h-5">
                {playing ? <PauseIcon /> : <PlayIcon />}
              </div>
            </button>

            {/* Volume */}
            <div className="flex items-center gap-1.5 group/vol">
              <button
                className="text-white hover:text-[#74c69d] transition-colors"
                onClick={toggleMute}
              >
                {muted || volume === 0 ? <VolumeMuteIcon /> : <VolumeHighIcon />}
              </button>
              <div className="overflow-hidden w-0 group-hover/vol:w-20 transition-all duration-300 ease-in-out">
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={muted ? 0 : volume}
                  onChange={onVolumeChange}
                  className="w-full h-1 accent-[#52b788] cursor-pointer"
                  style={{ accentColor: "#52b788" }}
                />
              </div>
            </div>

            {/* Time */}
            <span className="text-white/80 text-xs font-mono tabular-nums">
              {formatTime(played * duration)} / {formatTime(duration)}
            </span>
          </div>

          {/* Right: fullscreen */}
          <button
            className="text-white hover:text-[#74c69d] transition-colors"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? <ExitFullscreenIcon /> : <FullscreenIcon />}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function VideoDetail() {
  const { id: videoId } = useParams();
  const navigate = useNavigate();
  const { data: allVideos, isLoading: allLoading } = useGetAllVideo();
  const { data: video, isLoading: videoLoading } = useGetVideoById(videoId!);

  const isLoading = allLoading || videoLoading;
  const [showMore, setShowMore] = useState(false);

  if (isLoading) {
    return (
      <div className="font-['DM_Sans','Segoe_UI',sans-serif] bg-[#f0ede8] min-h-screen text-[#1a1a1a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-[#52b788] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-base tracking-wide">Loading video...</p>
        </div>
      </div>
    );
  }

  const desc = video?.video?.description ?? "";

  return (
    <div className="font-['DM_Sans','Segoe_UI',sans-serif] bg-[#f0ede8] min-h-screen text-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-8 py-8 grid grid-cols-[1fr_320px] gap-8 items-start">

        {/* ── Left column ── */}
        <div>
          {/* Custom Video Player */}
          {video?.video?.video_link ? (
            <VideoPlayer src={video.video.video_link} />
          ) : (
            <div className="rounded-2xl bg-black flex items-center justify-center text-white/40 text-sm" style={{ aspectRatio: "16/9" }}>
              No video available
            </div>
          )}

          {/* Title & meta */}
          <div className="mt-5">
            <h1 className="text-2xl font-extrabold tracking-tight leading-tight m-0">
              {video?.video?.title || "—"}
            </h1>
            <div className="flex items-center gap-2 mt-2 text-gray-500 text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#52b788] inline-block" />
              <span>
                {video?.video?.createdAt
                  ? new Date(video.video.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
                  : "Published recently"}
              </span>
            </div>
          </div>

          {/* Channel card + description */}
          <div className="bg-white rounded-2xl p-5 mt-4 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#1b4332] to-[#52b788] flex items-center justify-center shrink-0">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                </svg>
              </div>
              <div className="font-bold text-sm text-[#1a1a1a]">The Terra Flora Institute</div>
            </div>

            <div className="text-base leading-relaxed text-gray-700">
              {desc.length > 200 ? (
                <>
                  <p className="m-0 mb-2 whitespace-pre-line">
                    {showMore ? desc : desc.slice(0, 200) + "…"}
                  </p>
                  <button
                    onClick={() => setShowMore((s) => !s)}
                    className="text-[#2d6a4f] font-semibold text-sm flex items-center gap-1 hover:underline"
                  >
                    {showMore ? "Show Less" : "Show More"}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                      className={`transition-transform duration-200 ${showMore ? "rotate-180" : ""}`}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                </>
              ) : (
                <p className="m-0 whitespace-pre-line">{desc || "No description provided."}</p>
              )}
            </div>
          </div>
        </div>

        {/* ── Right column — Recommended ── */}
        <div className="sticky top-6">
          <p className="text-xs font-extrabold tracking-widest text-gray-400 mb-4 uppercase">
            Up Next
          </p>
          <div className="flex flex-col gap-3">
            {(allVideos?.videos?.filter((v: { id: string; title: string; description?: string; thumbnail?: string }) => v.id !== videoId) || []).map((v: { id: string; title: string; description?: string; thumbnail?: string }) => (
              <div
                key={v.id}
                className="flex gap-3 cursor-pointer rounded-xl p-2 hover:bg-black/5 transition-colors duration-150 group/card"
                onClick={() => navigate(`/video/${v.id}`)}
              >
                {/* Thumbnail */}
                <div className="w-36 h-20 rounded-lg overflow-hidden shrink-0 bg-gray-900 relative">
                  <img
                    src={v.thumbnail || "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=200&q=80"}
                    alt={v.title}
                    className="w-full h-full object-cover opacity-80 group-hover/card:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="white" className="ml-0.5">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0 py-0.5">
                  <p className="text-sm font-semibold leading-snug line-clamp-2 text-[#1a1a1a] m-0">
                    {v.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-1 m-0">
                    {v.description?.split(" ").slice(0, 8).join(" ")}…
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
