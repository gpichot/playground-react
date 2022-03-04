import { useMessages } from "@/features/messages";

export function useImpressionReporter() {
  const messages = useMessages();

  return {
    logImpression(name: string) {
      messages.success(`Offer ${name} was shown`);
    },
  };
}
