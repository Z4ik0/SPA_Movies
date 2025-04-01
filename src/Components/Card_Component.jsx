import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const IMAGE_PATH = import.meta.env.VITE_IMG_BASIC_PATH;

function Card_Component({ data }) {
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <div className="container py-5" style={{ background: "linear-gradient(to bottom, black, red)" }}>
      <div className="row g-4 justify-content-center">
        {Array.isArray(data) && data.length > 0 ? (
          data.map((movie) => {
            const shortOverview =
              movie.overview.length > 100
                ? movie.overview.substring(0, 100) + "..."
                : movie.overview;

            return (
              <div
                className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex"
                key={movie.id}
              >
                <div
                  className="card h-100 shadow-lg border-0 rounded-4 text-white w-100"
                  style={{
                    backgroundColor: "black",
                    border: "2px solid transparent",
                    transition: "transform 0.3s ease, border 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.border = "2px solid red";
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.border = "2px solid transparent";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <img
                    className="card-img-top rounded-top"
                    style={{ height: "300px", objectFit: "cover", padding: "12px", borderBottom: "2px solid red" }}
                    src={`${IMAGE_PATH}/${movie.poster_path}`}
                    alt={movie.original_title}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-warning text-center">{movie.original_title}</h5>
                    <p className="card-text flex-grow-1 text-center">{shortOverview}</p>
                    <button
                      className="btn btn-danger btn-sm mt-auto"
                      data-bs-toggle="modal"
                      data-bs-target="#movieModal"
                      onClick={() => setSelectedMovie(movie)}
                    >
                      Ver más
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-danger fs-4">❌ No hay películas disponibles</p>
        )}
      </div>

      {/* Modal de Bootstrap */}
      <div
        className="modal fade"
        id="movieModal"
        tabIndex="-1"
        aria-labelledby="movieModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content bg-dark text-white">
            <div className="modal-header">
              <h5 className="modal-title text-warning" id="movieModalLabel">
                {selectedMovie?.original_title}
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body d-flex flex-column align-items-center">
              {selectedMovie && (
                <>
                  <img
                    src={`${IMAGE_PATH}/${selectedMovie.poster_path}`}
                    alt={selectedMovie.original_title}
                    className="img-fluid rounded mb-3"
                    style={{ maxHeight: "400px", objectFit: "cover" }}
                  />
                  <p className="text-light text-center">{selectedMovie.overview}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card_Component;
