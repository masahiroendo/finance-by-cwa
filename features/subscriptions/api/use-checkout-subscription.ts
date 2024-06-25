import { toast } from "sonner";
import { InferResponseType } from "hono";
import { useMutation } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
  (typeof client.api.subscriptions.checkout)["$post"],
  200
>;

export const useCheckoutSubscription = () => {
  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.subscriptions.checkout.$post();

      if (!response.ok) {
        throw Error("Response Failed. Failed to create checkout url.");
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      window.location.href = data;
    },
    onError: () => {
      toast.error("Failed to create checkout url.");
    },
  });

  return mutation;
};
