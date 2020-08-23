import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from 'react-redux'
import {addVoteTo} from "../reducers/anecdoteReducer";
import {displayNotification} from "../reducers/notificationReducer";

const AnecdoteList = (props) => {
  const dispatch = useDispatch()

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
                  dispatch(addVoteTo(anecdote.id))
                  dispatch(displayNotification(anecdote.content, 5000))
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

const ConnectedAnecdotes = connect(mapStateToProps)(AnecdoteList)

export default ConnectedAnecdotes
