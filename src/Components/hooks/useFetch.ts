import { useState, useEffect } from "react";

export const useFetch = (url, token) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'aplication/json'
          }
      });
        if (!response.ok) throw new Error(response.statusText);
        const json = await response.json();

        setTimeout(()=>{
          setIsPending(false);
          setData(json);
          setError(null);
        },1000)
        
   
      } catch (error) {
        setError(error)
        setIsPending(false);
      }
    };
    fetchData();
  }, [url]);
  return { data, isPending, error };
};