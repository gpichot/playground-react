import React from "react";

import { useImpressionReporter } from "@/features/impressions";

export default function useNotifyImpression({
  isPremium,
  nftID,
}: {
  isPremium: boolean;
  nftID: string;
}) {
  const impressionReporter = useImpressionReporter();

  const ref = React.useRef<HTMLElement | null>(null);
  React.useEffect(() => {
    if (!isPremium) return;
    const observer = new IntersectionObserver(
      () => {
        impressionReporter.logImpression(nftID);
      },
      {
        threshold: 0.7,
      }
    );
    observer.observe(ref.current as unknown as Element);
  }, [isPremium, nftID, impressionReporter]);

  return ref;
}
