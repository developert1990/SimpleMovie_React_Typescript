import React, { useState } from 'react';
import { data } from '../data/movie2';

interface movieInfoType {
    title: string;
    rating: number;
    runtime: number;
    genres: string[];
    summary: string;
}

export const Movie2 = () => {
    const moviesData = data.movies;
    console.log(moviesData);
    const [movieInfo, setMovieInfo] = useState<movieInfoType>();

    return (
        <div className="moreMovie-section">
            {
                moviesData.map((movie) => {
                    return (
                        <div className="movie-information" key={movie?.id}>

                            <img src={movie?.medium_cover_image} alt="movies" />
                            <div className="moreMovie-detail">
                                <h2>{movie?.title} · {movie?.rating}<span role="img" aria-label="star">⭐</span></h2>
                                <h4>{movie?.genres.join(', ')} · {movie?.runtime} mins</h4><br></br>
                                <h4>{movie?.summary}</h4>
                            </div>

                        </div>
                    )
                })
            }
        </div >
    )
}
