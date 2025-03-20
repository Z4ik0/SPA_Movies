import React from 'react'
import Loading from './Loading'
import { useFetch } from './hooks/useFetch'



const API_URL = import.meta.env.VITE_API_URL
const API_ACCESS_TOKEN = import.meta.env.VITE_API_ACCESS_TOKEN
const IMAGE_PATH = import.meta.env.VITE_IMG_BASIC_PATH

function Card_Component() {

    const { data, isPending } = useFetch(API_URL, API_ACCESS_TOKEN);

    return (
        <div className='container' >
            <div className='row gap-1 justify-content-md-center'>
                {isPending ? <Loading></Loading> : ''}
                {data != null ? data.results.map((movie) => {
                    return (
                        <div className="card col-3"  key={movie.id} style={{ overflow: 'hidden' }}>
                            <div>
                                <img className='card-img-top' style={{ maxHeight: '100%' }} src={`${IMAGE_PATH}/${movie.backdrop_path}`} alt={movie.original_title + "image"} />
                            </div>
                            <div className="card-body">
                                <p className="card-title h3" style={{textAlign:'justify'}}>{movie.original_title}</p>
                                <p className="card-text scroll  " style={{ textAlign: 'justify', maxHeight: '200px',overflowY: 'auto' }}>{movie.overview}</p>
                            </div>
                        </div>
                    )
                }) : !isPending ? "No hay peliculas" : ""}
            </div>
        </div>
    )
}

export default Card_Component