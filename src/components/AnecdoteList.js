import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {addVoteTo} from "../reducers/anecdoteReducer";
import {setNotification, removeNotification} from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdote }) => {
    if (filter === 'EMPTY') {
      return anecdote
    }
    else {
      return anecdote.filter(a => a.content.includes(filter))
    }
  })

  return(
      <div>
        {anecdotes.sort(function (a, b) { // järjestys äänimäärän mukaan
          return b.votes - a.votes
        }).map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => {
                  dispatch(setNotification(anecdote.content))
                  dispatch(addVoteTo(anecdote.id))
                  setTimeout(() => {
                    dispatch(removeNotification())
                  }, 5000)
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

export default AnecdoteList
