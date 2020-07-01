import React from "react";
import personService from "../services/persons";


const AddPerson = ({persons, setPersons, setNewName, setNewNumber, newName, handleNameChange, newNumber, handleNumberChange}) => {

    const addPerson = (event) => {
        event.preventDefault()
        const personObj = {
            name: newName,
            number: newNumber,
        }

        // etsitään henkilö nimen perusteella
        const person = persons.find(p => p.name === newName)

        if (person) {
            if (window.confirm("Replace " + newName +  "'s number?")) {

                // kopio alkuperäisstä henkilöstä
                const updatedPerson = {...person, number: person.number = newNumber}

                personService
                    .update(person.id, updatedPerson)
                    .then(returnedPerson => {
                        setPersons(persons.map(person => person.id
                            ? person
                            : returnedPerson))
                    })

                // luettelon refresh vain päivitetyn henkilön osalta
                setPersons(persons.filter(n => n.id !== person.id))
            }
        }
        // luodaan uusi henkilö
        else {
            personService
                .create(personObj)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')
                })
        }
    }

    return (
        <div>
            <form onSubmit={addPerson}>
                <div>
                    name: <input value={newName} onChange={handleNameChange}/>
                </div>
                <div>
                    number: <input value={newNumber} onChange={handleNumberChange}/>
                </div>
                <div>
                    <button
                        type="submit">
                        add
                    </button>
                </div>
            </form>
        </div>
    )

}

export default AddPerson