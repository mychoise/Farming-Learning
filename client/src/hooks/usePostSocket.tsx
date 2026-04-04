import { useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { socket } from "../config/socket"

interface PostUpdate {
  post: {
    id: string;
    [key: string]: any;
  };
  [key: string]: any;
}

interface CommentUpdate {
  id: string;
  comment: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    image?: string;
  };
}

export const usePostSocket = (postId?: string) => {
  const queryClient = useQueryClient()

  useEffect(() => {
    // Handler for new posts (global)
    const postHandler = (post: PostUpdate) => {
      queryClient.setQueryData(["posts"], (oldData: any) => {
        if (!oldData) return [post]
        return [post, ...oldData]
      })
    }

    socket.on("new_post", postHandler)

    // Handler for new comments (post-specific)
    if (postId) {
      socket.emit("join_post", postId)

      const commentHandler = (newComment: CommentUpdate) => {
        // Update comments for the specific post
        queryClient.setQueryData(["comments", postId], (oldComments: CommentUpdate[] | undefined) => {
          if (!oldComments) return [newComment]
          return [...oldComments, newComment]
        })

        // Update comment count in the posts list
        queryClient.setQueryData(["posts"], (oldPosts: PostUpdate[] | undefined) => {
          if (!oldPosts) return oldPosts
          return oldPosts.map((p) => {
            if (p.post.id === postId) {
              return { ...p, comments: Number(p.comments) + 1 }
            }
            return p
          })
        })
      }

      socket.on("new_comment", commentHandler)

      return () => {
        socket.emit("leave_post", postId)
        socket.off("new_post", postHandler)
        socket.off("new_comment", commentHandler)
      }
    }

    return () => {
      socket.off("new_post", postHandler)
    }
  }, [queryClient, postId])
}
