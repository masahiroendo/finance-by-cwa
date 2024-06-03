import { toast } from "sonner";
import { InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
  (typeof client.api.plaid)["connected-bank"]["$delete"],
  200
>;

export const useDeleteConnectedBank = () => {
  const QueryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.plaid["connected-bank"].$delete();

      if (!response.ok) {
        throw Error("Response Failed. Failed to delete connected bank.");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Connected bank deleted.");
      QueryClient.invalidateQueries({ queryKey: ["connected-bank"] });
      QueryClient.invalidateQueries({ queryKey: ["summary"] });
      QueryClient.invalidateQueries({ queryKey: ["transactions"] });
      QueryClient.invalidateQueries({ queryKey: ["accounts"] });
      QueryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: () => {
      toast.error("Failed to delete connected bank.");
    },
  });

  return mutation;
};
