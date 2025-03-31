import { useState } from "react";
import { useFetch } from "./hooks/useFetch";
import { useGenres } from "./hooks/fetchGenres";
import Loading from "./Loading";
import Card_Component from "./Card_Component";

function Bar() {
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [searchType, setSearchType] = useState("movie");

  const API_URL = import.meta.env.VITE_API_URL;
  const API_ACCESS_TOKEN = import.meta.env.VITE_API_ACCESS_TOKEN;

  const { genres } = useGenres(API_ACCESS_TOKEN);
  const { data, genreData, genreName, isPending } = useFetch(
    API_URL,
    API_ACCESS_TOKEN,
    search,
    selectedGenre,
    genres,
    searchType
  );

  return (
    <>
      <div className="form">
        <div className="container">
          <label className="form-label text" htmlFor="Searchbar">
            Encuentra tu película
          </label>
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedGenre(null);
            }}
            id="Searchbar"
            className="form-control input"
            placeholder="Buscar.."
            type="text"
          />
        </div>

        <div className="container mt-3">
          <label className="form-label text">Filtrar por género:</label>
          <select
            className="form-select"
            onChange={(e) => {
              setSelectedGenre(e.target.value);
              setSearch("");
            }}
          >
            <option value="">Selecciona un género</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        <div className="container mt-3 mb-5">
          <label className="form-label text">Buscar por:</label>
          <select
            className="form-select"
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="movie">Título de película</option>
            <option value="person">Nombre de actor</option>
          </select>
        </div>
      </div>

      {isPending ? (
        <Loading />
      ) : selectedGenre ? (
        genreData && genreData.length > 0 ? (
          <div>
            <h2>Películas del género "{genreName}"</h2>
            <Card_Component data={genreData} />
          </div>
        ) : (
          <p>No se encontraron películas para el género seleccionado.</p>
        )
      ) : search === "" ? (
        <Card_Component data={data} />
      ) : data && data.length > 0 ? (
        <div>
          <h2>
            {searchType === "movie"
              ? `Películas con el nombre "${search}"`
              : `Actores con el nombre "${search}"`}
          </h2>
          <Card_Component data={data} />
        </div>
      ) : (
        <p>
          No hay resultados relacionados para "{search}" en{" "}
          {searchType === "movie" ? "películas" : "actores"}.
        </p>
      )}
    </>
  );
}

export default Bar;
