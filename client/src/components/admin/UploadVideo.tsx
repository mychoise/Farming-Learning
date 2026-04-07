import { useState, useRef } from "react";
import {useUploadVideo} from "../../hooks/hooks.tsx";

const categories = [
    "Crop Rotation Systems",
    "Soil Science",
    "Pest Management",
    "Irrigation Techniques",
    "Organic Farming",
    "Harvesting Methods",
];

export default function UploadVideo() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Crop Rotation Systems");
    const [uploadProgress, setUploadProgress] = useState(65);
    const [isUploading, setIsUploading] = useState(true);
    const [thumbnail, setThumbnail] = useState(null);
    const [dragOver, setDragOver] = useState(false);
    const [published, setPublished] = useState(false);
    const fileInputRef = useRef(null);
    const thumbInputRef = useRef(null);

    const {mutate , isPending} = useUploadVideo();

    const handleFileDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer?.files?.[0];
        if (file) simulateUpload();
    };

    const simulateUpload = () => {
        setIsUploading(true);
        setUploadProgress(0);
        const interval = setInterval(() => {
            setUploadProgress((p) => {
                if (p >= 100) { clearInterval(interval); setIsUploading(false); return 100; }
                return p + 2;
            });
        }, 80);
    };

    const handleThumbChange = (e) => {
        const file = e.target.files?.[0];
        if (file) setThumbnail(URL.createObjectURL(file));
    };

    const handlePublish = () => {
        if (!title.trim()) return alert("Please enter a video title.");
        setPublished(true);
        setTimeout(() => setPublished(false), 3000);
        console.log("title is", title);
        console.log("description is",description);
        console.log("category is",category);
        console.log("thumbnail is",thumbInputRef.current.files[0]);
        console.log("video is",fileInputRef.current.files[0])
        const formData = new FormData();
        console.log("sending data to server")
        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("thumbnail", thumbInputRef.current.files[0]);
        formData.append("video", fileInputRef.current.files[0]);
        mutate(formData);
    };

    return (
        <div className=" bg-[#f5f4ef] font-[font3]">
            {/* Top nav hint */}
            <div className="px-8 pt-6 pb-2">
            </div>

            <div className="max-w-6xl mx-auto px-8 pb-16">
                {/* Header */}
                <div className="mb-8 mt-3">
                    <h1 className="text-4xl font-bold text-[#1e2a12] tracking-tight leading-tight">
                        Upload New Course Video
                    </h1>
                    <p className="mt-2 text-[#5a6344] text-base max-w-xl leading-relaxed">
                        Create high-quality educational material for the academy. Ensure your video metadata is accurate for better searchability.
                    </p>
                </div>

                <div className="flex gap-6 items-start">
                    {/* Left Column */}
                    <div className="flex-1 flex flex-col gap-5">
                        {/* Video Details Card */}
                        <div className="bg-white rounded-2xl shadow-sm border border-[#e4e2d8] p-7">
                            <div className="flex items-center gap-2.5 mb-6">
                <span className="text-[#4a7c3f] text-xl">
                  <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M4 6h16M4 10h16M4 14h10"/><circle cx="18" cy="17" r="3"/><path d="M18 14v3l1.5 1.5"/></svg>
                </span>
                                <h2 className="text-lg font-bold text-[#1e2a12]">Video Details</h2>
                            </div>

                            <div className="mb-5">
                                <label className="block text-sm font-semibold text-[#2d3a1e] mb-2">Video Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g., Organic Soil Preparation Masterclass"
                                    className="w-full bg-[#f7f6f1] border border-[#dddbd2] rounded-xl px-4 py-3 text-[#2d3a1e] text-sm placeholder-[#aaa89a] focus:outline-none focus:ring-2 focus:ring-[#4a7c3f]/30 focus:border-[#4a7c3f] transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-[#2d3a1e] mb-2">Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Describe the course content, learning objectives, and any prerequisites..."
                                    rows={6}
                                    className="w-full bg-[#f7f6f1] border border-[#dddbd2] rounded-xl px-4 py-3 text-[#2d3a1e] text-sm placeholder-[#aaa89a] focus:outline-none focus:ring-2 focus:ring-[#4a7c3f]/30 focus:border-[#4a7c3f] transition-all resize-none"
                                />
                            </div>
                        </div>

                        {/* Media Assets Card */}
                        <div className="bg-white rounded-2xl shadow-sm border border-[#e4e2d8] p-7">
                            <div className="flex items-center gap-2.5 mb-6">
                <span className="text-[#4a7c3f] text-xl">
                  <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><rect x="2" y="7" width="20" height="15" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>
                </span>
                                <h2 className="text-lg font-bold text-[#1e2a12]">Media Assets</h2>
                            </div>

                            <div className="grid grid-cols-2 gap-5">
                                {/* Video Upload */}
                                <div>
                                    <label className="block text-sm font-semibold text-[#2d3a1e] mb-3">Video File</label>
                                    <div
                                        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                                        onDragLeave={() => setDragOver(false)}
                                        onDrop={handleFileDrop}
                                        onClick={() => fileInputRef.current?.click()}
                                        className={`border-2 border-dashed rounded-xl flex flex-col items-center justify-center py-10 px-4 cursor-pointer transition-all ${
                                            dragOver ? "border-[#4a7c3f] bg-[#eef5eb]" : "border-[#c8c5b6] bg-[#f7f6f1] hover:border-[#4a7c3f] hover:bg-[#f0f5ec]"
                                        }`}
                                    >
                                        <input ref={fileInputRef} type="file" accept="video/mp4,video/quicktime" className="hidden" onChange={simulateUpload} />
                                        <div className="w-12 h-12 bg-[#e8f0e4] rounded-xl flex items-center justify-center mb-3">
                                            <svg width="24" height="24" fill="none" stroke="#4a7c3f" viewBox="0 0 24 24" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="3"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
                                        </div>
                                        <p className="text-sm font-semibold text-[#2d3a1e]">Upload MP4 or MOV</p>
                                        <p className="text-xs text-[#8a8872] mt-1">Up to 2GB, 4K recommended</p>
                                    </div>

                                </div>

                                {/* Thumbnail */}
                                <div>
                                    <label className="block text-sm font-semibold text-[#2d3a1e] mb-3">Thumbnail Preview</label>
                                    <div className="relative rounded-xl overflow-hidden bg-[#3a3a3a] aspect-video flex items-center justify-center group cursor-pointer"
                                         onClick={() => thumbInputRef.current?.click()}>
                                        <input ref={thumbInputRef} type="file" accept="image/jpeg,image/png" className="hidden" onChange={handleThumbChange} />
                                        {thumbnail ? (
                                            <img src={thumbnail} alt="Thumbnail" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-2/3 h-2/3 bg-[#555] rounded-lg" />
                                        )}
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="flex items-center gap-2 bg-white/90 text-[#2d3a1e] text-xs font-semibold px-3 py-2 rounded-lg">
                        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                        Replace Thumbnail
                      </span>
                                        </div>
                                        {!thumbnail && (
                                            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center py-2 bg-black/30">
                        <span className="flex items-center gap-1.5 text-white text-xs font-medium">
                          <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                          Replace Thumbnail
                        </span>
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-[10px] text-[#8a8872] mt-2 uppercase tracking-wide font-medium">Recommended: 1920×1080px (JPG/PNG)</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="w-72 flex flex-col gap-4 sticky top-6">
                        {/* Settings Card */}
                        <div className="bg-[#eeecea] rounded-2xl border border-[#dddbd2] p-5">
                            <div className="flex items-center gap-2 mb-5">
                                <svg width="18" height="18" fill="none" stroke="#4a7c3f" viewBox="0 0 24 24" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>
                                <h3 className="text-sm font-bold text-[#1e2a12] tracking-wide uppercase">Settings</h3>
                            </div>

                            {/* Category */}
                            <div className="mb-5">
                                <label className="block text-[10px] font-bold text-[#5a6344] uppercase tracking-widest mb-2">Course Category</label>
                                <div className="relative">
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full appearance-none bg-white border border-[#dddbd2] rounded-xl px-4 py-2.5 pr-9 text-sm text-[#2d3a1e] focus:outline-none focus:ring-2 focus:ring-[#4a7c3f]/30 cursor-pointer"
                                    >
                                        {categories.map((c) => <option key={c}>{c}</option>)}
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#5a6344]">
                                        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <button
                            onClick={handlePublish}
                            className="w-full bg-[#1e2a12] hover:bg-[#2d3a1e] text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-md"
                        >
                            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                            {isPending ? "Published!" : "Publish Video"}
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}