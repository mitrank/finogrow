import { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  PlaidLinkOnSuccess,
  PlaidLinkOptions,
  usePlaidLink,
} from "react-plaid-link";
import { useCreateLinkToken } from "@/features/aggregator/api/use-create-link-token";
import { useUser } from "@clerk/nextjs";
import { useExchangePublicToken } from "@/features/aggregator/api/use-exchange-public-token";

export const PlaidLink = () => {
  const { user } = useUser();
  const [token, setToken] = useState("");
  const linkTokenMutation = useCreateLinkToken();
  const publicTokenMutation = useExchangePublicToken();

  useEffect(() => {
    const getLinkToken = async () => {
      linkTokenMutation.mutate(
        {
          name: "FinoGrow",
          id: user!.id,
        },
        {
          onSuccess: (data) => {
            setToken(data?.linkToken || "");
          },
        }
      );
    };

    if (user) {
      getLinkToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      publicTokenMutation.mutate(
        { publicToken: public_token },
        {
          onSuccess: (data) => {
            console.log("on successful exchange of public token -> ", data);
          },
        }
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <>
      <Button className="lg:w-[170px]" onClick={() => open()} disabled={!ready}>
        Link Account
      </Button>
    </>
  );
};
