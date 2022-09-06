import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import ComponentsCanvas from "./components/ComponentsCanvas";
import ComponentsTimeline from "./components/ComponentsTimeline";
import PlayerControls from "./components/PlayerControls";
import ReactQueryTimeline, {
  TimelineBoxes,
} from "./components/ReactQueryTimeline";
import { Options } from "./defaults";
import { PlayerProvider } from "./player-context";
import useEvents from "./useEvents";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Options.staleTime,
      cacheTime: Options.cacheTime,
      refetchInterval: Options.refetchInterval,
      refetchOnMount: Options.refetchOnMount,
    },
  },
});

export default function StaleCacheTime() {
  /*
   * const [client, setClient] = React.useState(
   *   () =>
   *     new QueryClient({
   *       // defaultOptions: {
   *       //   queries: {
   *       //     staleTime: Options.staleTime,
   *       //     cacheTime: Options.cacheTime,
   *       //   },
   *       // },
   *     })
   * );
   */
  const { events, addEvent } = useEvents();
  return (
    <QueryClientProvider client={client}>
      <PlayerProvider>
        <PlayerControls />
        <ReactQueryTimeline addEvent={addEvent}>
          <ComponentsCanvas options={Options} />
          <ReactQueryDevtools position="bottom-right" />
          <ComponentsTimeline options={Options} />
          <TimelineBoxes events={events} />
        </ReactQueryTimeline>
      </PlayerProvider>
    </QueryClientProvider>
  );
}
