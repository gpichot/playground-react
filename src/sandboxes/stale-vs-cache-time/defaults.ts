export const Options = {
  compA: {
    startAt: 0,
    endAt: 2000,
  },
  compB: {
    startAt: 3000,
    endAt: 4000,
  },
  staleTime: 0,
  cacheTime: 800,
  refetchInterval: 800,
};

export const Limit = 6000;
export type IOptions = typeof Options;
