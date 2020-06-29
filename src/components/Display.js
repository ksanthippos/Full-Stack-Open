import React, {useState} from "react";
import Country from "./Country";

const Display = ( {namesToShow}) => {

    // liian vähän tai liikaa ehdokkaita
    if (namesToShow.length === 0) {
        return (
            <div>
                No countries found.
            </div>
        )
    }
    else if (namesToShow.length > 10) {
        return (
            <div>
                Please specify another filter, too many countries found!
            </div>
        )
    }

    // ehdokkaita 2 - 10 kpl eli sopiva määrä
    return(
        <div>
            <ul>
                {namesToShow.map((country, i) =>
                    <Country key={i} country={country} />
                )}
            </ul>
        </div>
    )
}

export default Display