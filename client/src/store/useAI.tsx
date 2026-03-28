import {create} from "zustand"

export const useAI = create((set)=>({
    paramForId:null,
    questionForAI :null,
    setSessionID: (id:string) => set({paramForId:id}),
    setQuestionForAI: (question:string) => set({questionForAI:question})

}))
