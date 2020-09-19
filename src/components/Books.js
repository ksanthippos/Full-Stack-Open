import React, { useEffect, useRef, useState } from 'react'

const Books = (props) => {
  const [showGenre, setShowGenre] = useState('all')
  const books = props.props

  if (!props.show) {
    return null
  }

  // eri genret taulukkoon ja tuplakappaleet pois
  const allGenres = books.map(b => b.genres)
  let subGenres = allGenres.flat()
  subGenres.push('all')
  const genres = [...new Set(subGenres)]

  // suodatus genren mukaan
  const filteredBooks = () => {
    if (showGenre === 'all') {
      return books
    }

    return books.filter(b => b.genres.includes(showGenre))
  }

  return (
    <div>
      <h2>books</h2>
      in genre: <b>{showGenre}</b>
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
      {genres.map(genre => 
        genre 
          ? <button onClick={() => {setShowGenre(genre)}}>{genre}</button>
          : null
      )}
    </div>
  )
}

/*             showGenre === 'all'
            ? <tr key={b.title}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            : null
              b.genres.includes(showGenre) 
              ? <tr key={b.title}>
                  <td>{b.title}</td>
                  <td>{b.author.name}</td>
                  <td>{b.published}</td>
                </tr>
              : null */

export default Books