import React, {useEffect, useState} from 'react'
import AddPerson from "./components/AddPerson";
import FindName from "./components/FindName";
import Display from "./components/Display";
import axios from "axios";

// OSA 2
// PUHELINLUETTELO 2.11 (step 6)

/*
Käytin tässä samaa koodipohjaa kuin puhelinluettelossa enkä (laiskuuttani) jaksanut refaktoroida
muuttujia countryiksi yms. Toiminnallisuus kuitenkin ok ja se kait pääasia.
*/

const App = () => {

    const [ persons, setPersons] = useState([])
    const [ searchTerm, setSearchTerm] = useState('')
    const [ searchResults, setSearchResults ] = useState([])

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all?fields=name;capital;population;languages;flag')
            .then(response => {
                setPersons(response.data)
                console.log(response.data)
            })
    }, [])

    const handleFindName = (event) => {
        setSearchTerm(event.target.value)
    }

    return (
        <div>
            <h1>Country DB</h1>
            <FindName persons={persons} setSearchResults={setSearchResults}
                      searchTerm={searchTerm} handleFindName={handleFindName} />
            <h2>Countries</h2>
            <Display persons={persons} namesToShow={searchResults} />
            ...
        </div>
    )
}

export default App
