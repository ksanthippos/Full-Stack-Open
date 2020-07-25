import React, {useEffect, useState} from 'react'
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

  // handlerit
  const visibleHandler = () => {
    if (blogVisible) {
      setBlogVisible(false)
    }
    else {
      if (user.id !== blog.user.id) {
        setRemoveVisible(false)
      }

      setRemoveVisible(true)
      setBlogVisible(true)
    }
  }

  const likeHandler = (id) => {
    const updatedBlog = { ...blog, likes: ++blog.likes}
    blogService
        .update(blog.id, updatedBlog)
        .then(returnedBlog => {
          setBlogs(blogs.map(b => b.id !== id ? b : returnedBlog))
          console.log('user id: ', user.id)
          console.log('blog user id', blog.user.id)

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
        {blogVisible ?
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
            <button onClick={deleteHandler.bind(null, blog.id)}>
              remove blog
            </button>
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
