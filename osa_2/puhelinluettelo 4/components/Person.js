import React from "react";
import personService from "../services/persons";

const Person = ({ person, setPersons }) => {

    const handleDelete = () => {
        if (window.confirm("Delete " + person.name + " from contacts?")) {
            personService
                .deletePerson(person.id)
                .then(() => {
                    // päivitetään näkymä
                    personService
                        .getAll()
                        .then(returnedPersons => {
                            setPersons(returnedPersons)
                        })
                })
        }
    }

    return (
        <div>
            <li className='person'>
                {person.name} : {person.number}
                <button onClick={handleDelete}>
                    delete
                </button>
            </li>
        </div>
    )
}

export default Person