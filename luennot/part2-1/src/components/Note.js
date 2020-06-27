import React from "react";

const Note =({notes}) => {

    return (
        <div>
            {notes.map(note =>
                <li key={note.id}>
                    {note.content}
                </li>
            )}
        </div>
    )
}

export default Note