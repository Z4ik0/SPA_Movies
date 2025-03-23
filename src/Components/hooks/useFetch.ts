import { useState, useEffect } from "react";
import axios from "axios";

export const useFetch = (url, token) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      try {

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        // console.log(response.data)
        setTimeout(() => {
          setIsPending(false);
          setData(response.data.results);
          setError(null);
        }, 1000);
      } catch (error) {
        setError(error);
        setIsPending(false);
      }
    };

    fetchData();
  }, [url, token]);

  return { data, isPending, error };
};