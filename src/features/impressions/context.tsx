import React from "react";

import { useMessages } from "@/features/messages";

const reported = new Set();

export function useImpressionReporter() {
  const messages = useMessages();

  return React.useMemo(
    () => ({
      logImpression(name: string) {
        if (reported.has(name)) {
          return;
        }
        reported.add(name);
        console.log(`Impression: ${name}`);
        // messages.success(`Offer ${name} was shown`);
      },
    }),
    []
  );
}
