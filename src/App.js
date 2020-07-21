import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from "./components/Login";
import Notification from "./components/Notification";
import blogService from './services/blogs'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [ notificationClass, setNotificationClass ] = useState('success')
  const [ notification, setNotification ] = useState(null, notificationClass)

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
    const blogObj = {
      title: title,
      author: author,
      url: url,
    }

    blogService
        .create(blogObj)
        .then(returnedBlog => {
            setBlogs(blogs.concat(returnedBlog))
            setNotificationClass('error')
            setNotification(`Added new blog ${title} by ${author} succesfully!`, {notificationClass})
            setTimeout(() => {
                setNotification(null)
            }, 5000)
        })
        .catch(error => {
            setNotificationClass('error')
            setNotification(`Error ${error}: Missing field info`, {notificationClass})
            setTimeout(() => {
                setNotification(null)
            }, 5000)
        })

  }

  const blogView = () => (
      <div>
        <h2>Blogs</h2>
        {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
        )}
      </div>
  )

  const blogForm = () => (
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
  )

  return (
    <div>
      <Notification
          message={notification}
          notificationClass={notificationClass}
      />
      {user === null ?
          <Login
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              user={user} setUser={setUser}
              setNotification={setNotification}
              notificationClass={notificationClass}
              setNotificationClass={setNotificationClass}
          /> :
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