export default [
  { type: "queryAdded", tick: 1, queryKey: ["fake-query"] },
  { type: "observerResultsUpdated", tick: 1, queryKey: ["fake-query"] },
  { type: "observerAdded", tick: 1, queryKey: ["fake-query"] },
  { type: "queryUpdated", tick: 1, queryKey: ["fake-query"] },
  { type: "observerResultsUpdated", tick: 41, queryKey: ["fake-query"] },
  { type: "queryUpdated", tick: 41, queryKey: ["fake-query"] },
  {
    type: "observerResultsUpdated",
    tick: 1001,
    queryKey: ["fake-query"],
  },
  { type: "observerAdded", tick: 1001, queryKey: ["fake-query"] },
  {
    type: "observerResultsUpdated",
    tick: 1001,
    queryKey: ["fake-query"],
  },
  { type: "queryUpdated", tick: 1001, queryKey: ["fake-query"] },
  {
    type: "observerResultsUpdated",
    tick: 1021,
    queryKey: ["fake-query"],
  },
  {
    type: "observerResultsUpdated",
    tick: 1021,
    queryKey: ["fake-query"],
  },
  { type: "queryUpdated", tick: 1021, queryKey: ["fake-query"] },
  { type: "observerRemoved", tick: 2001, queryKey: ["fake-query"] },
  { type: "observerRemoved", tick: 4001, queryKey: ["fake-query"] },
  { type: "queryRemoved", tick: 4791, queryKey: ["fake-query"] },
];
