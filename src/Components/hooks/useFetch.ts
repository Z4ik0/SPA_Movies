import { useState, useEffect } from "react";
import axios from "axios";

export const useFetch = (url, token, searchKey) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      setData(null);

      try {
        let movies = [];
        let actorMovies = [];
        let genreMovies = [];

        if (searchKey.trim() === "") {
          // Si el input está vacío, obtener las películas populares
          const popularResponse = await axios.get(`${url}/movie/popular`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { language: "es-MX" },
          });
          movies = popularResponse.data.results;
        } else {
          // Buscar actores
          const actorResponse = await axios.get(`${url}/search/person`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { query: searchKey, language: "es-MX" },
          });

          const actorIds = actorResponse.data.results.map((actor) => actor.id);

          // Si se encontraron actores, buscar películas relacionadas
          if (actorIds.length > 0) {
            const castResponse = await axios.get(`${url}/discover/movie`, {
              headers: { Authorization: `Bearer ${token}` },
              params: { with_cast: actorIds.join(","), language: "es-MX" },
            });
            actorMovies = castResponse.data.results;
          }

          // Buscar películas por género
          const genreResponse = await axios.get(`${url}/discover/movie`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { with_genres: searchKey, language: "es-MX" },
          });
          genreMovies = genreResponse.data.results;

          // Buscar películas por título
          const titleResponse = await axios.get(`${url}/search/movie`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { query: searchKey, language: "es-MX" },
          });
          movies = [...movies, ...titleResponse.data.results];
        }

        // Combinar resultados, priorizando las películas relacionadas con el género y el actor
        movies = [...genreMovies, ...actorMovies, ...movies];

        // Eliminar duplicados basados en el ID de la película
        const uniqueMovies = movies.filter(
          (movie, index, self) =>
            index === self.findIndex((m) => m.id === movie.id)
        );

        setData(uniqueMovies);
        setIsPending(false);
      } catch (error) {
        console.error("Error en la petición:", error);
        setIsPending(false);
      }
    };

    fetchData();
  }, [url, token, searchKey]);

  return { data, isPending };
};
