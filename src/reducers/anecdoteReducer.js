// alkuarvot
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

// varsinainen reduceri
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
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

// exportit
export const addVoteTo = (id) => {
  return {
    type: 'ADD_VOTE',
    data: { id }
  }
}

export const addNewAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      content,
      votes: 0,
      id: getId()
    }
  }
}

export default reducer