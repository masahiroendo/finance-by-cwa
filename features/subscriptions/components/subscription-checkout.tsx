import { useCheckoutSubscription } from "@/features/subscriptions/api/use-checkout-subscription";
import { useGetSubscriptions } from "@/features/subscriptions//api/use-get-subscriptions";

import { Button } from "@/components/ui/button";

export const SubscriptionCheckout = () => {
  const checkout = useCheckoutSubscription();
  const { data: subscription, isLoading: isLoadingSubscription } =
    useGetSubscriptions();
  return (
    <Button
      onClick={() => checkout.mutate()}
      disabled={checkout.isPending || isLoadingSubscription}
      variant="outline"
      size="sm"
    >
      {subscription ? "Manage" : "Upgrade"}
    </Button>
  );
};
