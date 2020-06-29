import React, {useState} from "react";
import Country from "./Country";
import FullCountry from "./FullCountry";


const Display = ( {namesToShow}) => {


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
    else if (namesToShow.length === 1) {
        return (
            <div>
                {namesToShow.map((country, i) =>
                    <FullCountry key={i} country={country} />
                )}
            </div>
        )
    }

    // ehdokkaita 2 - 10 kpl
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