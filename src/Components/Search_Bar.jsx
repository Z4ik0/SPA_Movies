import React, { useState } from "react";
import Card_Component from "./Card_Component";
import "./Search_bar.css";
import { useFetch } from "./hooks/useFetch";

function Bar() {
  const [search, setSearch] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;
  const API_ACCESS_TOKEN = import.meta.env.VITE_API_ACCESS_TOKEN;

  const { data, isPending } = useFetch(API_URL, API_ACCESS_TOKEN);

  // ! Sigue el input
  const searcher = (e) => {
    setSearch(e.target.value);
  };

  // ! filtro
  let pelis = [];
  if (!search) {
    pelis = data;
  } else {
    pelis  = data.filter( (dato) =>
      dato.original_title.toLowerCase().includes(search.toLowerCase())
    );
  }


  return (
    <>
      <div className="form">
        <div className="container">
          <label className="form-label text" htmlFor="Searchbar">
            Encuentra tu pelicula
          </label>
          <input
            value={search}
            onChange={searcher}
            id="Searchbar"
            className="form-control input"
            placeholder="Buscar.."
            type="text"
          />
        </div>
      </div>
      <Card_Component data={pelis} isPending={isPending}></Card_Component>
    </>
  );
}

export default Bar;
