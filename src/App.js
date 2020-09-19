import React, { useState } from 'react'
import { useApolloClient, useQuery } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommended from './components/Recommended'
import { ALL_AUTHORS, ALL_BOOKS, ME } from './queries'


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  
  const resultA = useQuery(ALL_AUTHORS)
  const resultB = useQuery(ALL_BOOKS)
  const resultU = useQuery(ME)
  const client = useApolloClient()

  if (resultA.loading || resultB.loading) {
    return(
      <div>
        loading..
      </div>
    )
  }

  if (!token) {
    return (
      <div>        
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
        />
      </div>
    )
  }

  const authors = resultA.data.allAuthors
  const books = resultB.data.allBooks
  const user = resultU.data.me

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.clearStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommended')}>recommendations</button>
        <button onClick={logout}>logout</button>
      </div>

      <Authors
        show={page === 'authors'}
        authors={authors}
      />

      <Books
        show={page === 'books'}
        books={books}
      />

      <NewBook
        show={page === 'add'}
      />

      <Recommended 
        show={page === 'recommended'}
        books={books}
        user={user}
      />
    </div>
  )
}

export default App