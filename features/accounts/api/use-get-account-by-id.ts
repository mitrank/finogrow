import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetAccountById = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["accounts", { id }],
    queryFn: async () => {
      const response = await client.api.accounts[":id"].$get({
        param: { id },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch the account");
      }

      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
