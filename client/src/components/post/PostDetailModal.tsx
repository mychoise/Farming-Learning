import React, { useState } from "react";
import { X, Send, Leaf, MessageSquare, Share2, MapPin, Clock } from "lucide-react";
import { useGetComments, useAddComment } from "../../hooks/hooks";
import { usePostSocket } from "../../hooks/usePostSocket";

interface PostDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: {
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
  };
}

const PostDetailModal: React.FC<PostDetailModalProps> = ({ isOpen, onClose, post }) => {
  const [newComment, setNewComment] = useState("");
  const { data: comments, isLoading: isLoadingComments } = useGetComments(post.postId);
  const { mutate: addCommentMutation, isPending: isAddingComment } = useAddComment();

  console.log(comments)

  // Real-time updates via socket
  usePostSocket(post.postId);

  if (!isOpen) return null;

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    addCommentMutation(
      { postId: post.postId, comment: newComment },
      {
        onSuccess: () => {
          setNewComment("");
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 md:p-8">
      <div className="bg-[#FDFDFB] w-full max-w-6xl h-full max-h-[90vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row relative animate-in fade-in zoom-in duration-300">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 bg-white/80 hover:bg-white rounded-full shadow-md text-emerald-950 transition-all hover:scale-110 active:scale-95"
        >
          <X size={24} />
        </button>

        {/* Left Side: Post Content */}
        <div className="flex-1 overflow-y-auto border-r border-gray-100 bg-[#F2F1ED]/30">
          <div className="p-8 md:p-12">
            {/* Header */}
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                  <Clock size={14} />
                  <span>{post.time?.slice(0, 10)}</span>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-emerald-950 leading-tight">
                {post.title}
              </h1>

              <div className="flex items-center gap-4 mt-2">
                <div className="w-12 h-12 bg-emerald-700 text-white rounded-2xl flex items-center justify-center font-bold text-lg shadow-inner">
                  {post?.author.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-bold text-emerald-950">{post.author}</div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <MapPin size={14} />
                    <span>{post.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Post Image */}
            {post.image && (
              <div className="mb-8 rounded-4xl overflow-hidden shadow-lg">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-auto object-cover max-h-[500px]"
                />
              </div>
            )}

            {/* Description */}
            <div className="prose prose-emerald max-w-none mb-12">
              <p className="text-gray-700 text-lg leading-relaxed font-medium">
                {post.content}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Comments */}
        <div className="w-full md:w-[400px] lg:w-[450px] flex flex-col bg-white">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-xl font-bold text-emerald-950 flex items-center gap-2">
              <MessageSquare size={20} className="text-emerald-700" />
              Community Discussion
            </h3>
          </div>


          {/* Comment List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/30">
            {isLoadingComments ? (
              <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-400">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-700"></div>
                <p className="text-sm font-medium">Loading conversations...</p>
              </div>
            ) : comments && comments.length > 0 ? (
              comments.map((comment: { id: string; comment: string; createdAt: string; user: { name: string } }) => (
                <div key={comment?.id} className="flex gap-4 group">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-xl shrink-0 flex items-center justify-center font-bold shadow-sm">
                    {comment?.user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 group-hover:border-emerald-100 transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-sm text-emerald-950">{comment?.user?.name}</span>
                        <span className="text-[10px] text-gray-400 font-medium">
                          {new Date(comment?.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {comment?.comment}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
                  <MessageSquare size={32} className="text-emerald-200" />
                </div>
                <p className="text-emerald-900/40 font-bold">Be the first to share your thoughts!</p>
              </div>
            )}
          </div>

          {/* Comment Input */}
          <div className="p-6 bg-white border-t border-gray-100">
            <form onSubmit={handleAddComment} className="relative">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add to the discussion..."
                className="w-full bg-gray-50 border-none rounded-3xl py-4 pl-6 pr-14 text-sm focus:ring-2 focus:ring-emerald-500/20 transition-all resize-none min-h-[60px]"
                rows={2}
              />
              <button
                type="submit"
                disabled={isAddingComment || !newComment.trim()}
                className="absolute right-3 bottom-3 p-2.5 bg-emerald-800 text-white rounded-2xl hover:bg-emerald-900 disabled:bg-gray-200 disabled:text-gray-400 transition-all active:scale-90"
              >
                {isAddingComment ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Send size={18} />
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailModal;
