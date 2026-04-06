import React from 'react'
import {Outlet} from "react-router-dom";
import PostSidebar from "../components/post/PostSidebar.tsx";

const PostLayout = () => {
    return (
        <div className="flex h-full overflow-hidden">
            <PostSidebar />
            <main className="flex-1 overflow-hidden">
                <Outlet />
            </main>
        </div>
    )
}
export default PostLayout
