import React, {useEffect, useState} from 'react'
import FindName from "./components/FindName";
import Display from "./components/Display";
import axios from "axios";

// OSA 2
// MAIDEN TIEDOT
// tehtävät 2.12-2.14


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
