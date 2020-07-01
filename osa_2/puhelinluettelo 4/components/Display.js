import Person from "./Person";
import React from "react";

const Display = ( {searchNull, persons, setPersons, namesToShow}) => {

    if (searchNull) {
        return(
            <div>
                <ul>
                    {persons.map((person, i) =>
                        <Person
                            key={i}
                            person={person}
                            persons={persons}
                            setPersons={setPersons}
                        />
                    )}
                </ul>
            </div>
        )
    }
    else {
        return(
            <div>
                <ul>
                    {namesToShow.map((person, i) =>
                        <Person
                            key={i}
                            person={person}
                            persons={persons}
                            setPersons={setPersons}
                        />
                    )}
                </ul>
            </div>
        )
    }

}

export default Display