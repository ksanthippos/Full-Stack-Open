import React, { useState } from 'react'

const Blog = ({ blog, user, addLike, deleteBlog }) => {
  const [blogVisible, setBlogVisible] = useState(false)
  const [removeVisible, setRemoveVisible] = useState(false)

  // tyylit
  const likedStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderColor: 'green',
    borderWidth: 2,
    marginBottom: 5
  }

  const normalStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const deleteStyle = {
    color: 'red'
  }

  // handlerit
  const visibleHandler = () => {

    // tarkistetaan onko blogin lisääjän username sama kuin kirjautuneella käyttäjällä
    if (user !== null) {
      if (user.username !== blog.user.username) {
        setRemoveVisible(false)
      } else {
        setRemoveVisible(true)
      }
    }

    // bloginäkymän view/hide-toiminnallisuus
    if (blogVisible) {
      setBlogVisible(false)
    }
    else {
      setBlogVisible(true)
    }
  }

  const likeHandler = () => {
    addLike(blog)
  }

  const deleteHandler = () => {
    deleteBlog(blog)
  }

  // näkymä
  return (
    <div>
      { blogVisible ?
        <div style={likedStyle}>
          {blog.title}
          <button onClick={visibleHandler}>
            hide
          </button>
          <p/>
          {blog.author} <p/>
          {blog.url} <p/>
          likes: {blog.likes}
          <button onClick={likeHandler}>
            like
          </button>
          <p/>
          { removeVisible ?
            <button onClick={deleteHandler} style={deleteStyle}>
              remove blog
            </button> :
            null
          }
        </div> :
        <div style={normalStyle}>
          {blog.title} by: {blog.author}
          <button onClick={visibleHandler}>
            view
          </button>
        </div>
      }
    </div>
  )
}

export default Blog
