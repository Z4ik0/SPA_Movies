import React from "react";
import "./Card.css";

const IMAGE_PATH = import.meta.env.VITE_IMG_BASIC_PATH;

function Card_Component({ data }) {
  return (
    <div className="container">
      <div className="row gap-4  justify-content-md-center">
        {data != null
          ? data.map((movie) => {
              return (
                <div
                  className="card col-3"
                  key={movie.id}
                  style={{ overflow: "hidden" }}
                >
                  <div>
                    <img
                      className="card-img-top"
                      style={{ maxHeight: "100%" }}
                      src={`${IMAGE_PATH}/${movie.poster_path}`}
                      alt={movie.original_title + " image"}
                    />
                  </div>
                  <div className="card-body">
                    <h2 className="card-title">{movie.original_title}</h2>
                    <p className="card-text" style={{ textAlign: "justify" }}>
                      {movie.overview}
                    </p>
                  </div>
                </div>
              );
            })
          : "No hay peliculas"
          }
      </div>
    </div>
  );
}

export default Card_Component;
