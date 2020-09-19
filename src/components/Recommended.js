import React, { useEffect, useState } from 'react'
import { useApolloClient } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommended = (props) => {
  // const books = props.books
  // const user = props.user
  // const username = user.username
  const [ books, setBooks ] = useState([])
  const [ user, setUser ] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const loadUser = async () => {
      const result = await client.query({ query: ME })
      setUser(result.data.me)
    }
    loadUser()
  }, [client])

  useEffect(() => { 
    if (user) {      
      const loadData = async () => {
        const result = await client.query({
          query: ALL_BOOKS, 
          variables: { genre: user.favoriteGenre }
        })
        setBooks(result.data.allBooks)
      }
      loadData()    
    }
   }, [user, client])


  if (!props.show) {
    return null
  }

  // genren suodatus komponentissa, ei bäkkärissä
/*   const filteredBooks = () => {
    return books.filter(b => b.genres.includes(user.favoriteGenre))
  } */

  return (
    <div>
      <h2>recommendedations</h2>
      books in your favorite genre <b>{user.favoriteGenre}:</b>
      <p/>
      <table>
        <tbody>
          <tr>
            <th>
              title
            </th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
            {books.map(b =>
            <tr>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}


export default Recommended