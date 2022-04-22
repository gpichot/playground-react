import { useQuery } from "react-query";

const fetchFakeQuery = async () => {
  return fetch("https://jsonplaceholder.typicode.com/todos/1").then(res =>
    res.json()
  );
};
export const QUERY_KEY = ["fake-query"];
export function useFakeQuery() {
  return useQuery(QUERY_KEY, fetchFakeQuery, {
    retry: false,
    retryOnMount: false,
  });
}
