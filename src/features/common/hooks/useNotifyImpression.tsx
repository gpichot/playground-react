import React from "react";

import { useImpressionReporter } from "@/features/impressions";

export default function useNotifyImpression<Element extends HTMLElement>({
  isPremium,
  nftID,
}: {
  isPremium: boolean;
  nftID: string;
}) {
  const impressionReporter = useImpressionReporter();

  const ref = React.useRef<Element | null>(null);
  React.useEffect(() => {
    if (!isPremium) return;
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.intersectionRatio < 0.7) return;
          impressionReporter.logImpression(nftID);
        });
      },
      {
        threshold: 0.7,
      }
    );
    observer.observe(ref.current as unknown as Element);
    return () => observer.disconnect();
  }, [isPremium, nftID, impressionReporter]);

  return ref;
}
