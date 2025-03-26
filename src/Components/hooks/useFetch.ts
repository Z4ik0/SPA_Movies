import { useState, useEffect } from "react";
import axios from "axios";

export const useFetch = (url, token, searchKey, genreId, genres) => {
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
          endpoint = `${url}/search/movie`;
          params.query = searchKey;
        }

        const response = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
          params,
        });

        genreId ? setGenreData(response.data.results) : setData(response.data.results);

        setIsPending(false);
      } catch (error) {
        console.error("Error en la petición:", error);
        setIsPending(false);
      }
    };

    fetchData();
  }, [url, token, searchKey, genreId, genres]);

  return { data, genreData, genreName, isPending };
};
