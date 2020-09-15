import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries'


const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ updateAuthor ] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  if (!props.show) {
    return null
  }
  const authors = props.props

  const submit = async (event) => {
    event.preventDefault()

    updateAuthor({ variables: { name, born } })
    
    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born ? a.born : '?'}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>   
      <p/>
      <div>
        <h2>update author born year</h2>
        <form onSubmit={submit}>
          <div>
            author name
            <input 
              value={name}
              onChange={( { target }) => setName(target.value)}
            />
          </div>
          <div>
            born in year
            <input 
              type='number'
              value={born}
              onChange={({ target }) => setBorn(Number(target.value))}
            />
          </div>
          <button type='submit'>update</button>
        </form>
      </div>      
    </div>
  )
}

export default Authors
