import React from 'react'
import Loading from './Loading'
// import { useFetch } from './hooks/useFetch'
import "./Card.css"

// const API_URL = import.meta.env.VITE_API_URL
// const API_ACCESS_TOKEN = import.meta.env.VITE_API_ACCESS_TOKEN
 const IMAGE_PATH = import.meta.env.VITE_IMG_BASIC_PATH

function Card_Component({ data, isPending }) {

    // console.log(API_URL, API_ACCESS_TOKEN)
    // const { data, isPending } = useFetch(API_URL, API_ACCESS_TOKEN);
    
    return (
        <div className='container'>
            <div className='row gap-4  justify-content-md-center'>
                {isPending ? <Loading></Loading> : ''}
                {data != null ? data.results.map((movie) => {
                    return (
                        <div className="card col-3"  key={movie.id} style={{ overflow: 'hidden' }}>
                            <div>
                                <img className='card-img-top' style={{ maxHeight: '100%' }} src={`${IMAGE_PATH}/${movie.backdrop_path}`} alt={movie.original_title + " image"} />
                            </div>
                            <div className="card-body">
                                <h2 className="card-title">{movie.original_title}</h2>
                                <p className="card-text" style={{ textAlign: 'justify' }}>{movie.overview}</p>
                            </div>
                        </div>
                    )
                }) : !isPending ? "No hay peliculas" : ""}
            </div>
        </div>
    )
}

export default Card_Component