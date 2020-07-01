import React, { useState } from 'react'
import AddPerson from "./components/AddPerson";
import FindName from "./components/FindName";
import Display from "./components/Display";

// OSA 2
// PUHELINLUETTELO
// tehtävät 2.6-2.10

const App = () => {

    const [ persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '040072677', id: 1},
        {name: 'Kalle Kustaa Korkki', number: '(secret)', id: 2},
        {name: 'Pelle Miljoona', number: '1000000', id: 3}
    ])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ searchTerm, setSearchTerm] = useState('')
    const [ searchResults, setSearchResults ] = useState([])

    const [ searchNull, setSearchNull] = useState(true)

    const handleNameChange = (event) => {
        const nameinput = event.target.value
        const found = persons.find(el => el.name === nameinput)

        if (found)
            alert('Name ' + nameinput + ' is already added to phonebook')
        else
            setNewName(nameinput)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFindName = (event) => {
        setSearchTerm(event.target.value)
    }

    return (
        <div>
            <h1>Phonebook</h1>
            <FindName setSearchNull={setSearchNull} persons={persons} setSearchResults={setSearchResults}
                      searchTerm={searchTerm} handleFindName={handleFindName} />
            <h2>Add new</h2>
            <AddPerson namesToShow={searchResults} persons={persons} setPersons={setPersons} setNewName={setNewName} newName={newName} handleNameChange={handleNameChange}
                       newNumber={newNumber} setNewNumber={setNewNumber} handleNumberChange={handleNumberChange} />
            <h2>Numbers</h2>
            <Display searchNull={searchNull} persons={persons} namesToShow={searchResults} />
            ...
        </div>
    )
}

export default App
