import React, {useEffect, useState} from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link,
  useParams, Redirect
} from 'react-router-dom'
import { useField } from "./hooks";


const AnecdoteList = ({ anecdotes }) => {

  return(
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote =>
      <li key={anecdote.id} >
        <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
      </li>)}
    </ul>
  </div>
  )
}

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find(a => a.id === id)
  return(
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <div>Votes: {anecdote.votes}</div>
      <div>For more info see: <a href={anecdote.info}>{anecdote.info}</a></div>
      <p/>
    </div>
  )
}


const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
    Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
    such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const content = useField('content')
  const author = useField('author')
  const info = useField('info')

  content.reset(false)
  author.reset(false)
  info.reset(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
  }

  const handleReset = () => {
    content.reset(true)
    author.reset(true)
    info.reset(true)
  }

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type="submit">Create</button>
        <button type="reset" onClick={handleReset}>Reset</button>
      </form>
    </div>
  )
}

const Notification = ({ notification }) => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notification === null) {
    return null
  }

  else {
    return (
        <div style={style}>
          { notification }
        </div>
    )
  }
}

const App = () => {
  const padding = {
    paddingRight: 5
  }
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    },
  ])

  const [notification, setNotification] = useState(null)
  const [redirect, setRedirect] = useState(false) // oma tila tarkkailemaan uudelleenohjauksen tarvetta

  // resetoidaan uudelleenohjauksen tarve aina, kun anekdoottien lista päivitetään (= luotu uusi anekdootti)
  useEffect(() => {
    setRedirect(false)
  }, [anecdotes])

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setRedirect(true)
    setNotification(`a new anecdote ${anecdote.content} created!`)
    setTimeout(() => setNotification(null), 10000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  // juuren route viimeiseksi listaan, muuten muut eivät toimi!
  return (
    <Router>
      <div>
        <Link style={padding} to="/anecdotes">anecdotes</Link>
        <Link style={padding} to="/create">create new</Link>
        <Link style={padding} to="/about">about</Link>
      </div>
      <h1>Software anecdotes</h1>
      <Notification notification={notification} setNotification={setNotification} />
      <Switch>
        <Route path="/anecdotes/:id">
          <Anecdote anecdotes={anecdotes} />
        </Route>
        <Route path="/anecdotes">
          <AnecdoteList anecdotes={anecdotes} redirect={redirect} setRedirect={setRedirect} />
        </Route>
        <Route path="/create">
          {redirect ? <Redirect to="/anecdotes" /> : <CreateNew addNew={addNew} /> }
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>
      <Footer />
    </Router>
  )
}

export default App;
