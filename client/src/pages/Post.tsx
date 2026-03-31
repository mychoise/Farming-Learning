import React from 'react';
import {
  Home,
  Sprout,
  BookOpen,
  Users,
  Settings,
  Leaf,
  MessageSquare,
  Share2
} from 'lucide-react';

function Post() {
  return (
    <div className="min-h-screen bg-[#f8f7f4] flex font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-[#f1f0eb] border-r border-gray-200 flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-10">
            <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl">🌱</span>
            </div>
            <h1 className="text-2xl font-semibold text-emerald-950 tracking-tight">Harvest</h1>
          </div>

          <nav className="space-y-1">
            <SidebarItem icon={<Home size={20} />} label="Home Feed" active />
            <SidebarItem icon={<Sprout size={20} />} label="My Garden" />
            <SidebarItem icon={<BookOpen size={20} />} label="Seed Bank" />
            <SidebarItem icon={<Users size={20} />} label="Community" active />
            <SidebarItem icon={<Settings size={20} />} label="Settings" />
          </nav>
        </div>

        <div className="mt-auto p-6">
          <button className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-medium py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95">
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
          <div className="mb-12">
            <h1 className="text-4xl font-semibold text-emerald-950">Collective Field Notes</h1>
            <p className="text-gray-600 mt-2 text-lg">
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
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 bg-white border-l border-gray-200 p-8 hidden xl:block overflow-auto">
        <div className="sticky top-8">
          <h3 className="font-semibold text-xl mb-6 text-emerald-950">Community Guidelines</h3>
          <p className="text-sm text-gray-600 mb-8 leading-relaxed">
            The Harvest is built on shared knowledge. Follow these tips for better 'sowing' within our collective.
          </p>

          <div className="space-y-8">
            <GuidelineItem
              icon="📝"
              title="Use clear titles"
              desc="State the primary cultivar or challenge clearly in the header."
            />
            <GuidelineItem
              icon="📸"
              title="Attach high-quality media"
              desc="Visual data helps agronomists diagnose issues and appreciate progress."
            />
            <GuidelineItem
              icon="🌱"
              title="Detail your soil health"
              desc="Context is key. Mention soil type, pH, or local climate zone."
            />
          </div>

          {/* Post Engagement */}
          <div className="mt-12">
            <h4 className="font-medium text-emerald-950 mb-4">POST ENGAGEMENT</h4>
            <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-6 text-sm space-y-5">
              <div className="flex gap-3">
                <Leaf className="text-emerald-600 mt-0.5" size={22} />
                <div>
                  <strong>Leaves:</strong> Use the leaf icons to upvote (green) or downvote (clay) posts based on utility.
                </div>
              </div>
              <div className="flex gap-3">
                <MessageSquare className="text-emerald-600 mt-0.5" size={22} />
                <div>
                  <strong>Comments:</strong> Professional feedback and constructive critique are encouraged.
                </div>
              </div>
            </div>
          </div>

          {/* Summit Banner */}
          <div className="mt-10 rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-900 to-emerald-950 text-white shadow-xl">
            <div className="p-6">
              <img
                src="https://images.unsplash.com/photo-1587502536900-baf0c55a17c9?q=80&w=800"
                alt="Soil Health Summit"
                className="w-full h-40 object-cover rounded-2xl mb-5 shadow-inner"
              />
              <h4 className="font-semibold text-lg">Join the 2024 Soil Health Summit</h4>
              <p className="text-emerald-100 text-sm mt-1">Share knowledge with global regenerative farmers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Components
const SidebarItem = ({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) => (
  <div
    className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl cursor-pointer transition-all ${
      active
        ? 'bg-white shadow text-emerald-700 font-medium'
        : 'hover:bg-white/70 text-gray-700'
    }`}
  >
    {icon}
    <span className="text-[15px]">{label}</span>
  </div>
);

const GuidelineItem = ({ icon, title, desc }: { icon: string; title: string; desc: string }) => (
  <div className="flex gap-4">
    <div className="text-3xl flex-shrink-0">{icon}</div>
    <div className="-mt-1">
      <h4 className="font-medium text-emerald-950">{title}</h4>
      <p className="text-sm text-gray-600 mt-1 leading-relaxed">{desc}</p>
    </div>
  </div>
);

const PostCard = ({
  author,
  location,
  time,
  tag,
  title,
  content,
  image,
  upvotes,
  comments
}: {
  author: string;
  location: string;
  time: string;
  tag: string;
  title: string;
  content: string;
  image: string;
  upvotes: number;
  comments: number;
}) => (
  <div className="bg-white rounded-3xl shadow-sm border border-gray-100 mb-10 overflow-hidden">
    {/* Author Info */}
    <div className="flex items-center justify-between px-8 pt-8 pb-5">
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center font-bold text-2xl">
          {author.charAt(0)}
        </div>
        <div>
          <div className="font-semibold text-lg text-emerald-950">{author}</div>
          <div className="text-sm text-gray-500">{location} • {time}</div>
        </div>
      </div>
      <div className="px-5 py-1.5 bg-emerald-100 text-emerald-700 text-xs font-semibold tracking-wider rounded-full">
        {tag}
      </div>
    </div>

    {/* Content */}
    <div className="px-8 pb-6">
      <h2 className="text-[26px] leading-tight font-semibold text-emerald-950 mb-5">{title}</h2>
      <p className="text-gray-700 text-[15.5px] leading-relaxed">{content}</p>
    </div>

    {/* Image */}
    <div className="px-8 pb-8">
      <img
        src={image}
        alt={title}
        className="w-full h-[420px] object-cover rounded-3xl shadow-md"
      />
    </div>

    {/* Engagement */}
    <div className="border-t border-gray-100 px-8 py-6 flex items-center justify-between text-gray-600">
      <div className="flex items-center gap-9">
        <div className="flex items-center gap-2.5 hover:text-emerald-600 cursor-pointer transition">
          <Leaf size={24} className="text-emerald-600" />
          <span className="font-medium text-base">{upvotes}</span>
        </div>
        <div className="flex items-center gap-2.5 hover:text-gray-800 cursor-pointer transition">
          <MessageSquare size={24} />
          <span className="font-medium text-base">{comments} Comments</span>
        </div>
      </div>

      <div className="hover:text-gray-800 cursor-pointer transition">
        <Share2 size={22} />
      </div>
    </div>
  </div>
);

export default Post;
