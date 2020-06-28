import React from "react";

const FindName = ({ countries, setSearchResults, searchTerm, handleFindName }) => {

/*    React.useEffect(() => {
        const found = countries.filter(country =>
            country.name.toLowerCase().includes(searchTerm)
        )
        setSearchResults(found)
    }, [searchTerm])*/

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