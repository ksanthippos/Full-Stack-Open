import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {addVoteTo} from "../reducers/anecdoteReducer";

const Anecdotes = ({ anecdote, handleClick }) => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  return(
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort(function (a, b) {
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

export default Anecdotes
