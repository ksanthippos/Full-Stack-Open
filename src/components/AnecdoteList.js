import React from "react";
import { connect } from 'react-redux'
import {addVoteTo} from "../reducers/anecdoteReducer";
import {displayNotification} from "../reducers/notificationReducer";


const AnecdoteList = (props) => {

  return(
      <div>
        {props.anecdotes.sort(function (a, b) { // järjestys äänimäärän mukaan
          return b.votes - a.votes
        }).map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => {
                  props.addVoteTo(anecdote.id)
                  props.displayNotification(anecdote.content, 5000)
                }}
                >
                  vote
                </button>
              </div>
            </div>
        )}
      </div>
  )
}

const mapStateToProps = (state) => {
  if (state.filter === 'EMPTY') {
    return {
      anecdotes: state.anecdote
    }
  }
  else {
    return {
      anecdotes: state.anecdote.filter(a => a.content.includes(state.filter))
    }
  }
}

const mapDispatchToProps = {
  addVoteTo,
  displayNotification
}

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdotes
