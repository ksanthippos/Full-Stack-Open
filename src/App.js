/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { Table, Button } from 'react-bootstrap'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationClass, setNotificationClass] = useState('success')
  const [notification, setNotification] = useState(null, notificationClass)

  const blogFormRef = React.createRef()

  // **********************************
  // effectit
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


  // **********************************
  // datan käsittely
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

  const addLike = (blog) => {
    const updatedBlog = { ...blog, likes: ++blog.likes }
    blogService
      .update(blog.id, updatedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(b => b.id !== blog.id ? b : returnedBlog))
      })
  }

  const deleteBlog = (blog) => {
    if (window.confirm(`Confirm delete blog: ${blog.title}`))
    {
      blogService
        .remove(blog.id)
        .then(() => {
          blogService // näkymän päivitys
            .getAll()
            .then(returnedBlogs => {
              setBlogs(returnedBlogs)
            })
        })
    }
  }


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
      setNotification('Wrong credentials', { notificationClass })
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
  // näkymä
  const blogView = () => ( // eniten tykkäyksiä saanut ylimpänä listassa
    <div id="blog-view">
      <Table striped>
        <tbody>
          {blogs.sort(function (a, b) {
            return b.likes - a.likes
          }).map(blog =>
            <tr>
              <td>
                <Blog
                  key={blog.id}
                  blog={blog}
                  user={user}
                  addLike={addLike}
                  deleteBlog={deleteBlog}
                />
              </td>
            </tr>
          )}
        </tbody>
      </Table>
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

  return (
    <div className="container">
      <Notification
        message={notification}
        notificationClass={notificationClass}
      />
      <h2>Blogs</h2>
      {user === null ?
        loginForm() :
        <div>
          <p>Logged in as {user.name}</p>
          <Button onClick={handleLogout} variant="warning">Logout</Button>
          {blogForm()}
        </div>
      }
      {blogView()}
    </div>
  )
}

export default App