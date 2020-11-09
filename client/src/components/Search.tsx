import React, { useRef, useEffect, useState, ChangeEvent } from 'react';
import { Movie } from './Movie';
import { MovieProps } from './Movie';
const Jump = require('react-reveal/Jump');

export interface MoiveInfo {
    id: number;
    medium_cover_image: string;
    genres: string[];
    title: string;
    summary: string;
    language: string;
    year: number;
}

export const Search = () => {
    const searchInput = useRef<HTMLInputElement>(null);
    const [movieArray, setMovieArray] = useState<MoiveInfo[]>([]);
    const URL = "http://localhost:7777/movie/";

    const titleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === '') {
            setMovieArray([]);
        } else {
            const newInputTitle = e.target.value;
            const path = `${URL}findMoviesByTitle/${newInputTitle}`;
            try {
                const response = await fetch(path);
                const data = await response.json();
                setMovieArray(data.data);
            } catch (error) {
                console.log(error);
            }
        }
    }

    const yearChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === '') {
            setMovieArray([]);
        } else {
            const newInputYear = e.target.value;
            const path = `${URL}findMoviesByYear/${newInputYear}`;
            try {
                const response = await fetch(path);
                const data = await response.json();

                console.log(data);
                setMovieArray(data.data);
            } catch (error) {
                console.log(error);
            }
        }
    }

    const genreChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const newInputGenre = e.target.value;
        const path = `${URL}findMoviesByGenre/${newInputGenre}`;
        const response = await fetch(path);
        const data = await response.json();
        setMovieArray(data.data);
    }

    useEffect(() => {
        searchInput.current?.focus();
    }, [])

    return (
        <div className="search-section">
            <Jump>
                <div className="search-movies">
                    <h1>Search Menu</h1>
                    <div className="search-bar">
                        <label>Title: </label>
                        <input type="text" onChange={titleChange} ref={searchInput} />
                    </div>
                    <div className="search-bar">
                        <label>Year: </label>
                        <input type="text" onChange={yearChange} />
                    </div>
                    <div className="search-bar">
                        <label>Genre: </label>
                        <input type="text" onChange={genreChange} />
                    </div>
                </div>
            </Jump>
            {/* <Movie default1={movieArray} inputTitle={movieArray} inputYear={movieArray} inputGenre={movieArray} /> */}
            <Movie movieArray={movieArray} />
        </div>
    )
}
