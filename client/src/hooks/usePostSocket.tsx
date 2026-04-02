import { useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { socket } from "../config/socket"

export const usePostSocket = () => {
  const queryClient = useQueryClient()

  useEffect(() => {
    const handler = (post: any) => {
      queryClient.setQueryData(["posts"], (oldData: any) => {
        if (!oldData) return [post]
        return [post, ...oldData]
      })
    }

    socket.on("new_post", handler)

    return () => {
      socket.off("new_post", handler) // ✅ SAME function reference
    }
  }, [queryClient])
}
