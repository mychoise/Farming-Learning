 import { useQueryClient, useMutation, useQuery , keepPreviousData } from "@tanstack/react-query";
import { createNewSession, detectDisease, getAllAiChat, getAnimalWeightEstimation, getOrganicFertilizerCalculation , getUnitConversion, InorganicFertilizerCalculation, sendMessageToAI,getNotices , getNoticeById} from "../api/api";
import type { OrganicFertilizerCalculation ,InOrganicFertilizerCalculation , animalWeightEstimationResponse} from "../api/api";

type OrganicFertilizerInput = {
  cropName: string;
  SystemOfLandCalculation: string;
  length: number;
  wide: number;
};

type InorganicFertilizerInput = {
    cropName: string;
  SystemOfLandCalculation: string;
  length: number;
  wide: number;
}

type AnimalWeightEstimationInput = {
    heartGirth: string;
    bodyLength: string;
    animalName: string;
}



export const useOrganicFertilizer = () => {
  const queryClient = useQueryClient();

  return useMutation<OrganicFertilizerCalculation, Error, OrganicFertilizerInput>({
    mutationFn: (finalData) => getOrganicFertilizerCalculation({
      cropName: finalData.cropName,
      SystemOfLandCalculation: finalData.SystemOfLandCalculation,
      length: finalData.length,
      wide: finalData.wide
    }),
    onSuccess: (data) => {
      console.log("Response from server is", data);
      queryClient.setQueryData(["organicFertilizerResult"], data);
    }
  });
};

export const useInorganicFertilizer = () => {
const queryClient = useQueryClient();

return useMutation<InOrganicFertilizerCalculation, Error, InorganicFertilizerInput>({
    mutationFn: (finalData) => InorganicFertilizerCalculation({
        cropName: finalData.cropName,
        SystemOfLandCalculation: finalData.SystemOfLandCalculation,
        length: finalData.length,
        wide: finalData.wide
    }),
    onSuccess:(data)=>{
        console.log("Response from server is", data);
        queryClient.setQueryData(["inorganicFertilizerResult"], data);}

})
}

export const useAnimalWeightEstimation = () => {
    const queryClient = useQueryClient();

    return useMutation< animalWeightEstimationResponse, Error, AnimalWeightEstimationInput>(
        {
            mutationFn: (finalData) => getAnimalWeightEstimation({
                HeartGirth: Number(finalData.heartGirth),
                BodyLength: Number(finalData.bodyLength),
                animalName: finalData.animalName
            }),
            onSuccess:(data)=>{
                console.log("Response from server is", data);
                queryClient.setQueryData(["animalWeightEstimationResult"], data);}
        }
    )
}

export const useUnitConversion = () => {
const queryClient = useQueryClient();

return useMutation<number, Error, { currentUnit: string; firstValue: number; targetUnit: string }>(
    {
        mutationFn: (finalData) => getUnitConversion({
            currentUnit: finalData.currentUnit,
            firstValue: finalData.firstValue,
            targetUnit: finalData.targetUnit
        }),
        onSuccess:(data)=>{
            console.log("Response from server is", data);
            queryClient.setQueryData(["unitConversionResult"], data);}
    }
)
}


export const useNewSession = ()=>{
return useMutation({
    mutationFn: createNewSession,
    onSuccess: (data) => {
        console.log("Response from server is", data);
    }
})
}

export const useSendMessageToAI = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (finalData:{id:string , question:string}) => sendMessageToAI({
            id: finalData.id,
            question: finalData.question
        }),
        onSuccess: (data) => {
            console.log("Response from server is", data);
            queryClient.setQueryData(["sendMessageToAI"], data);
        }
    })
}


export const useAiChatAll = (id: string) => {
    return useQuery({
        queryKey: ["getAllAiChat", id],
        queryFn: () => getAllAiChat(id),
        staleTime:0
    })
}

export const useDetectDisease = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (finalData:{image:File , descriptionOfDisease:string , plantName:string}) => detectDisease(finalData),
        onSuccess: (data) => {
            console.log("Response from server is", data);
            queryClient.setQueryData(["detectDisease"], data);
        }
    })
}


export const useNotices = (page:number, category?:string)=>{
    return useQuery({
        queryKey: ["notices", page, category],
        queryFn: () => getNotices(page, category),
        staleTime:60000,
        placeholderData: keepPreviousData,

    })
}

export const useGetNoticeById = (id:string)=>{
    return useQuery({
        queryKey: ["notice", id],
        queryFn: () => getNoticeById(id),
        staleTime:60000,
    })
}
