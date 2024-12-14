import { InferRequestType, InferResponseType } from "hono";
import { useMutation } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.aggregator)["exchange-public-token"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.aggregator)["exchange-public-token"]["$post"]
>["json"];

export const useExchangePublicToken = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.aggregator["exchange-public-token"][
        "$post"
      ]({ json });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Bank Account(s) Linked Successfully!");
    },
    onError: () => {
      toast.error("Failed to link bank account(s)!");
    },
  });

  return mutation;
};
