import React from "react";
import "./Card.css";

const IMAGE_PATH = import.meta.env.VITE_IMG_BASIC_PATH;

function Card_Component({ data }) {
  return (
    <div className="container py-5" style={{ background: "linear-gradient(to bottom, black, red)" }}>
      <div className="row gap-5 justify-content-md-center">
        {data != null
          ? data.map((movie) => {
            return (
              <div
                className="card col-3"
                key={movie.id}
                style={{
                  backgroundColor: "black", 
                  border: "2px solid transparent", 
                  borderRadius: "15px", 
                  overflow: "hidden", 
                  transition: "border 0.3s ease-in-out", 
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.border = "2px solid red"; 
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.border = "2px solid transparent"; 
                }}
              >
                <div>
                  <img
                    className="card-img-top"
                    style={{
                      maxHeight: "100%",
                      padding: "12px",
                      borderBottom: "2px solid red", 
                    }}
                    src={`${IMAGE_PATH}/${movie.poster_path}`}
                    alt={movie.original_title + " image"}
                  />
                </div>
                <div className="card-body text-white">
                  <h2 className="card-title">{movie.original_title}</h2>
                  <div
                    className="card-text scroll"
                    style={{
                      textAlign: "justify",
                      maxHeight: "100px", 
                      overflowY: "scroll", 
                      paddingRight: "8px", 
                    }}
                  >
                    {movie.overview}
                  </div>
                </div>
              </div>
            );
          })
          : "No hay películas"
        }
      </div>
    </div>
  );
}

export default Card_Component;
