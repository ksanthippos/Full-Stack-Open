/* eslint-disable react/jsx-key */
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

const Blog = ({ allBlogs, addLike, createComment, loggedUser, deleteBlog }) => {
  const [comment, setComment] = useState(null)
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

  const commentHandler = (event) => {
    setComment(event.target.value)
  }

  const addComment = (event) => {
    event.preventDefault()
    createComment(blog, { comments: comment })
  }

  if (!blog) {  // siltä varalta, että blogi on ehditty poistaa
    return null
  }

  return(
    <div>
      <h2>{blog.title}</h2>
      Author: {blog.author} <p/>
      URL: {blog.url} <p/>
      Likes: {blog.likes} <p/>
      <Button
        id="like-button"
        onClick={likeHandler}
        variant="success">
          Like
      </Button>
      <p/>
      Added by {blog.user.name} <p/>
      <p/>
      { loggedUser.username === blog.user.username  // vain blogin lisääjä voi poistaa
        ? <Button onClick={deleteHandler} variant="danger">Remove</Button>
        : null
      }
      <hr/>
      <h3>Comments</h3>
      <table>
        {blog.comments.map(comment =>
          <tbody>
            <tr>
              <td>{comment}</td>
            </tr>
          </tbody>
        )}
      </table>
      <p/>
      <Form onSubmit={addComment}>
        <Form.Group>
          <h4>Add a comment</h4>
          <Form.Control
            id='comments'
            value={comment}
            onChange={commentHandler}
          /><p/>
          <Button type="submit">Submit</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default Blog
