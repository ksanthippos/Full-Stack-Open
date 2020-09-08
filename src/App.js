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

// REDUX
import { useDispatch, useSelector } from 'react-redux'
import { addNewNotification, addLikeNotification, loginNotification, deleteBlogNotification } from './reducers/notificationReducer'
import { showAllBlogs, updateLikedBlog } from './reducers/blogReducer'
import { storeUser } from './reducers/loginReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = React.createRef()
  const dispatch = useDispatch()


  // alustukset
  useEffect(() => {
    dispatch(showAllBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(storeUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  // storesta
  const blogs = useSelector(({ blog }) => { return blog })
  const user = useSelector(({ login }) => { return login }) // vielä null

  // **********************************
  // datan käsittely
  const addBlog = (blogObj) => {
    blogFormRef.current.toggleVisibility()

    blogService
      .create(blogObj)
      .then(() => {
        dispatch(addNewNotification(blogObj.title, 5000))

        blogService // näkymän päivitys, jotta remove voidaan tarvittaessa tehdä heti
          .getAll()
          .then(() => {
            dispatch(showAllBlogs())
          })
      })
      .catch(error => {
        console.log(error)
      })
  }

  const addLike = (blog) => {
    const updatedBlog = { ...blog, likes: ++blog.likes }
    blogService
      .update(blog.id, updatedBlog)
      .then(returnedBlog => {
        dispatch(updateLikedBlog(blog, returnedBlog))
        dispatch(addLikeNotification(updatedBlog.title, 2000))
      })
  }

  const deleteBlog = (blog) => {
    if (window.confirm(`Confirm delete blog: ${blog.title}`)) {
      const title = blog.title  // otsikko talteen ennen poistoa
      blogService
        .remove(blog.id)
        .then(() => {
          blogService // näkymän päivitys
            .getAll()
            .then(() => {
              dispatch(showAllBlogs())
              dispatch(deleteBlogNotification(title, 3000))
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
      dispatch(storeUser(user))
      setUsername('')
      setPassword('')
      dispatch(loginNotification(`Welcome ${username}!`, 3000))
    }
    catch (exception) {
      console.log(exception)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload()
  }


  // **********************************
  // näkymä
  const blogView = () => {
    if (blogs !== null) {
      return(
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
    }
  }

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
      <Notification />
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