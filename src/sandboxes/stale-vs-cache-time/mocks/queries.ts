import { QueryEvent } from "../useEvents";

export const queryAdded: QueryEvent = {
  type: "query",
  action: "added",
  time: 1650463914814,
  tick: 10,
  queryKey: ["fake-query"],
};

export const queryUpdatedActionFetch: QueryEvent = {
  type: "query",
  action: "fetch",
  time: 1650463914914,
  tick: 100,
  queryKey: ["fake-query"],
};

export const queryUpdatedActionSuccess: QueryEvent = {
  type: "query",
  action: "success",
  time: 1650463915914,
  tick: 1100,
  queryKey: ["fake-query"],
};

export const queryRemoved: QueryEvent = {
  type: "query",
  action: "removed",
  time: 1650463916914,
  tick: 2100,
  queryKey: ["fake-query"],
};
