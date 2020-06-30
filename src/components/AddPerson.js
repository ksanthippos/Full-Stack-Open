import React from "react";
import personService from "../services/persons";


const AddPerson = ({persons, setPersons, setNewName, setNewNumber, newName, handleNameChange, newNumber, handleNumberChange}) => {



    const addPerson = (event) => {
        event.preventDefault()
        const personObj = {
            name: newName,
            number: newNumber,
        }

        const found = persons.find(person => person.name === newName)

        if (found) {
            if (window.confirm("Replace " + newName +  "'s number?")) {

                console.log("Updated number")
                const person = persons.find(p => p.name === newName)
                const updatedPerson = {...person}

                personService
                    .update(person.id, updatedPerson)
                    .then(returnedPerson => {
                        setPersons(persons.map(person => person.id
                            ? person
                            : returnedPerson))
                    })
            }
        }
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