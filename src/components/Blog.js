import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, user }) => {
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

    /*
    käyttäjän oltava kirjautuneena, jotta voi nähdä blogien yksityiskohdat ja lisätä myös
    tykkäyksiä. tätä toiminnallisuutta ei taidettu pyytää materiaalissa, mutta mielestäni se
    on loogista lisätä tähän kohtaan.
    */
    if (user === null) {
      setRemoveVisible(false)
      return
    }

    // tarkistetaan onko blogin lisääjän username sama kuin kirjautuneella käyttäjällä
    if (user.username !== blog.user.username) {
      setRemoveVisible(false)
    }
    else {
      setRemoveVisible(true)
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
    const updatedBlog = { ...blog, likes: ++blog.likes }
    blogService
      .update(blog.id, updatedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(b => b.id !== id ? b : returnedBlog))
      })
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
