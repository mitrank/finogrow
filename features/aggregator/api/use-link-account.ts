import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.aggregator)["link-account"]["$post"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.aggregator)["link-account"]["$post"]
>["json"];

export const useLinkAccount = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.aggregator["link-account"]["$post"]({
        json,
      });
      if (response.status === 200) {
        return await response.json();
      }
      throw new Error(`User Authentication Failed: ${response.status}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["aggregator"] });
      toast.success("Bank Account(s) Linked Successfully!");
    },
    onError: () => {
      toast.error("Failed to link bank account(s)!");
    },
  });

  return mutation;
};
