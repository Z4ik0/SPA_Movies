import { useState, useEffect } from "react";
import axios from "axios";

export const useFetch = (url, token, searchKey, genreId, genres, searchType = "movie") => {
  const [data, setData] = useState(null);
  const [genreData, setGenreData] = useState(null);
  const [genreName, setGenreName] = useState("");
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      setData(null);
      setGenreData(null);
      setGenreName("");

      try {
        let endpoint = `${url}/movie/popular`;
        const params = { language: "es-MX" };

        if (genreId) {
          endpoint = `${url}/discover/movie`;
          params.with_genres = genreId;

          const genreObj = genres?.find((g) => g.id === parseInt(genreId));
          setGenreName(genreObj?.name || "");
        } else if (searchKey.trim() !== "") {
          if (searchType === "person") {
            const actorResponse = await axios.get(`${url}/search/person`, {
              headers: { Authorization: `Bearer ${token}` },
              params: { query: searchKey, language: "es-MX" },
            });

            if (actorResponse.data.results.length > 0) {
              const actorId = actorResponse.data.results[0].id;
              endpoint = `${url}/discover/movie`;
              params.with_cast = actorId;
            } else {
              setIsPending(false);
              return;
            }
          } else {
            endpoint = `${url}/search/movie`;
            params.query = searchKey;
          }
        }

        const response = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
          params,
        });

        if (genreId) {
          setGenreData(response.data.results);
        } else {
          setData(response.data.results);
        }

        setIsPending(false);
      } catch (error) {
        console.error("Error en la petición:", error);
        setIsPending(false);
      }
    };

    fetchData();
  }, [url, token, searchKey, genreId, genres, searchType]);

  return { data, genreData, genreName, isPending };
};
