import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";

type Props = {
  account: string;
  accountId: string;
};

export const AccountColumn = ({ account, accountId }: Props) => {
  const { onOpen } = useOpenAccount();

  const handleOnOpenAccount = () => {
    onOpen(accountId);
  };

  return (
    <div
      className="flex items-center cursor-pointer hover:underline"
      onClick={handleOnOpenAccount}
    >
      {account}
    </div>
  );
};
