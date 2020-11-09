import React, { useState, useEffect, useRef, FormEvent, ChangeEvent } from 'react'
const Rotate = require('react-reveal/Rotate');

interface movieType {
    id: number;
    title: string;
}

export const MovieList = () => {
    const LIST_LS = 'movieList';
    const [movieList, setMovieList] = useState<movieType[]>([]);
    const [movie, setMovie] = useState<movieType>();

    const [inputValue, setInputValue] = useState('');
    const focusInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
        loadList();
        focusInput.current?.focus();
    }, []);

    useEffect(() => {
        saveToLocal(movieList);
        focusInput.current?.focus();
    }, [movieList]);



    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (movie !== undefined) {
            setMovieList([...movieList, movie]);
        }
        setInputValue('');
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputTitle = e.target.value;
        console.log(inputTitle);
        setInputValue(inputTitle);
        setMovie({
            id: new Date().valueOf(),
            title: inputTitle,
        });
    }

    const loadList = () => {
        // localStorage에서 데이터 받아올때 앞에 String 써줘야 한다.
        setMovieList(JSON.parse(String(localStorage.getItem(LIST_LS))));
    }

    const saveToLocal = (movieList: movieType[]) => {
        localStorage.setItem(LIST_LS, JSON.stringify(movieList));
    }

    const handleDelete = (e: React.MouseEvent) => {
        const newMovieList = movieList.filter((movie) => {
            return movie.id !== parseInt(e.currentTarget.id);
        });
        setMovieList(newMovieList);
    }

    return (
        <Rotate top left>
            <div className="movieList-section">
                <h1>Movie Lists</h1>
                <form className="mymovie-form" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Write a movie to watch" onChange={handleChange} value={inputValue} ref={focusInput} />
                </form>
                <ul className="movie-list">
                    {movieList.map((movie, index) =>
                        <li key={index}>
                            <i className="far fa-square"></i>

                            {movie.title}
                            <button onClick={handleDelete} id={String(movie.id)}>
                                <span role="img" aria-label="cancel" style={{ pointerEvents: 'none' }}>❌</span>
                            </button>
                        </li>
                    )}

                </ul>
            </div>
        </Rotate>
    )
}
