import { useState } from "react";
import { useFetch } from "./hooks/useFetch";
import Loading from "./Loading";
import Card_Component from "./Card_Component";

function Bar() {
  const [search, setSearch] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;
  const API_ACCESS_TOKEN = import.meta.env.VITE_API_ACCESS_TOKEN;

  const { data, isPending } = useFetch(API_URL, API_ACCESS_TOKEN, search);

  return (
    <>
      <div className="form" style={{ background: "linear-gradient(to bottom, black, red)" }}>
        <div className="container">
          <label className="form-label text-white" htmlFor="Searchbar">
            Encuentra tu película
          </label>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            id="Searchbar"
            className="form-control input"
            placeholder="Buscar por título, género o actor..."
            type="text"
            style={{
              border: "2px solid red",  
              borderRadius: "10px",     
              backgroundColor: "black", 
              color: "white",          
            }}
          />
        </div>
      </div>

      {isPending ? (
        <Loading />
      ) : data && data.length > 0 ? (
        <div>
          { search.length > 0 && (
            <div className="alert alert-success" role="alert">
              Se encontraron {data.length} resultados para "{search}".
            </div>
          )}
          <Card_Component data={data} />
        </div>
      ) : (
        <p>No se encontraron resultados para "{search}".</p>
      )}
    </>
  );
}

export default Bar;
