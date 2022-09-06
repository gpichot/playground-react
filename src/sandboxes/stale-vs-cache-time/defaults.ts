export const Options = {
  compA: {
    startAt: 0,
    endAt: 2000,
  },
  compB: {
    startAt: 1000,
    endAt: 4000,
  },
  staleTime: 0,
  cacheTime: 4000,
  refetchInterval: 10000,
  refetchOnMount: true,
};

export const Limit = 6000;
export type IOptions = typeof Options;
