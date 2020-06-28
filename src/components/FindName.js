import React from "react";

const FindName = ({ setSearchNull, persons, setSearchResults, searchTerm, handleFindName }) => {

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
                Filter shown with:
                <input placeholder='Search by name:' value={searchTerm} onChange={handleFindName}/>
            </div>
        </form>
    )
}

export default FindName