import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from "./components/Login";
import Notification from "./components/Notification";
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  // haetaan selaimen local storagesta kirjautuneen käyttäjän tiedot
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleBlogChange = (event) => {
    setNewBlog(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObj = {
      title: newBlog,
      // TÄSSÄ
    }
  }

  const blogView = () => (
      <div>
        <h2>blogs</h2>
        {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
        )}
      </div>
  )

  const blogForm = () => (
      <form onSubmit={addBlog}>
        <h2>Create new</h2>
        <input
            value={newBlog}
            onChange={handleBlogChange}
        />
        <button type="submit">save</button>
      </form>
  )

  return (
    <div>
      <Notification message={errorMessage} />
      {user === null ?
          <Login
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              user={user} setUser={setUser}
              setErrorMessage={setErrorMessage}/> :
          <div>
            <p>Logged in as {user.name}</p>
            <button onClick={() => {
              window.localStorage.removeItem('loggedBlogappUser')
              window.location.reload()
            }}>
              Logout
            </button>
            {blogForm()}
            {blogView()}
          </div>
      }
    </div>
  )
}

export default App