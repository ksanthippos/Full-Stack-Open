import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'


const App = () => {
  const [page, setPage] = useState('authors')
  
  const resultA = useQuery(ALL_AUTHORS)
  const resultB = useQuery(ALL_BOOKS)

  if (resultA.loading || resultB.loading) {
    return(
      <div>
        loading..
      </div>
    )
  }

  const authors = resultA.data.allAuthors
  const books = resultB.data.allBooks

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'}
        props={authors}
      />

      <Books
        show={page === 'books'}
        props={books}
      />

      <NewBook
        show={page === 'add'}
      />

    </div>
  )
}

export default App