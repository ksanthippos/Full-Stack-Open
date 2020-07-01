import Person from "./Person";
import React from "react";

const Display = ( {searchNull, persons, namesToShow}) => {

    if (searchNull) {
        return(
            <div>
                <ul>
                    {persons.map((person, i) =>
                        <Person key={i} person={person} />
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
                        <Person key={i} person={person} />
                    )}
                </ul>
            </div>
        )
    }

}

export default Display