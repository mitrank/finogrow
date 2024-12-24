import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.budget)["edit-budget"][":id"]["$patch"]
>;
type RequestType = InferRequestType<
  (typeof client.api.budget)["edit-budget"][":id"]["$patch"]
>["json"];

export const useEditBudget = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.budget["edit-budget"][":id"]["$patch"]({
        json,
        param: { id },
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Threshold updated!");
      queryClient.invalidateQueries({ queryKey: ["budget"] });
    },
    onError: () => {
      toast.error("Failed to edit expense threshold!");
      queryClient.invalidateQueries({ queryKey: ["budget"] });
    },
  });
  return mutation;
};
