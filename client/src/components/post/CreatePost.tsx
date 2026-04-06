import { useState } from "react";
import {Check, Play, ArrowUpRight, ArrowLeft} from "lucide-react";
import {useCreatePost} from "../../hooks/hooks.tsx";
import {Link} from "react-router-dom";

export default function CreatePost() {
    const [title, setTitle] = useState("");
    const [narrative, setNarrative] = useState("");
    const [images, setImages] = useState<
        { id: number; src: string; alt: string; file: File }[]
    >([]);
    const [posted, setPosted] = useState(false);

    const {mutate , isError , isPending} = useCreatePost()

    const handlePost = async() => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", narrative);
        console.log("image length",images[0]);
        if (images.length > 0) {
            formData.append("image", images[0].file);
        }

        console.log("formData is",formData);

         mutate(formData)

        if(!isError){
            setPosted(true)
        }
        // if (title && narrative) setPosted(true);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const url = URL.createObjectURL(file);

        // Store both the File and the URL
        setImages([{ id: Date.now(), src: url, alt: file.name, file }]);
    };

    if(isPending){
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
                <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-sm flex flex-col items-center text-center gap-4">
                    <div className="relative">
                        <div className="w-24 h-24 bg-[#edf4e8] rounded-full flex items-center justify-center animate-pulse">
                            <div className="w-6 h-9 bg-[#5b8033] rounded-full rounded-tl-none rotate-[10deg]"></div>
                        </div>
                        {/* Spinning ring */}
                        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#6b9241] animate-spin"></div>
                    </div>

                    <h1 className="text-2xl font-[medium] text-gray-900">
                        Sharing your wisdom...
                    </h1>
                    <p className="text-gray-600 font-[font10] leading-relaxed">
                        Planting your post in the community feed. Just a moment.
                    </p>

                    {/* Animated dots */}
                    <div className="flex gap-2 mt-2">
                        {[0, 1, 2].map((i) => (
                            <div
                                key={i}
                                className="w-2 h-2 rounded-full bg-[#7ca14d] animate-bounce"
                                style={{ animationDelay: `${i * 0.15}s` }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (posted) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
                <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-sm flex flex-col items-center text-center">

                    {/* Top Icon Section */}
                    <div className="relative mb-8">
                        <div className="w-24 h-24 bg-[#edf4e8] rounded-full flex items-center justify-center">
                            {/* Custom Leaf/Drop shape using a simple div for accuracy */}
                            <div className="w-6 h-9 bg-[#5b8033] rounded-full rounded-tl-none rotate-[10deg]"></div>
                        </div>
                        {/* Green Check Badge */}
                        <div className="absolute top-1 right-1 bg-[#6b9241] rounded-full p-1 border-2 border-white">
                            <Check size={14} className="text-white stroke-[4]" />
                        </div>
                    </div>

                    {/* Text Content */}
                    <h1 className="text-2xl font-[medium] text-gray-900 mb-3">
                        Wisdom shared
                    </h1>
                    <p className="text-gray-600 font-[font10] leading-relaxed mb-8">
                        Your post is now live in the community feed. Others can learn from your experience.
                    </p>

                    {/* Info Box */}
                    <div className="bg-[#f7f8f3] rounded-xl p-5 w-full mb-8 text-left">
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <div className="mt-1.5 w-2 h-2 rounded-full bg-[#7ca14d] flex-shrink-0" />
                                <span className="text-sm font-[font5] text-[#4a5542]">Visible to community members</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-1.5 w-2 h-2 rounded-full bg-[#7ca14d] flex-shrink-0" />
                                <span className="text-sm font-[font5] text-[#4a5542]">Others can reply and build on your insight</span>
                            </li>
                        </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 w-full">
                        <button className="flex-1 w-[100px] py-3 px-4 border border-gray-300 rounded-xl font-medium text-gray-800 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                          <Link className="flex" to="/post">View feed <ArrowUpRight size={18} /></Link>
                        </button>
                        <button onClick={()=>{
                            setPosted(false)
                            setTitle("");
                            setNarrative("");
                        }}  className="flex-1 py-3 px-4 bg-[#2d5227] hover:bg-[#24421f] text-white rounded-xl font-medium transition-colors">
                            Share more
                        </button>
                    </div>

                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-10 px-4 bg-[#f5f0e8]">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="mb-10">
                    <Link to={"/post"} className="flex font-[font9] items-center gap-1 text-[15px] mb-4 text-[#2d5a27]">
                        <ArrowLeft/>Back
                    </Link>

                    <h1 className="text-5xl font-[medium] leading-tight text-[#1a3a1a] ">
                        Share Your Wisdom
                    </h1>

                    <p className="mt-2 font-[font10] text-[#6b7c6b]">
                        Document your agrarian journey and help the community grow.
                    </p>
                </div>

                {/* Layout */}
                <div className="flex gap-8 items-start">

                    {/* Left */}
                    <div className="flex-1 space-y-6">

                        {/* Title */}
                        <div>
                            <label className="block text-xs font-semibold tracking-widest mb-2 text-[#3a5a3a]">
                                POST TITLE
                            </label>

                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="What's growing in your world?"
                                className="w-full px-4 font-[font5] py-3 rounded-xl bg-[#ebe6d6] text-gray-800 focus:outline-none"
                            />
                        </div>

                        {/* Narrative */}
                        <div>
                            <label className="block text-xs font-semibold tracking-widest mb-2 text-[#3a5a3a]">
                                THE NARRATIVE
                            </label>

                            <textarea
                                value={narrative}
                                onChange={(e) => setNarrative(e.target.value)}
                                placeholder="Describe your process, findings, or questions..."
                                rows={12}
                                className="w-full px-4 py-3 font-[font5] rounded-xl bg-[#ebe6d6] text-gray-800 resize-y min-h-[260px] focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Right */}
                    <div className="w-72 space-y-4">

                        {/* Upload */}
                        <div className="rounded-2xl p-5 bg-[#ede8d8]">
                            <h3 className="text-xs font-semibold tracking-widest mb-4 text-[#3a5a3a]">
                                IMAGE UPLOAD
                            </h3>

                            <label className="cursor-pointer block rounded-xl p-8 text-center mb-4 border-2 border-dashed border-[#c5bfa8] bg-[#f0ece0] hover:border-[#2d5a27] hover:bg-[#f0ece0]">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageUpload}
                                />

                                <p className="text-sm font-semibold">Click to upload imagery</p>
                                <p className="text-xs text-gray-500">
                                    JPEG, PNG or HEIC up to 10MB
                                </p>
                            </label>

                            {/* Images */}
                            <div className="flex gap-2">
                                {images.length > 0 ? (
                                    <div className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-[#c5bfa8]">
                                        <img
                                            src={images[0].src}
                                            alt={images[0].alt}
                                            className="w-full h-full object-cover"
                                        />

                                        {/* ❌ Remove button */}
                                        <button
                                            onClick={() => setImages([])}
                                            className="absolute top-1 right-1 bg-black/60 text-white text-xs px-1 rounded"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ) : (
                                    <label className="w-20 h-20 rounded-xl flex items-center justify-center cursor-pointer border-2 border-dashed border-[#c5bfa8] text-gray-400">
                                        <input
                                            type="file"
                                            className="hidden"
                                            onChange={handleImageUpload}
                                        />
                                        +
                                    </label>
                                )}
                            </div>
                        </div>

                        {/* Tip */}
                    </div>
                </div>

                {/* Bottom */}
                <div className="flex justify-between mt-10 pt-6 border-t border-[#d8d0bc]">
                    <button
                        onClick={handlePost}
                        className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition ${
                            title && narrative
                                ? "bg-[#2d5a27] hover:bg-[#1e4020]"
                                : "bg-[#2d5a27]/60 cursor-not-allowed"
                        }`}
                    >
                        Post to Feed
                        <Play size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}