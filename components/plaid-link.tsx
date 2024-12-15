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
import { useAccountData } from "@/features/aggregator/hooks/use-account-data";
import { useConfirm } from "@/hooks/use-confirm";

export const PlaidLink = () => {
  const { user } = useUser();

  const [token, setToken] = useState("");
  const { accountData, onUpdate: onUpdateAccountData } = useAccountData();
  const [ConfirmationDialog, confirm] = useConfirm(
    "Are you sure?",
    "You're about to disconnect all the linked bank accounts with FinoGrow."
  );

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

  const handleUnlinkAccount = async () => {
    const ok = await confirm();

    if (ok) {
      onUpdateAccountData([]); // Account Data to be updated from DB with the plaid_id
    }
  };

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      publicTokenMutation.mutate(
        { publicToken: public_token },
        {
          onSuccess: (data) => {
            console.log("on successful exchange of public token -> ", data);
            onUpdateAccountData(data.accountsData); // Account Data to be updated from DB with the plaid_id
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
      <ConfirmationDialog />
      {accountData.length > 0 ? (
        <Button
          className="lg:w-[170px]"
          variant="outline"
          onClick={handleUnlinkAccount}
          disabled={!ready}
        >
          Unlink Account
        </Button>
      ) : (
        <Button
          className="lg:w-[170px]"
          onClick={() => open()}
          disabled={!ready}
        >
          Link Account
        </Button>
      )}
    </>
  );
};
