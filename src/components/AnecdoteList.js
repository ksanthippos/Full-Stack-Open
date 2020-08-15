import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {addVoteTo} from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdote)
  const dispatch = useDispatch()

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
                <button onClick={() =>
                    dispatch(addVoteTo(anecdote.id))}
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
