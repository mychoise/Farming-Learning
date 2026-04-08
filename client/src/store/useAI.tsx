import {create} from "zustand"

type AIStore = {
    paramForId: string | null;
    questionForAI: string | null;
    setSessionID: (id: string) => void;
    setQuestionForAI: (question: string) => void;
};

export const useAI = create<AIStore>((set)=>({
    paramForId:null,
    questionForAI :null,
    setSessionID: (id:string) => set({paramForId:id}),
    setQuestionForAI: (question:string) => set({questionForAI:question})

}))
