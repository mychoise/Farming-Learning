import { useQuery } from "@tanstack/react-query"
import {create} from "zustand"
import {  getAllAiChat } from "../api/api"

export const useAI = create((set)=>({
    paramForId:null,
    questionForAI :null,
    setSessionID: (id:string) => set({paramForId:id}),
    setQuestionForAI: (question:string) => set({questionForAI:question})

}))
