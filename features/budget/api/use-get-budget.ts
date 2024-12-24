import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetBudget = () => {
  const query = useQuery({
    queryKey: ["budget"],
    queryFn: async () => {
      const response = await client.api.budget.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch budget");
      }

      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
