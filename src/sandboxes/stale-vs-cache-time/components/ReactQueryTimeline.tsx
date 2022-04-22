import React from "react";
import { QueryCache, useQueryClient } from "react-query";
import classnames from "classnames";

import { Limit } from "../defaults";
import { computeObserverBoxes, computeQueryBoxes } from "../helpers";
import { usePlayerContext } from "../player-context";
import { ObserverEvent, QueryEvent, ReactQueryEvent } from "../useEvents";
import TimelineBox, { TimelineBoxGroup } from "./TimelineBox";

import styles from "./ReactQueryTimeline.module.scss";

type QueryCacheNotifyEvent = NonNullable<
  Parameters<Parameters<QueryCache["subscribe"]>[0]>[0]
>;

function getQueryAction(event: QueryCacheNotifyEvent) {
  if (event.type === "queryAdded") return "added";
  if (event.type === "queryRemoved") return "removed";
  if (event.type === "queryUpdated") return event.action.type;
  throw new Error();
}

function getObserverAction(event: QueryCacheNotifyEvent) {
  if (event.type === "observerAdded") return "added";
  if (event.type === "observerRemoved") return "removed";
  if (event.type === "observerResultsUpdated") return "resultsUpdated";
  throw new Error();
}

function createQueryEvent(
  event: QueryCacheNotifyEvent,
  tick: number
): QueryEvent {
  const { query } = event;
  const action = getQueryAction(event);

  return {
    type: "query",
    action,
    time: new Date().getTime(),
    tick,
    queryKey: query.queryKey,
  };
}

function createObserverEvent(
  event: QueryCacheNotifyEvent,
  tick: number
): ObserverEvent {
  const { query } = event;
  const action = getObserverAction(event);

  return {
    type: "observer",
    action,
    time: new Date().getTime(),
    tick,
    queryKey: query.queryKey,
    observer: event.observer,
  };
}

function createEvent(
  event: QueryCacheNotifyEvent,
  tick: number
): ReactQueryEvent | null {
  if (event.type === "observerResultsUpdated") return null;
  const type = event.type.startsWith("query") ? "query" : "observer";
  if (type === "query") {
    return createQueryEvent(event, tick);
  }
  return createObserverEvent(event, tick);
}

function useTimeline({
  addEvent,
}: {
  addEvent: (event: ReactQueryEvent) => void;
}) {
  const queryClient = useQueryClient();
  const queryCache = queryClient.getQueryCache();
  const { tickRef } = usePlayerContext();

  React.useEffect(() => {
    return queryCache.subscribe(result => {
      if (!result) return;
      console.log(result);
      const event = createEvent(result, tickRef.current);
      if (event) setTimeout(() => addEvent(event), 0);
    });
  }, [queryCache, tickRef, addEvent]);
}

export default function ReactQueryTimeline({
  children,
  addEvent,
}: {
  children: React.ReactNode;
  addEvent: (event: ReactQueryEvent) => void;
}) {
  const [isFocused, setIsFocused] = React.useState(false);
  const [positionX, setPositionX] = React.useState(0);
  const [isPending, startTransition] = React.useTransition();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [rect, setRect] = React.useState<DOMRect | undefined>();

  useTimeline({ addEvent });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    startTransition(() => {
      setPositionX(e.clientX - (rect?.x || 0));
    });
  };

  React.useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(() => {
      setRect(containerRef.current?.getBoundingClientRect());
    });
    observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  const onKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isFocused) return;
    if (e.key === "ArrowLeft") {
      startTransition(() => {
        setPositionX(positionX - 10);
      });
    }
    if (e.key === "ArrowRight") {
      startTransition(() => {
        setPositionX(positionX + 10);
      });
    }
  };
  return (
    <div
      role="button"
      onMouseOver={onMove}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onKeyDown={onKeyPress}
      tabIndex={0}
      className={styles.timelineContainer}
      ref={containerRef}
    >
      {children}
      <div className={styles.ticker} style={{ left: positionX }}>
        <div className={styles.tickerTitle}>
          {((rect?.width || 100) * positionX) / Limit}
        </div>
        <div className={styles.tickerLine} />
      </div>
    </div>
  );
}

function partitionEvents(
  events: ReactQueryEvent[]
): [QueryEvent[], ObserverEvent[]] {
  const queryEvents: QueryEvent[] = [];
  const observerEvents: ObserverEvent[] = [];
  events.forEach(event => {
    if (event.type === "query") {
      queryEvents.push(event);
    } else {
      observerEvents.push(event);
    }
  });
  return [queryEvents, observerEvents];
}

export function TimelineBoxes({ events }: { events: ReactQueryEvent[] }) {
  const [queryEvents, observerEvents] = partitionEvents(events);
  const queries = computeQueryBoxes(queryEvents, {
    endAt: 1000,
    endAtTime: new Date().getTime(),
  });
  const observers = computeObserverBoxes(observerEvents);
  return (
    <TimelineBoxGroup>
      {queries.map(({ startAt, endAt, updates }) => (
        <TimelineBox
          title="Query"
          key={`${startAt}-${endAt}`}
          style={{
            left: `${(startAt / Limit) * 100}%`,
            width: `${((endAt - startAt) / Limit) * 100}%`,
          }}
        >
          <div className={styles.boxUpdates}>
            {updates.map((update, i) => (
              <div
                key={update.time}
                className={classnames(styles.boxUpdate, styles[update.type])}
                style={{
                  left: `${
                    ((update.tick - startAt) / (endAt - startAt)) * 100
                  }%`,
                }}
              />
            ))}
          </div>
        </TimelineBox>
      ))}
      {observers.map(({ startAt, endAt, updates }) => (
        <TimelineBox
          title="👁 Observer"
          key={`${startAt}-${endAt}`}
          style={{
            left: `${(startAt / Limit) * 100}%`,
            width: `${((endAt - startAt) / Limit) * 100}%`,
          }}
        >
          <div className={styles.boxUpdates}>
            {updates.map(update => (
              <div
                key={update.time}
                className={styles.boxUpdate}
                style={{
                  left: `${
                    ((update.tick - startAt) / (endAt - startAt)) * 100
                  }%`,
                }}
              />
            ))}
          </div>
        </TimelineBox>
      ))}
    </TimelineBoxGroup>
  );
}
