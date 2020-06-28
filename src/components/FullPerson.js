import React from "react";

const FullPerson = ({ person }) => {

    return (
        <div>
            <h2>{person.name}</h2>
            <p>Capital: {person.capital}</p>
            <p>Population: {person.population}</p>
            <p>Languages:</p>
            {person.languages.map(language =>
                <li>
                    {language.name}
                </li>
            )}
            <img src={person.flag} width="200" height="100" alt="country flag missing"/>
        </div>
    )
}

export default FullPerson