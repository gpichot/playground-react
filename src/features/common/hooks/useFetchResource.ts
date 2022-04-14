import React from "react";

type RequestState<RData = unknown, RError = unknown> = {
  isLoading: boolean;
  error: RError | null;
  data: RData | null;
};

type Action<RData = unknown, RError = unknown> =
  | {
      type: "start";
    }
  | {
      type: "success";
      payload: RData;
    }
  | {
      type: "failure";
      error: RError;
    };

function fetchStatusReducer<RData = unknown, RError = unknown>(
  state: RequestState<RData, RError>,
  action: Action<RData, RError>
): RequestState<RData, RError> {
  switch (action.type) {
    case "start":
      return {
        ...state,
        isLoading: true,
        error: null,
        data: null,
      };
    case "success":
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload,
      };
    case "failure":
      return {
        ...state,
        isLoading: false,
        error: action.error,
        data: null,
      };
    default:
      throw new Error();
  }
}

export default function useFetchResource<RData = unknown, RError = unknown>(
  url: string | (() => Promise<RData | RError>)
): RequestState<RData, RError> {
  const [request, dispatch] = React.useReducer<
    React.Reducer<RequestState<RData, RError>, Action<RData, RError>>
  >(fetchStatusReducer, {
    isLoading: false,
    error: null,
    data: null,
  });

  React.useEffect(() => {
    dispatch({ type: "start" });
    const promise =
      typeof url === "string"
        ? fetch(url).then(r => r.json() as Promise<RData>)
        : url();

    promise
      .then(data => {
        dispatch({ type: "success", payload: data as RData });
      })
      .catch(error => {
        dispatch({ type: "failure", error: error as RError });
      });
  }, [url]);

  return request;
}
