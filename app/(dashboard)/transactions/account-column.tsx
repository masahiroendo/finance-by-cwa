import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";

type AccountColumnProps = {
  account: string;
  accountId: string;
};

export const AccountColumn = ({ account, accountId }: AccountColumnProps) => {
  const { onOpen: onOpenAccount } = useOpenAccount();
  return (
    <div
      className="flex items-center cursor-pointer hover:underline"
      onClick={() => onOpenAccount(accountId)}
    >
      {account}
    </div>
  );
};
