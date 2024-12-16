import { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  PlaidLinkOnSuccess,
  PlaidLinkOptions,
  usePlaidLink,
} from "react-plaid-link";
import { useCreateLinkToken } from "@/features/aggregator/api/use-create-link-token";
import { useUser } from "@clerk/nextjs";
import { useLinkAccount } from "@/features/aggregator/api/use-link-account";
import { useConfirm } from "@/hooks/use-confirm";
import { useGetLinkedAccounts } from "@/features/aggregator/api/use-get-linked-accounts";
import { useUnlinkAccount } from "@/features/aggregator/api/use-unlink-account";

export const PlaidLink = () => {
  const { user } = useUser();

  const [token, setToken] = useState("");
  const linkedAccountsQuery = useGetLinkedAccounts();
  const linkedAccountsData = linkedAccountsQuery.data || [];
  const [ConfirmationDialog, confirm] = useConfirm(
    "Are you sure?",
    "You're about to disconnect all the linked bank accounts with FinoGrow."
  );

  const linkTokenMutation = useCreateLinkToken();
  const linkAccountMutation = useLinkAccount();
  const unlinkAccountMutation = useUnlinkAccount();

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
      unlinkAccountMutation.mutate({
        ids: linkedAccountsData
          .filter((account) => account.id)
          .map((account) => account.id!),
      });
    }
  };

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      linkAccountMutation.mutate({ publicToken: public_token });
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
      {linkedAccountsData.length > 0 ? (
        <Button
          className="lg:w-[170px]"
          variant="outline"
          onClick={handleUnlinkAccount}
          disabled={
            !ready ||
            linkedAccountsQuery.isLoading ||
            linkedAccountsQuery.isPending
          }
        >
          Unlink Account
        </Button>
      ) : (
        <Button
          className="lg:w-[170px]"
          onClick={() => open()}
          disabled={
            !ready ||
            linkedAccountsQuery.isLoading ||
            linkedAccountsQuery.isPending
          }
        >
          Link Account
        </Button>
      )}
    </>
  );
};
