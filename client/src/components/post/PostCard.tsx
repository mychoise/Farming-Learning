import { Leaf, MessageSquare, Share2 } from "lucide-react";
import { useVotePost } from "../../hooks/hooks";

const PostCard = ({
  author,
  location,
  time,
  tag,
  title,
  content,
  image,
  upvotes: initialUpvotes,
  downvotes: initialDownvotes,
  comments,
  postId,
  onClick
}: {
  author: string;
  location: string;
  time: string;
  tag: string;
  title: string;
  content: string;
  image?: string;
  upvotes: number;
  downvotes: number;
  comments: number;
  postId: string;
  onClick: () => void;
}) => {
  const { mutate: vote } = useVotePost();

  const handleVote = (type: "upvote" | "downvote") => {
    vote({ postId, voteType: type });
  };

  return (
    <div
      className="bg-[#F2F1ED] rounded-3xl hover:bg-[#FBFCFB] transition-all duration-300 hover:shadow-md mb-10 overflow-hidden cursor-pointer border border-transparent hover:border-emerald-100/50 group"
      onClick={onClick}
    >
      {/* Author Info */}
      <div className="px-8 pt-8 pb-5">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-[#C7EBC8] text-[#092722] rounded-[5px] flex items-center justify-center font-bold text-[15px]">
              {author.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="font-[medium] text-[15px] text-emerald-950">{author}</div>
              <div className="text-sm font-[font3] text-gray-500">{location} • {time?.slice(0, 10)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 pb-2">
        <h2 className="text-[23px] font-bold font-[font9] text-[#19371F] mb-5">{title}</h2>
        <p className="text-gray-700 text-[15.5px] leading-relaxed font-[font8]">{content}</p>
      </div>

      {/* Image */}
      {image && (
        <div className="px-8 pt-5 pb-8">
          <img
            src={image}
            alt={title}
            className="w-full h-[420px] object-cover rounded-3xl shadow-md"
          />
        </div>
      )}

      {/* Engagement */}
      <div className="border-t border-gray-100 px-8 py-6 flex items-center gap-7 text-gray-600">
        <div className="flex items-center gap-1.5 hover:text-gray-800 cursor-pointer transition">
          <MessageSquare size={24} className="group-hover:text-emerald-700 transition-colors" />
          <span className="font-[font8] text-base">{comments} Comments</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
