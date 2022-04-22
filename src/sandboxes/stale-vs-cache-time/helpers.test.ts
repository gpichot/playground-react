import {
  queryAdded,
  queryRemoved,
  queryUpdatedActionFetch,
  queryUpdatedActionSuccess,
} from "./mocks/queries";
import { computeQueryBoxes } from "./helpers";

describe("computeQueryBoxes", () => {
  const defaults = {
    endAt: 100000,
    endAtTime: 1650463914814,
  };
  it("create box with updates with normal flow", () => {
    const events = [
      queryAdded,
      queryUpdatedActionFetch,
      queryUpdatedActionSuccess,
      queryRemoved,
    ];

    const boxes = computeQueryBoxes(events, defaults);

    expect(boxes).toEqual([
      {
        queryKey: ["fake-query"],
        startAt: 10,
        endAt: 2100,
        startAtTime: 1650463914814,
        endAtTime: 1650463916914,
        updates: [
          { type: "fetch", tick: 100, time: 1650463914914 },
          { type: "success", tick: 1100, time: 1650463915914 },
        ],
      },
    ]);
  });

  it("create box without added event", () => {
    const events = [
      queryUpdatedActionFetch,
      queryUpdatedActionSuccess,
      queryRemoved,
    ];

    const boxes = computeQueryBoxes(events, defaults);

    expect(boxes).toEqual([
      {
        endAt: 2100,
        endAtTime: 1650463916914,
        startAt: 0,
        startAtTime: 0,
        updates: [
          {
            tick: 100,
            time: 1650463914914,
            type: "fetch",
          },
          {
            tick: 1100,
            time: 1650463915914,
            type: "success",
          },
        ],
      },
    ]);
  });

  it("create box without removed event", () => {
    const events = [
      queryAdded,
      queryUpdatedActionFetch,
      queryUpdatedActionSuccess,
    ];

    const boxes = computeQueryBoxes(events, defaults);

    expect(boxes).toEqual([
      {
        queryKey: ["fake-query"],
        startAt: 10,
        endAt: 100000,
        startAtTime: 1650463914814,
        endAtTime: 1650463914814,
        updates: [
          { type: "fetch", tick: 100, time: 1650463914914 },
          { type: "success", tick: 1100, time: 1650463915914 },
        ],
      },
    ]);
  });
});
