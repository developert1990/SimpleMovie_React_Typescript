import React, { useState, useEffect, ChangeEvent } from 'react';
const Zoom = require('react-reveal/Zoom');

export const Main = () => {
    const USER_LS = "currentUser";
    const [name, setName] = useState(localStorage.getItem(USER_LS));
    const [timeString, setTimeString] = useState<string>('');
    const [randomNum, setRandomNum] = useState<number>(1);
    const [hasLocalStorage, setHasLocalStorage] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [weather, setWeather] = useState<string>("");
    const API_WEATHER_KEY = '015408c7b2ff4cc5a6b9d6332e145cf6';

    useEffect(() => {
        const storageValue = localStorage.getItem(USER_LS);
        if (storageValue) {
            return setHasLocalStorage(true);
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const date = now.toLocaleDateString();
            const time = now.toLocaleTimeString();
            setTimeString(`${date} ${time}`);
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, [])

    useEffect(() => {
        setRandomNum(Math.floor(Math.random() * 3 + 1));
        setIsLoading(true);
        navigator.geolocation.getCurrentPosition(async position => {
            const { latitude, longitude } = position.coords;
            const { place, weatherTemp, clouds } = await loadData(latitude, longitude);
            setWeather(`${place} ${weatherTemp} ${clouds}`);
            setIsLoading(false);
        }, error => {
            setErrorMessage(error.message);
            setIsLoading(false);
        });
    }, [])




    const loadData = async (latitude: number, longitude: number) => {
        console.log('loaddata 들어옴')
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_WEATHER_KEY}&units=metric`);
            const data = await response.json();
            const weatherTemp = data.main.temp;
            const place = data.name;
            const clouds = data.weather[0].description;
            return { weatherTemp, place, clouds };
        } catch (err) {
            console.error(err);
            return err;
        }
    }
    const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


    }


    const renderWeather = () => isLoading ? <div className="spinner" /> : <span className="js-weather">{weather}</span>;

    return (
        <Zoom left>
            <div className="main-screen" style={{ backgroundImage: `url(/images/${randomNum}.jpg)` }}>
                {errorMessage ? <span>{errorMessage}</span> : renderWeather()}
                <h1 className="current-time">
                    {timeString}
                </h1>
                {!hasLocalStorage && <form onSubmit={handleClick} className='welcome-form'>
                    <input type="text" placeholder="Write Your Name" className="input-name" onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
                </form>}

            </div>

        </Zoom>
    )
}
