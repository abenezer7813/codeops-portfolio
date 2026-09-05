import { useEffect, useState } from "react";
import { load } from "../api";

export function useFetch(url) {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    const ctrl = new AbortController();

    load(
      url,
      ctrl.signal,
      setData,
      setError,
      setLoading
    );

    return () => ctrl.abort();
  }, [url]);

  return { data, loading, error };
}