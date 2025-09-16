import { useState, useEffect } from "react";
import axiosInstance from "@/axios/Index";

export function useAxiosFetch<T = any>(
  url: string,
  params: Record<string, any> = {},
  debounceMs = 500
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [debouncedParams, setDebouncedParams] = useState(params);

  // Debounce params
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedParams(params), debounceMs);
    return () => clearTimeout(handler);
  }, [params, debounceMs]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    axiosInstance
      .get<T>(url, { params: debouncedParams })
      .then((res) => {
        if (isMounted) setData(res.data);
      })
      .catch((err) => {
        console.error(err);
        if (isMounted) setError(err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [url, JSON.stringify(debouncedParams)]); // re-fetch when debounced params change

  return { data, error, loading };
}
