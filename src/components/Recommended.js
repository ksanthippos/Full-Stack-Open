import React from 'react'

const Recommended = (props) => {
  const books = props.books
  const user = props.user

  if (!props.show) {
    return null
  }

  // suodatus genren mukaan
  const filteredBooks = () => {
    return books.filter(b => b.genres.includes(user.favoriteGenre))
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
          {filteredBooks().map(b =>
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