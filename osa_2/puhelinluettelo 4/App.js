import React, {useEffect, useState} from 'react'
import AddPerson from "./components/AddPerson";
import FindName from "./components/FindName";
import Display from "./components/Display";
import Notification from "./components/Notification";
import personService from "./services/persons"

// OSA 2
// PUHELINLUETTELO 2.16

const App = () => {

    const [ persons, setPersons] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ searchTerm, setSearchTerm] = useState('')
    const [ searchResults, setSearchResults ] = useState([])
    const [ searchNull, setSearchNull] = useState(true)
    const [errorMessage, setErrorMessage] = useState('an error occurred')

    useEffect(() => {
        personService
            .getAll()
            .then(returnedPersons => {
                setPersons(returnedPersons)
            })
    }, [])


    const handleNameChange = (event) => {
        const nameinput = event.target.value
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
            <FindName setSearchNull={setSearchNull}
                      persons={persons}
                      setSearchResults={setSearchResults}
                      searchTerm={searchTerm}
                      handleFindName={handleFindName}
            />
            <h2>Add new</h2>
            <AddPerson namesToShow={searchResults}
                       persons={persons}
                       setPersons={setPersons}
                       setNewName={setNewName}
                       newName={newName}
                       handleNameChange={handleNameChange}
                       newNumber={newNumber}
                       setNewNumber={setNewNumber}
                       handleNumberChange={handleNumberChange}
            />
            <h2>Numbers</h2>
            <Display searchNull={searchNull}
                     persons={persons}
                     setPersons={setPersons}
                     namesToShow={searchResults}
            />
            ...
        </div>
    )
}

export default App
