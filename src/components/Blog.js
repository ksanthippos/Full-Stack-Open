import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, user, addLike }) => {
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

  const likeHandler = (id) => {
    addLike(blog)
  }

  const deleteHandler = (id) => {
    if (window.confirm(`Confirm delete blog: ${blog.title}`))
    {
      blogService
        .remove(id)
        .then(() => {
          blogService // näkymän päivitys
            .getAll()
            .then(returnedBlogs => {
              setBlogs(returnedBlogs)
            })
        })
    }
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
          <button onClick={likeHandler.bind(null, blog.id)}>
            like
          </button>
          <p/>
          { removeVisible ?
            <button onClick={deleteHandler.bind(null, blog.id)} style={deleteStyle}>
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
