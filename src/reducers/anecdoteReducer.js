import noteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    case 'ADD_VOTE':
      const id = action.data.id
      const voteTarget = state.find(a => a.id === id) // etsitään äänestettävä
      const currentVotes = voteTarget.votes  // nykyiset äänet
      const votedAnecdote = { // luodaan uusi anekdootti, jolla yksi ääni enemmän
        ...voteTarget,
        votes: currentVotes + 1
      }
      return state.map(a =>
        a.id !== id ? a : votedAnecdote
      )
    default:
      return state
  }
}


export const addVoteTo = (id) => {
  return async dispatch => {
    const anecdote = await noteService.addVote(id)
    dispatch({
      type: 'ADD_VOTE',
      data: anecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch =>{
    const anecdotes = await noteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const addNewAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await noteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export default anecdoteReducer