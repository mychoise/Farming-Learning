 import { useQueryClient, useMutation } from "@tanstack/react-query";
import { getOrganicFertilizerCalculation } from "../api/api";

 export const useOrganicFertilizer = () => {
    const queryClient = useQueryClient();

 return useMutation({
    mutationFn: (finalData) => getOrganicFertilizerCalculation(finalData),
    onSuccess: (data) => {
      console.log("Response from server is", data);
queryClient.setQueryData(["organicFertilizerResult"], data);
}
 });
};
