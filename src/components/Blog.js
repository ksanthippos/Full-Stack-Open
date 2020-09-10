import React from 'react'
import { Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

const Blog = ({ allBlogs, addLike, loggedUser, deleteBlog }) => {
  const id = useParams().id

  if (!allBlogs) {
    return null
  }

  const blog = allBlogs.find(b => b.id === id)

  const likeHandler = () => {
    addLike(blog)
  }

  const deleteHandler = () => {
    deleteBlog(blog)
  }

  if (!blog) {  // siltä varalta, että blogi on ehditty poistaa
    return null
  }

  return(
    <div>
      <h2>{blog.title}</h2>
      Author: {blog.author} <p/>
      Url:{blog.url} <p/>
      Likes: {blog.likes} <p/>
      <Button
        id="like-button"
        onClick={likeHandler}
        variant="success">
          Like
      </Button>
      <p/>
      Added by {blog.user.name} <p/>
      { loggedUser.username === blog.user.username  // vain blogin lisääjä voi poistaa
        ? <Button onClick={deleteHandler} variant="danger">remove</Button>
        : null
      }
    </div>
  )
}

export default Blog
