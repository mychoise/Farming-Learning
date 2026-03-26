import { useQuery } from "@tanstack/react-query"
import {create} from "zustand"
import {  getAllAiChat } from "../api/api"

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
    setSessionID: (id:string) => set({paramForId:id})

}))
