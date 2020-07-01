import React from "react";


const AddPerson = ({persons, setPersons, setNewName, setNewNumber, newName, handleNameChange, newNumber, handleNumberChange}) => {

    const addPerson = (event) => {
        event.preventDefault()
        const noteObj = {
            name: newName,
            number: newNumber,
            id: persons.length + 1
        }

        setPersons(persons.concat(noteObj))
        setNewName('')
        setNewNumber('')

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