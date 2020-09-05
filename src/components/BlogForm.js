import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })
  }

  return (
    <div>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <h2>Create new blog</h2>
            title
          <Form.Control
            id='title'
            value={title}
            onChange={handleTitleChange}
          /><p/>
            author
          <Form.Control
            id='author'
            value={author}
            onChange={handleAuthorChange}
          /><p/>
            url
          <Form.Control
            id='url'
            value={url}
            onChange={handleUrlChange}
          /><p/>
          <Button type="submit">Create</Button>
        </Form.Group>
      </Form>
    </div>
  )

}

export default BlogForm

