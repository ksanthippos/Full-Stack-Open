import React, {useEffect, useState} from 'react'
import FindName from "./components/FindName";
import Display from "./components/Display";
import axios from "axios";

// OSA 2
// MAIDEN TIEDOT

const App = () => {

    const [countries, setCountries] = useState([])

    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ searchTerm, setSearchTerm] = useState('')
    const [ searchResults, setSearchResults ] = useState([])



    const handleNameChange = (event) => {
        const nameinput = event.target.value
        const found = countries.find(el => el.name === nameinput)

        if (found)
            alert('Name ' + nameinput + ' is already added to phonebook')
        else
            setNewName(nameinput)
    }


    const handleFindName = (event) => {
        setSearchTerm(event.target.value)
    }

    return (
        <div>
            Find countries:
            <FindName countries={countries} setSearchResults={searchResults}
                      handleFindName={handleFindName()} searchTerm={searchTerm} />
        </div>
    )
}

export default App
