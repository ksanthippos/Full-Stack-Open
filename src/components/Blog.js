import React, {useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, user }) => {
  const [blogVisible, setBlogVisible] = useState(false)
  const username = user.username
  const blogUsername = blog.user.username

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
    if (blogVisible)
      setBlogVisible(false)
    else
      setBlogVisible(true)
  }

  const likeHandler = (id) => {
    const updatedBlog = { ...blog, likes: ++blog.likes}
    blogService
        .update(blog.id, updatedBlog)
        .then(returnedBlog => {
          setBlogs(blogs.map(b => b.id !== id ? b : returnedBlog))
        })

    console.log(user)
  }

  const deleteHandler = (id) => {
    const blogToDelete = blogs.find(b => b.id === id)

    if (window.confirm(`Confirm delete blog: ${blogToDelete.title}`))
    {
      blogService
          .remove(id)
          .then(() => {
            setBlogs(blogs.map(b => b))
          })
    }
  }

  // näkymä
    return (
        <div>
          {blogVisible ?
              <div style={likedStyle}>
                {blog.title}
                <button onClick={visibleHandler}>hide</button>
                <p/>
                {blog.author} <p/>
                {blog.url} <p/>
                likes: {blog.likes}
                <button onClick={likeHandler.bind(null, blog.id)}>like</button>
                <p/>
                {blogUsername === username ?
                    <button onClick={deleteHandler.bind(null, blog.id)}>remove blog</button> :
                    null
                }
              </div> :
              <div style={normalStyle}>
                {blog.title} by: {blog.author}
                <button onClick={visibleHandler}>view</button>
              </div>
          }
          </div>
    )
}

export default Blog
