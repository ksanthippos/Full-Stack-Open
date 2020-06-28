import Person from "./Person";
import FullPerson from "./FullPerson";
import React from "react";

const Display = ( {namesToShow}) => {

    if (namesToShow.length > 10) {
        return (
            <div>
                Please specify another filter, too many countries found!
            </div>
        )
    }
    else if (namesToShow.length === 0) {
        return (
            <div>
                No countries found.
            </div>
        )
    }
    else if (namesToShow.length === 1) {
        return (
            <div>
                {namesToShow.map((person, i) =>
                    <FullPerson key={i} person={person} />
                )}
            </div>
        )
    }

    // countries found in range of 2 ... 10
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

export default Display