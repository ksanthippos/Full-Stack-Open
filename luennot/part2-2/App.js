// juuri
import React, {useState} from "react";
import Note from "./components/Note";

const App = (props) => {
    const [notes, setNotes] = useState(props.notes)
    const [newNote, setNewNote] = useState('a new note...')
    const [showAll, setShowAll] = useState(true)

    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() > 0.5,
            id: notes.length + 1,
       }

        setNotes(notes.concat(noteObject))
        setNewNote('')
    }

    const handleNoteChange = (event) => {
        setNewNote(event.target.value)
    }

    const notesToShow = showAll ? notes : notes.filter(note => note.important)

    return (
        <div>
            <h1>Notes</h1>
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all' }
                </button>
            </div>
            <ul>
                {notesToShow.map((note, i) =>
                    <Note key={i} note={note} />
                )}
                {/*
                jos luuppaus hoidettaisiin Noten puolella, menee näin ja täällä vain annettaisiin
                arvo eteenpäin malliin <Note notes={notes} />. toimii kummin päin vaan
                {notes.map(note =>
                    <li>
                        <Note key={note.id} notes={notes} />
                    </li>
                )}
                */}
            </ul>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange}/>
                <button type="submit">save</button>
            </form>
        </div>
    )
}

export default App