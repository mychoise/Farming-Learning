import { Leaf,MessageSquare,Share2 } from "lucide-react";
const PostCard = ({
  author,
  location,
  time,
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
  image?: string;
  upvotes: number;
  comments: number;
}) => (
  <div className="bg-[#F2F1ED] rounded-3xl  hover:bg-[#FBFCFB] transition-all duration-300 hover:shadow-md mb-10 overflow-hidden">
    {/* Author Info */}
    <div className="flex items-center justify-between px-8 pt-8 pb-5">
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 bg-[#C7EBC8] text-[#092722] rounded-[5px] flex items-center justify-center font-bold text-[15px]">
          {author.charAt(0)}{author.split(" ")[1].charAt(0)}
        </div>
        <div>
          <div className="font-[medium] text-[15px] text-emerald-950">{author}</div>
          <div className="text-sm font-[font3] text-gray-500">{location} • {time}</div>
        </div>
      </div>
    </div>

    {/* Content */}
    <div className="px-8 pb-6">
      <h2 className="text-[23px] font-bold font-[font9]  text-[#19371F] mb-5">{title}</h2>
      <p className="text-gray-700 text-[15.5px] leading-relaxed font-[font8]">{content}</p>
    </div>

    {/* Image */}
    <div className="px-8 pb-8">
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-[420px] object-cover rounded-3xl shadow-md"
        />
      )}
    </div>

    {/* Engagement */}
    <div className="border-t border-gray-100 px-8 py-6 flex items-center justify-between text-gray-600">
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-1.5 hover:text-emerald-600 cursor-pointer transition">
            <div className="hover:bg-[#C6EAC6] p-3 rounded-xl"><Leaf size={24} className="text-[#1C3921]" /></div>
          <span className="font-[font8] text-base">{upvotes}</span>
        </div>
         <div className="flex items-center gap-1.5 hover:text-emerald-600 cursor-pointer transition">
            <div className="hover:bg-[#FBD9CC] p-3 rounded-xl"><Leaf size={24} className="text-[#582006] rotate-180" /></div>
        </div>
        <div className="flex items-center gap-1.5 hover:text-gray-800 cursor-pointer transition">
          <MessageSquare size={24} />
          <span className="font-[font8] text-base">{comments} Comments</span>
        </div>
      </div>

      <div className="hover:text-gray-800 cursor-pointer transition">
        <Share2 size={22} />
      </div>
    </div>
  </div>
);


export default PostCard;
