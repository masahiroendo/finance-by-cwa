"use client";

import { useState } from "react";
import { useMount } from "react-use";
import { usePlaidLink } from "react-plaid-link";

import { useCreatePlaidLinkToken } from "@/features/plaid/api/use-create-link-token";
import { useExchangePublicToken } from "@/features/plaid/api/use-exchange-public-token";

import { Button } from "@/components/ui/button";

export const PlaidConnect = () => {
  const [token, setToken] = useState<string | null>(null);
  const createLinkToken = useCreatePlaidLinkToken();
  const exchangePublicToken = useExchangePublicToken();

  useMount(() => {
    createLinkToken.mutate(undefined, {
      onSuccess: ({ data }) => {
        setToken(data);
      },
    });
  });

  const plaid = usePlaidLink({
    token: token,
    onSuccess: (publicToken) => {
      exchangePublicToken.mutate({ publicToken });
    },
    env: "sandbox",
  });

  const onClick = () => {
    plaid.open();
  };

  const isDisabled = !plaid.ready || exchangePublicToken.isPending;

  return (
    <Button
      onClick={onClick}
      size="sm"
      variant="outline"
      disabled={isDisabled}
      className="text-sm font-medium"
    >
      {isDisabled ? "Connecting" : "Connect"}
    </Button>
  );
};
