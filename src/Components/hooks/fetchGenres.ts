import { useState, useEffect } from "react";
import axios from "axios";

export const useGenres = (token) => {
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchGenres = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/genre/movie/list",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            params: {
              api_key: "d832bcf8a5d5a6da18b46a6ba2951d0a",
              language: "es-MX",
            },
          }
        );
        setGenres(response.data.genres);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };

    fetchGenres();
  }, [token]);

  return { genres, isLoading, error };
};
