import React from "react";
import { connect } from 'react-redux'
import {addNewAnecdote} from "../reducers/anecdoteReducer";

const AnecdoteForm = (props) => {

  const addNew = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.addNewAnecdote(content)
  }

  return(
      <div>
        <h2>create new</h2>
        <form onSubmit={addNew}>
          <div><input name="anecdote"/></div>
          <button type="submit">create</button>
        </form>
      </div>
  )
}

const mapStateToProps = () => {}

const mapDispatchToProps = {
  addNewAnecdote
}

const ConnectedAnecdotes = connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdotes