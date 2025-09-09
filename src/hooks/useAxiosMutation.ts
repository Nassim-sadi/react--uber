import { useState } from "react";
import axiosInstance from "@/axios/Index";

type Method = "post" | "put" | "patch" | "delete";

export function useAxiosMutation<T = any>(
  url: string,
  method: Method = "post"
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const mutate = async (body?: any) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axiosInstance[method]<T>(url, body);
      setData(res.data);
      return res.data;
    } catch (err: any) {
      let message = "Unknown error";
      if (err.response?.data?.message) {
        // backend sent a message
        message = err.response.data.message;
      } else if (err.message) {
        message = err.message;
      }
      setError(message);
      throw err; // rethrow if you want caller to handle too
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, mutate };
}
