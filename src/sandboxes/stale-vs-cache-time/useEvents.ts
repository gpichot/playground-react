import React from "react";
import { QueryKey, QueryObserver } from "react-query";

export type QueryEvent = {
  type: "query";
  action:
    | "added"
    | "fetch"
    | "success"
    | "removed"
    | "continue"
    | "failed"
    | "invalidate"
    | "pause"
    | "error"
    | "setState";
  time: number;
  tick: number;
  queryKey: QueryKey;
};

export type ObserverEvent = {
  type: "observer";
  observer: QueryObserver;
  action: "resultsUpdated" | "added" | "removed";
  queryKey: QueryKey;
  time: number;
  tick: number;
};

export type ReactQueryEvent = QueryEvent | ObserverEvent;

export default function useEvents() {
  const [events, setEvents] = React.useState<ReactQueryEvent[]>([]);

  const addEvent = (event: ReactQueryEvent) =>
    setEvents(prev => [...prev, event]);
  return { events, addEvent };
}
