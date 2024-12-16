import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetLinkedAccounts = () => {
  const query = useQuery({
    queryKey: ["aggregator"],
    queryFn: async () => {
      const response = await client.api.aggregator.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch linked accounts");
      }

      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
