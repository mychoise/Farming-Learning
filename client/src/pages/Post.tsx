import React from 'react';
import {
  Loader2
} from 'lucide-react';
import PostCard from '../components/post/PostCard';
import CommunityGuidelines from '../components/post/CommunityGuidelines';
import { useGetPosts } from '../hooks/hooks';
import { usePostSocket } from '../hooks/usePostSocket';
import PostDetailModal from '../components/post/PostDetailModal';
import { NavLink} from "react-router-dom";

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
      postId: item?.post?.id,
      author: item?.user?.name || "Unknown",
      location: item?.post?.location || "Kathmandu, Nepal",
      time: item?.post?.createdAt,
      tag: item?.post?.tag || "GENERAL",
      title: item?.post?.title,
      content: item?.post?.description,
      image: item?.post?.image,
      upvotes: item?.upvotes,
      downvotes: item?.downvotes,
      commentsCount: item?.comments
    });
    setIsModalOpen(true);
  };

  console.log(posts);
  return (
    <div className="h-screen overflow-hidden bg-[#F2F1ED] flex font-sans">
      {/* Sidebar */}

      {/* Main Feed */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-3xl mx-auto">
          <div className="mb-7">
            <h1 className="text-4xl font-[medium] text-emerald-950">Collective Field Notes</h1>
            <p className="text-gray-600 font-[font8] w-[450px] mt-2 text-[15px]">
              Insights and observations from the global network of regenerative agronomists.
            </p>
          </div>

          {posts?.length === 0 && !isLoading && (
<div className={"flex items-center font-[font10] text-[#36362c] text-[17px] justify-center h-94"}>
  <h1>No Data To show</h1>
</div>
          )}

          {posts?.map((item: PostItem) => (
            <PostCard
              key={item?.post.id}
              postId={item?.post.id}
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
      {isLoading && <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin" /></div>
      }
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
export const SidebarItem = ({ icon, label, link }: { icon: React.ReactNode;  label: string; link: string }) => (
    <NavLink
        to={link}
        end
        className={({ isActive }) =>
            `flex items-center gap-3 w-[104%] px-5 py-3.5 rounded-[7px] cursor-pointer transition-all ${
                isActive
                    ? "bg-white text-[#2B492F] font-[font8]"
                    : "hover:bg-white/70 text-[#77716C]"
            }`
        }
    >
      {({ isActive }) => (
        <>
      {icon}
      <span
          className={`text-[15px] font-[font9] ${
              isActive ? "text-[#2B492F]" : "text-[#77716C]"
          }`}
      >
                {label}
            </span>
    </>
)}
</NavLink>
);

export default Post;
