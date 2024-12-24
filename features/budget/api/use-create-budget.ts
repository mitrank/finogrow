import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.budget)["create-budget"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.budget)["create-budget"]["$post"]
>["json"];

export const useCreateBudget = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.budget["create-budget"]["$post"]({
        json,
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Expense threshold created!");
      queryClient.invalidateQueries({ queryKey: ["budget"] });
    },
    onError: () => {
      toast.error("Failed to create expense threshold!");
    },
  });
  return mutation;
};
