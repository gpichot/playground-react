import { QueryKey, QueryObserver } from "react-query";

import { ObserverEvent, QueryEvent } from "./useEvents";

type QueryUpdate = {
  type: Omit<QueryEvent["type"], "added" | "removed">;
  time: number;
  tick: number;
};
type QueryDetails = {
  queryKey: QueryKey;
  startAt: number;
  startAtTime: number;
  endAt: number;
  endAtTime: number;
  updates: QueryUpdate[];
};

function groupBy<T, U>(events: T[], key: (item: T) => U): T[][] {
  const groups: Map<U, T[]> = new Map();
  for (const event of events) {
    const groupKey = key(event);
    if (!groups.has(groupKey)) {
      groups.set(groupKey, []);
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    groups.get(groupKey)!.push(event);
  }
  return Array.from(groups.values());
}

type QueryComputeDefaultOptions = {
  endAtTime: number;
  endAt: number;
};
function aggregateEventAsQuery(
  events: QueryEvent[],
  options: QueryComputeDefaultOptions
): QueryDetails[] {
  const boxes: QueryDetails[] = [];
  let current: Partial<QueryDetails> & { updates: QueryUpdate[] } = {
    updates: [],
  };
  for (const event of events) {
    if (event.type !== "query") {
      continue;
    }
    if (event.action === "added") {
      current.startAt = event.tick;
      current.startAtTime = event.time;
      current.queryKey = event.queryKey;
    } else if (event.action === "removed") {
      const final = {
        startAt: current.startAt || 0,
        startAtTime: current.startAtTime || 0,
        queryKey: current.queryKey,
        updates: current.updates,
        endAt: event.tick,
        endAtTime: event.time,
      } as QueryDetails;
      boxes.push(final);
      current = { updates: [] };
    } else {
      current.updates.push({
        type: event.action,
        time: event.time,
        tick: event.tick,
      });
    }
  }

  if (current.queryKey) {
    boxes.push({
      ...current,
      ...options,
    } as QueryDetails);
  }
  return boxes;
}

export function computeQueryBoxes(
  events: QueryEvent[],
  options: QueryComputeDefaultOptions
): QueryDetails[] {
  const groups = groupBy(events, event => JSON.stringify(event.queryKey));

  const queries = groups.flatMap(events => {
    const sortedEvents = events.sort((a, b) => a.time - b.time);
    return aggregateEventAsQuery(sortedEvents, options);
  });
  return queries;
}

type ObserverUpdate = {
  time: number;
  tick: number;
};
type ObserverDetails = {
  observer: QueryObserver;
  startAt: number;
  startAtTime: number;
  endAt: number;
  endAtTime: number;
  updates: ObserverUpdate[];
};
function aggregateEventAsObserver(events: ObserverEvent[]): ObserverDetails[] {
  const boxes: ObserverDetails[] = [];
  let startAt = 0;
  let updates: ObserverUpdate[] = [];
  for (const event of events) {
    if (event.action === "added") {
      startAt = event.tick;
    } else if (event.action === "resultsUpdated") {
      updates.push({
        time: event.time,
        tick: event.tick,
      });
    } else if (event.action === "removed") {
      boxes.push({ startAt, endAt: event.tick, updates } as ObserverDetails);
      updates = [];
    }
  }
  return boxes;
}
export function computeObserverBoxes(
  events: ObserverEvent[]
): ObserverDetails[] {
  const groups = groupBy(events, event => event.observer);

  return groups.flatMap(events => {
    const sortedEvents = events.sort((a, b) => a.time - b.time);
    return aggregateEventAsObserver(sortedEvents);
  });
}
