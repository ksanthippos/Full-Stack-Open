import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationClass, setNotificationClass] = useState('success')
  const [notification, setNotification] = useState(null, notificationClass)

  const blogFormRef = React.createRef()

  // **********************************
  // tietojen käsittely
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObj) => {
    blogFormRef.current.toggleVisibility()

    blogService
      .create(blogObj)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNotificationClass('success')
        setNotification(`Added new blog ${blogObj.title} by ${blogObj.author} succesfully!`, { notificationClass })

        blogService // näkymän päivitys, jotta remove voidaan tarvittaessa tehdä heti
          .getAll()
          .then(returnedBlogs => {
            setBlogs(returnedBlogs)
          })

        setTimeout(() => {
          setNotification(null)
        }, 1500)
      })
      .catch(error => {
        setNotificationClass('error')
        setNotification(`Error ${error}: Missing field info`, { notificationClass })
        setTimeout(() => {
          setNotification(null)
        }, 1500)
      })
  }

  // **********************************


  // **********************************
  // event handlerit
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      // tallennetaan käyttäjä selaimen local storageen istunnon ajaksi
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotificationClass('success')
      setNotification(`Welcome ${user.name}!`, { notificationClass })
      setTimeout(() => {
        setNotification(null)
      }, 1500)

    }
    catch (exception) {
      setNotificationClass('error')
      setNotification('Invalid credentials', { notificationClass })
      setTimeout(() => {
        setNotification(null)
      }, 1500)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload()
  }
  // **********************************


  // **********************************
  // näkymä
  const blogView = () => ( // eniten tykkäyksiä saanut ylimpänä listassa
    <div>
      {blogs.sort(function (a, b) {
        return b.likes - a.likes
      }).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          blogs={blogs}
          setBlogs={setBlogs}
          user={user}
        />
      )}
    </div>
  )

  const blogForm = () => (
    <Togglable buttonLabel='New blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const loginForm = () => (
    <Togglable buttonLabel='Login'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )
  // **********************************


  return (
    <div>
      <Notification
        message={notification}
        notificationClass={notificationClass}
      />
      <h2>Blogs</h2>
      {user === null ?
        loginForm() :
        <div>
          <p>Logged in as {user.name}</p>
          <button onClick={handleLogout}>Logout</button>
          {blogForm()}
        </div>
      }
      {blogView()}
    </div>
  )
}

export default App