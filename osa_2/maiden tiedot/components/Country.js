import React, {useEffect, useState} from "react";
import axios from "axios";

const Country = ({ country }) => {

    const [weather, setWeather] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isVisible, setIsVisible] = useState(false)

    // datan nouto ja lataamisen asetus tilaksi
    useEffect(() => {
        async function getData() {

            const key = process.env.REACT_APP_WEATHER_API
            const url = `http://api.weatherstack.com/current?access_key=${key}&query=${country.capital}`

            try {
                const response = await axios.get(url);
                setWeather(response.data);
                setIsLoading(false)
            } catch (err) {
                setIsError(true)
                setIsLoading(false)
            }
        }
        getData();
    }, [country.capital]);

    // tarkistetaan onko show-namiskaa klikattu
    if (isVisible) {
        return isLoading ? <p>Loading...</p> : (
            <div>
                <h2>{country.name}</h2>
                <p>Capital: {country.capital}</p>
                <p>Population: {country.population}</p>
                <h3>Spoken languages:</h3>
                {country.languages.map(language =>
                    <li>
                        {language.name}
                    </li>
                )}
                <img src={country.flag} width="200" height="100" alt="country flag missing"/>
                <h3>Weather in {country.capital}:</h3>
                Temperature: {weather.current.temperature} <p/>
                <img src={weather.current.weather_icons} width="50" height="50" alt="weather symbol missing"/><p/>
                Wind: {weather.current.wind_speed} mph, direction {weather.current.wind_dir}
            </div>
        )
    }

    // maista näytetään vain nimi ja show-nappi
    return (
        <div>
            {country.name}
            <button onClick={() => setIsVisible(true)}>
                show
            </button>
        </div>
    )

}

export default Country