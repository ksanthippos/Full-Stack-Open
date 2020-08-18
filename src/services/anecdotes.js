import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const newObj = { content, votes: 0 }
  const response = await axios.post(baseUrl, newObj)
  return response.data
}

const addVote = async (id) => {
  const allAnecdotes = await axios.get(baseUrl)
  const voteTarget = allAnecdotes.data.find(a => a.id === id)
  const votedAnecdote = {...voteTarget, votes: voteTarget.votes + 1}

  const response = await axios.put(`${baseUrl}/${id}`, votedAnecdote)
  return response.data
}

export default { getAll, createNew, addVote }