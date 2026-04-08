import {Layout, Plus, Users} from "lucide-react";
import {SidebarItem} from "../../pages/Post.tsx";


const AdminSidebar = () => {
    return (
        <div>
            <div className="w-67 h-screen sticky top-10 bg-[#EEEEEA] border-r border-gray-200 flex flex-col">
                <div className="p-6">
                    <div className="flex items-center gap-2 mb-10">
                        <h1 className="text-2xl font-[medium] text-emerald-950 tracking-tight">AgriLearn</h1>
                    </div>

                    <nav className="space-y-1">

                        <SidebarItem  link={"/admin/addCrop"} icon={<Users size={20} />} label="Add Crop"  />
                        <SidebarItem link={"/admin/addNotice"} icon={<Plus size={20} />} label="Add Notice" />
                        <SidebarItem link={"/admin/addVideo"} icon={<Layout size={20} />} label="Upload Video" />
                    </nav>
                </div>
            </div>

        </div>
    )
}
export default AdminSidebar
