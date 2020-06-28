import React from "react";

const FindName = ({ setSearchNull, persons, setSearchResults, searchTerm, handleFindName }) => {

    // React valittaa tästä, eli ilmeisesti Apissa sijaitsevaa tilaa ei saisi muuttaa täältä toisesta komponentista.
    // Jouduin tällaisen purkkaviritelmän tekemään, koska muussa tapauksessa uuden henkilön lisääminen ei näkynyt listassa
    // vasta kun search-bariin kirjoittaa jotain. Lienee siis seurausta hankalalla tekniikalla toteutetulla searchilla, mutta
    // muutakaan kun ei saanut aikaiseksi. Viritelmän tarkoitus siis tarkistaa, onko searchi tyhjä ja jos on, renderöidään
    // ruudulle kaikki puhelinluettelon henkilöt suoraan persons-taulukosta. Eli Display-komponentti katselee tuota searchNull-tilaa
    if (searchTerm !== '')
        setSearchNull(false)
    else
        setSearchNull(true)

    React.useEffect(() => {
        const found = persons.filter(person =>
            person.name.toLowerCase().includes(searchTerm)
        )
        setSearchResults(found)
    }, [searchTerm])

    return (
        <form>
            <div>
                Filter by name:
                <input placeholder='Search:' value={searchTerm} onChange={handleFindName}/>
            </div>
        </form>
    )
}

export default FindName