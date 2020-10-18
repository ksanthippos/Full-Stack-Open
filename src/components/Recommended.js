import React, { useEffect, useState } from 'react'
import { useApolloClient } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommended = ({ show, bookTrigger, setBookTrigger }) => {
  const [ books, setBooks ] = useState([])
  const [ user, setUser ] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const loadUser = async () => {
      const result = await client.query({ query: ME })
      setUser(result.data.me)
    }
    loadUser()
  }, [])

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
   }, [user])

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
   }, [bookTrigger])


  if (!show) {
    return null
  }

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