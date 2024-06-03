"use client";

import { Button } from "@/components/ui/button";
import { useDeleteConnectedBank } from "../api/use-delete-connected-bank";
import { useConfirm } from "@/hooks/use-confirm";

export const PlaidDisconnect = () => {
  const [ConfirmDialog, confirm] = useConfirm(
    "Are your sure to delete this connected bank?",
    "This will disconnect your bank account, and remove all associated data."
  );
  const deleteConnectedBank = useDeleteConnectedBank();

  const onClick = async () => {
    const ok = await confirm();

    if (ok) {
      deleteConnectedBank.mutate();
    }
  };

  const disabled = deleteConnectedBank.isPending;

  return (
    <>
      <ConfirmDialog />
      <Button
        onClick={onClick}
        size="sm"
        variant="outline"
        disabled={disabled}
        className="text-sm font-medium"
      >
        {disabled ? "Disconnecting" : "Disconnect"}
      </Button>
    </>
  );
};
