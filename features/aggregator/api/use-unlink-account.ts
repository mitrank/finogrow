import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.aggregator)["unlink-account"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.aggregator)["unlink-account"]["$post"]
>["json"];

export const useUnlinkAccount = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.aggregator["unlink-account"]["$post"]({
        json,
      });
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["aggregator"] });
      toast.success("Removed Bank Account(s) Successfully!");
    },
    onError: () => {
      toast.error("Failed to remove bank account(s)!");
    },
  });

  return mutation;
};
