import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVoteTo, addNewAnecdote } from "./reducers/anecdoteReducer";
import Anecdotes from './components/Anecdotes'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const addNew = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(addNewAnecdote(content))
  }

  return (
    <div>
      <Anecdotes />
      <h2>create new</h2>
      <form onSubmit={addNew}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App