import { useQuery } from "@tanstack/react-query"
import {create} from "zustand"
import { createNewSession, getAllAiChat } from "../api/api"

export const useAI = create((set)=>({
    paramForId:null,
    getSpecificDataAll: async(id:string)=>{
        const {data} = useQuery({
            queryKey:["specificDataAll" , id],
            queryFn:getAllAiChat(id )
        })

        console.log("obtainded data is",data)
        return data
    },

    createNewSession: async()=>{
        const {data} =  await createNewSession()
        console.log("created session",data)
        set({paramForId:data.id})
        return data
    }

}))
