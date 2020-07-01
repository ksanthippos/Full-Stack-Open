import React from "react";
import Country from "./Country";

const Display = ( {namesToShow}) => {

    /*
    En saanut ohjelmaa toimimaan aivan halutulla tavalla: Kun hakuehtoja on ruudulla 1 kpl, käyttäjän on klikattava show-
    nappia nähdäkseen tiedot. Ruudulle myös renderöityy muut jäljellä olevat hakuehdot, jotka olivat mukana samassa haussa.
    Ei siis aivan maaliin, mutta melkein.

    Hakuehtojen rajaaminen yhteen pitäisi varmaan tehdä tässä komponentissa, mutta jostain syystä en saanut välitettyä siitä
    tietoa/tilaa eteenpäin Country-komponentille.
    * */

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