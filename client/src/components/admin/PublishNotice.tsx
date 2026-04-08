import React, { useState,useRef } from 'react';
import { Send,  ChevronDown, Upload } from 'lucide-react';
import {useCreateNotice} from "../../hooks/hooks.tsx";
import {toast} from "react-hot-toast";

const PublishNotice = () => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [title,setTitle] = useState<string>('');
    const [lead, setLead] = useState<string>('');
    const [category, setCategory] = useState<string>("weather");
    const [content, setContent] = useState<string>('');

    const {mutate,isPending} = useCreateNotice()


    const handleImageClick = () => {
        fileInputRef.current?.click(); // trigger hidden file input
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const handlePost = ()=>{
        console.log("handlePost");
        console.log("title", title);
        console.log("lead", lead);
        console.log("category", category);
        console.log("content", content);
        console.log("selectedImage", selectedImage);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("lead", lead);
        formData.append("category", category);
        formData.append("content", content);
        if(selectedImage){
            formData.append("image", selectedImage);
        }
        console.log("la aaba msg patahuna lako")
        mutate(formData, {
            onSuccess: () => {
                toast.success("Notice published successfully!");
                // reset form
                setTitle("");
                setLead("");
                setCategory("weather");
                setContent("");
                setSelectedImage(null);
            },
            onError: () => {
                toast.error("Failed to publish notice. Please try again.");
            },
        });

    }

    return (
        <div className="min-h-screen bg-[#F5F4EF] p-8 font-sans text-gray-800">
            {/* Header */}
            <header className="mb-8 max-w-6xl mx-auto">
                <h1 className="text-3xl font-[medium] text-gray-900">Publish a New Notice</h1>
                <p className="text-gray-600 text-[17px] font-[font9] mt-1.5">Broadcast critical agricultural updates and news to your farming community.</p>
            </header>

            <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Input Fields */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Title Input */}
                    <div className="bg-[#EEECEA] p-6 rounded-lg border border-gray-200 shadow-sm">
                        <label className="block text-xs font-[medium] text-gray-500 uppercase tracking-wider mb-2">Notice Title</label>
                        <input
                            onChange={(e)=>setTitle(e.target.value)}
                            type="text"
                            value={title}
                            placeholder="e.g. Impact of Seasonal Rains on Wheat Harvesting"
                            className="w-full p-3 border font-[font5] border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                        />
                    </div>

                    {/* Description Input */}
                    <div className="bg-[#EEECEA] p-6 rounded-lg border border-gray-200 shadow-sm">
                        <label className="block text-xs font-[medium] text-gray-500 uppercase tracking-wider mb-2">Short Description</label>
                        <textarea
                            onChange={(e)=>setLead(e.target.value)}
                            rows={3}
                            value={lead}
                            placeholder="A brief summary that appears on the notification preview..."
                            className="w-full p-3 border font-[font5] border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all resize-none"
                        />
                    </div>

                    {/* Full Content Editor */}
                    <div className="bg-[#EEECEA] rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-100">
                            <label className="block text-xs font-[medium] text-gray-500 uppercase tracking-wider mb-4">Full Content</label>
                            <textarea
                                onChange={(e)=>setContent(e.target.value)}
                                rows={12}
                                value={content}
                                placeholder="Write the full body of your notice here. Provide detailed instructions, data, or news updates..."
                                className="w-full font-[font5] p-2 focus:outline-none text-gray-700 resize-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Column: Sidebar Controls */}
                <div className="space-y-6">

                    {/* Publish Section */}
                    <div className="bg-emerald-900 text-white p-6 rounded-2xl shadow-lg">
                        <h3 className="text-lg font-[medium] mb-2">Ready to Publish?</h3>
                        <p className="text-emerald-100 font-[font8] text-sm mb-6 leading-relaxed">
                            Review your content carefully. Once published, notifications will be sent to all subscribed farmers.
                        </p>
                        <div className="space-y-3">
                            <button onClick={handlePost} className={`w-full bg-white font-[medium] ${isPending ? "opacity-50 cursor-not-allowed" : "hover:bg-emerald-50"} text-emerald-900 font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-emerald-50 transition-colors disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed`}>
                                <Send size={18} className="rotate-45" /> {isPending ? "Publishing..." : "Publish Notice"}
                            </button>
                        </div>
                    </div>

                    {/* Category & Urgency */}
                    <div className="bg-gray-200/50 p-6 rounded-2xl space-y-6">
                        <div>
                            <label className="block text-xs font-[medium] text-gray-500 uppercase tracking-wider mb-2">Target Category</label>
                            <div className="relative">
                                <select
                                    value={category}
                                    onChange={(e)=>setCategory(e.target.value)}
                                    className="w-full p-3 font-[font5] bg-white border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold text-emerald-900">
                                    <option value="weather" >weather</option>
                                    <option value="market">market</option>
                                    <option value="government">government</option>
                                    <option value="other">other</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-3.5 text-emerald-900" size={20} />
                            </div>
                        </div>
                    </div>

                    {/* Featured Image Upload */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Featured Image</label>

                        {/* Clickable upload box */}
                        <div
                            onClick={handleImageClick}
                            className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition-colors group"
                        >
                            <div className="bg-emerald-50 p-3 rounded-full mb-3 group-hover:bg-emerald-100 transition-colors">
                                <Upload className="text-emerald-700" size={24} />
                            </div>
                            {selectedImage ? (
                                <p className="text-sm font-bold text-gray-800">{selectedImage.name}</p>
                            ) : (
                                <>
                                    <p className="text-sm font-bold text-gray-800">Click to upload image</p>
                                    <p className="text-xs text-gray-400 mt-1">1200 × 630 recommended (PNG, JPG)</p>
                                </>
                            )}
                        </div>

                        {/* Hidden file input */}
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            accept="image/png, image/jpeg"
                        />
                    </div>

                </div>
            </main>
        </div>
    );
};

export default PublishNotice;