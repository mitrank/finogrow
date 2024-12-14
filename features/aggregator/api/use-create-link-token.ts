import { InferRequestType, InferResponseType } from "hono";
import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.aggregator)["create-link-token"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.aggregator)["create-link-token"]["$post"]
>["json"];

export const useCreateLinkToken = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.aggregator["create-link-token"][
        "$post"
      ]({ json });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Link Token Created!");
    },
    onError: () => {
      toast.error("Failed to create link token!");
    },
  });

  return mutation;
};
