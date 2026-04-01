import React from 'react';
import {
  Home,
  Sprout,
  BookOpen,
  Users,
  Settings,
  Plus,
  Layout,

} from 'lucide-react';
import PostCard from '../components/post/PostCard';
import CommunityGuidelines from '../components/post/CommunityGuidelines';

function Post() {
  return (
    <div className="min-h-screen bg-[#F2F1ED] flex font-sans">
      {/* Sidebar */}
      <div className="w-67 h-screen sticky top-10 bg-[#EEEEEA] border-r border-gray-200 flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-10">
            <h1 className="text-2xl font-[medium] text-emerald-950 tracking-tight">AgriLearn</h1>
          </div>

          <nav className="space-y-1">

            <SidebarItem icon={<Users size={20} />} label="Community" active />
            <SidebarItem icon={<Plus size={20} />} label="Add Post" />
            <SidebarItem icon={<Layout size={20} />} label="My Dashboard" />
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

      {/* Main Feed */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-3xl mx-auto">
          <div className="mb-7">
            <h1 className="text-4xl font-[medium] text-emerald-950">Collective Field Notes</h1>
            <p className="text-gray-600 font-[font8] w-[450px] mt-2 text-[15px]">
              Insights and observations from the global network of regenerative agronomists.
            </p>
          </div>

          {/* Elena Moretti Post */}
          <PostCard
            author="Elena Moretti"
            location="Tuscany, IT"
            time="4h ago"
            tag="PERMACULTURE"
            title="Reclaiming Clay: A Study in Cover Cropping"
            content="Successfully integrated a mix of crimson clover and winter rye into the south-facing slopes. The visual structure of the soil has already begun to shift toward a more granular consistency despite the heavy rains this season."
            image="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070"
            upvotes={128}
            comments={24}
          />

          {/* Julian West Post */}
          <PostCard
            author="Julian West"
            location="Oregon, US"
            time="10h ago"
            tag="HYDROPONICS"
            title="Modular System for Urban Nutrient Cycling"
            content="Prototype 04 is currently operational. Focused on a closed-loop system using kitchen bio-waste transformed into liquid nutrient solutions. The basil yield is exceeding expectations."
            image="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070"
            upvotes={85}
            comments={12}
          />

             <PostCard
            author="Julian West"
            location="Oregon, US"
            time="10h ago"
            tag="HYDROPONICS"
            title="Modular System for Urban Nutrient Cycling"
            content="Prototype 04 is currently operational. Focused on a closed-loop system using kitchen bio-waste transformed into liquid nutrient solutions. The basil yield is exceeding expectations."
            upvotes={85}
            comments={12}
          />
        </div>
      </div>

      {/* Right Sidebar */}
      <div className='sticky top-0'><CommunityGuidelines/></div>
    </div>
  );
}

// Reusable Components
const SidebarItem = ({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) => (
  <div
    className={`flex items-center gap-3 w-[104%] px-5 py-3.5 rounded-[7px] cursor-pointer transition-all ${
      active
        ? 'bg-white text-[#2B492F] font-[font8]'
        : 'hover:bg-white/70 text-[#77716C]'
    }`}
  >
    {icon}
    <span className={`text-[15px] font-[font9]  ${active ? 'text-[#2B492F]' : 'text-[#77716C]'}`}>{label}</span>
  </div>
);





export default Post;
