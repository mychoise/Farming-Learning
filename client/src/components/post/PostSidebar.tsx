import {Layout, Plus, Users} from "lucide-react";
import {SidebarItem} from "../../pages/Post.tsx";


const PostSidebar = () => {
    return (
        <div>
            <div className="w-67 h-screen sticky top-10 bg-[#EEEEEA] border-r border-gray-200 flex flex-col">
                <div className="p-6">
                    <div className="flex items-center gap-2 mb-10">
                        <h1 className="text-2xl font-[medium] text-emerald-950 tracking-tight">AgriLearn</h1>
                    </div>

                    <nav className="space-y-1">

                        <SidebarItem  link={"/post"} icon={<Users size={20} />} label="Community"  />
                        <SidebarItem link={"/post/create"} icon={<Plus size={20} />} label="Add Post" />
                        <SidebarItem link={"/post/dashboard"} icon={<Layout size={20} />} label="My Dashboard" />
                    </nav>
                </div>

                <div className="mt-auto p-6">
                    <button className="w-full bg-[#27442B] cursor-pointer hover:bg-emerald-800 text-white font-[font8] py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95">
                        Post Update
                    </button>
                </div>

                <div className="border-t border-gray-200 p-6 text-sm text-gray-500 space-y-4">
                    <a href="#" className="block hover:text-emerald-700 transition">Guidelines</a>
                    <a href="#" className="block hover:text-emerald-700 transition">Help</a>
                </div>
            </div>

        </div>
    )
}
export default PostSidebar
