import React from 'react';
import {
  Users,
  Plus,
  Layout,
  Loader2
} from 'lucide-react';
import PostCard from '../components/post/PostCard';
import CommunityGuidelines from '../components/post/CommunityGuidelines';
import { useGetPosts } from '../hooks/hooks';
import { usePostSocket } from '../hooks/usePostSocket';
import PostDetailModal from '../components/post/PostDetailModal';

interface PostItem {
  post: {
    id: string;
    location: string;
    createdAt: string;
    tag: string;
    title: string;
    description: string;
    image?: string;
  };
  user: {
    name: string;
  };
  upvotes: number;
  downvotes: number;
  comments: number;
}

interface SelectedPost {
  postId: string;
  author: string;
  location: string;
  time: string;
  tag: string;
  title: string;
  content: string;
  image?: string;
  upvotes: number;
  downvotes: number;
  commentsCount: number;
}

function Post() {

  const {data:posts , isLoading} = useGetPosts();
  usePostSocket();
  const [selectedPost, setSelectedPost] = React.useState<SelectedPost | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleOpenModal = (item: PostItem) => {
    setSelectedPost({
      postId: item.post.id,
      author: item.user?.name || "Unknown",
      location: item.post.location || "Kathmandu, Nepal",
      time: item.post.createdAt,
      tag: item.post.tag || "GENERAL",
      title: item.post.title,
      content: item.post.description,
      image: item.post.image,
      upvotes: item.upvotes,
      downvotes: item.downvotes,
      commentsCount: item.comments
    });
    setIsModalOpen(true);
  };

  console.log(posts);
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

          {posts?.map((item: PostItem) => (
            <PostCard
              key={item.post.id}
              postId={item.post.id}
              author={item.user?.name || "Unknown"}
              location={item.post.location || "Kathmandu, Nepal"}
              time={item.post.createdAt}
              tag={item.post.tag || "GENERAL"}
              title={item.post.title}
              content={item.post.description}
              image={item.post.image}
              upvotes={item.upvotes}
              downvotes={item.downvotes}
              comments={item.comments}
              onClick={() => handleOpenModal(item)}
            />
          ))}

        </div>
      </div>

      {/* Right Sidebar */}
      <div className='sticky top-0'><CommunityGuidelines/></div>

      {/* Post Detail Modal */}
      {isLoading && <div className="flex items-center justify-center h-screen"><Loader2 className="animate-spin" /></div>}
      {selectedPost && (
        <PostDetailModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          post={selectedPost}
        />
      )}
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
