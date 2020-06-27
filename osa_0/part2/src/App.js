// juuri
import Note from "./components/Note";
import React from "react";

const App = ({notes}) => {

    return (
        <div>
            <h1>Notes</h1>
            <ul>
                <Note notes={notes} />
            </ul>
        </div>
    )
}

export default App