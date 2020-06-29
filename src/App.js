import React, {useEffect, useState} from 'react'
import FindName from "./components/FindName";
import Display from "./components/Display";
import axios from "axios";

// OSA 2
// MAIDEN TIEDOT 2.11 (step 6)

/*
Käytin tässä samaa koodipohjaa kuin puhelinluettelossa enkä (laiskuuttani) jaksanut refaktoroida
muuttujia countryiksi yms. Toiminnallisuus kuitenkin ok ja se kait pääasia.
*/

const App = () => {

    const [ countries, setCountries] = useState([])
    const [ searchTerm, setSearchTerm] = useState('')
    const [ searchResults, setSearchResults ] = useState([])

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all?fields=name;capital;population;languages;flag')
            .then(response => {
                setCountries(response.data)
            })
    }, [])


    const handleFindName = (event) => {
        setSearchTerm(event.target.value)
    }

    return (
        <div>
            <h1>Country info app</h1>
            <FindName countries={countries} setSearchResults={setSearchResults}
                      searchTerm={searchTerm} handleFindName={handleFindName} />
            <Display namesToShow={searchResults} />
        </div>
    )
}

export default App
