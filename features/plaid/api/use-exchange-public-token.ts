import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
  (typeof client.api.plaid)["exchange-public-token"]["$post"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.plaid)["exchange-public-token"]["$post"]
>["json"];

export const useExchangePublicToken = () => {
  const QueryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.plaid["exchange-public-token"].$post({
        json,
      });

      if (!response.ok) {
        throw Error("Response Failed. Failed to exchange public token.");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Public token exchanged.");
      QueryClient.invalidateQueries({ queryKey: ["connected-bank"] });
      QueryClient.invalidateQueries({ queryKey: ["summary"] });
      QueryClient.invalidateQueries({ queryKey: ["transactions"] });
      QueryClient.invalidateQueries({ queryKey: ["accounts"] });
      QueryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: () => {
      toast.error("Failed to exchange public token");
    },
  });

  return mutation;
};
