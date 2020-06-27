import React, {useState} from 'react';
import ReactDOM from 'react-dom';

// OSA 1
// ANEKDOOTIT

// anekdootit
const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

// annetut äänet
const points = new Uint8Array(anecdotes.length)

// random-luvun apufunktio
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// komponentit
const Button = ({onClick, text, anecdote}) => {

    if (anecdote === 0 && text === 'vote')  // estetään tyhjän anekdootin äänestäminen
        return (
            <div></div>
        )

    return (
        <button onClick={onClick}>
            {text}
        </button>
    )
}

const Display = ({anecdote}) => {

    if (anecdote === 0) {
        return (
           <div>
               <h3>Click above for an anecdote!</h3>
           </div>
        )
    }
    return (
        <div>
            <h3>{anecdote}</h3>
        </div>
    )
}

const Votes = ({votes, anecdote}) => {

    if (anecdote === 0) {   // ei näytetä äänestystuloksia, jos anekdoottia ei vielä näkyvissä
        return (
            <div></div>
        )
    }
    return (
        <div>
            <h3>Has {votes} votes</h3>
        </div>
    )
}

const MostVotes = ({array}) => {

    // suurin äänisaalis ja sen indeksi taulukossa
    let votes = Math.max.apply(0, array)
    let index = array.indexOf(votes)

    if (votes === 0) {
        return (
            <div></div>
        )
    }

    return (
        <div>
            <h3>Anecdote with most votes:</h3>
            {anecdotes[index]} <p/>
            ({votes} votes)
        </div>
    )
}

// juuri
const App = (props) => {

    // tilat
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(0)

    // satunnainen anekdootti, tallennetaan myös indeksi
    const handleClick = () => setSelected(anecdotes[getRndInteger(0, anecdotes.length - 1)])
    let index = anecdotes.indexOf(selected)

    /*
    en saanut äänen lisäämistä mitenkään pelittämään kopioimalla taulukkoa. ainakaan tällä tekniikalla
    kopion muokkaaminen ei vaikuta mitenkään alkuperäiseen points-taulukkoon ja ei kai pitäisikään.
    */
    const handleVote = () => setVotes(votes, points[index] += 1)
    console.log(points)

    return (
        <div>
            <Button onClick={handleClick} text='next anecdote' anecdote={selected} />
            <Button onClick={handleVote} text='vote' anecdote={selected}/>
            <Display anecdote={selected} />
            <Votes votes={points[index]} anecdote={selected} />
            <MostVotes array={points} />
        </div>
    )
}


ReactDOM.render(<App />, document.getElementById('root'));

