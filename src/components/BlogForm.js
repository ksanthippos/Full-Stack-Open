import React, {useState} from "react";

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
        <form onSubmit={addBlog}>
          <h2>Create new blog</h2>
          title
          <input
              value={title}
              onChange={handleTitleChange}
          /><p/>
          author
          <input
              value={author}
              onChange={handleAuthorChange}
          /><p/>
          url
          <input
              value={url}
              onChange={handleUrlChange}
          /><p/>
          <button type="submit">Create</button>
        </form>
      </div>
  )

}

export default BlogForm

