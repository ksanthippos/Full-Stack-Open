import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK } from '../queries'


const NewBook = ({ show, authors, bookTrigger, setBookTrigger }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [ createBook ] = useMutation(CREATE_BOOK, {
    refetchQueries: [ { query: ALL_BOOKS }, { query: ALL_AUTHORS }]
  })

  if (!show)
    return null

  const submit = async (event) => {
    event.preventDefault()
    
    createBook({ variables: {title, author, published, genres }})
    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')

    setBookTrigger(!bookTrigger)
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <select value={author} onChange={({ target }) => setAuthor(target.value)}>
              <option>--choose name--</option>
              {authors.map(a =>               
                <option key={a.name} value={a.name}>
                  {a.name}
                </option>
                )}
            </select>
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(Number(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook