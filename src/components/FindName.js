import React from "react";

const FindName = ({ persons, setSearchResults, searchTerm, handleFindName }) => {


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