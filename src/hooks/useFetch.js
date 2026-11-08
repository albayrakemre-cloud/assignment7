import { useEffect, useReducer } from "react";

const initialState = { loading: true, error: null, data: null };

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return { loading: true, error: null, data: null };
    case "FETCH_SUCCESS":
      return { loading: false, error: null, data: action.payload };
    case "FETCH_ERROR":
      return { loading: false, error: action.payload, data: null };
    default:
      return state;
  }
}

// fetchFn
// deps
export function useFetch(fetchFn, deps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const controller = new AbortController();
    dispatch({ type: "FETCH_START" });

    fetchFn(controller.signal)
      .then((data) => dispatch({ type: "FETCH_SUCCESS", payload: data }))
      .catch((error) => {
        if (error.name === "AbortError") return;
        dispatch({ type: "FETCH_ERROR", payload: error });
      });

    // cleanup
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state; // { loading, error, data }
}