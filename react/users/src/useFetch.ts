import { useState, useEffect } from 'react';
import type { FetchedData } from "./types";

const useFetch = <T>(url: string): FetchedData<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setTimeout(() => {
      fetch(url)
      .then(res => {
        if (!res.ok) {
          throw Error('could not fetch the data for that resource');
        } 
        
        return res.json();
      })
      .then(data => {
        setData(data);
        setError(null);
      })
      .catch(err => {
        setError(err);
      }).finally(() => setIsPending(false))
    }, 2000);
  }, [url])

  return { data, isPending, error };
}
 
export default useFetch;