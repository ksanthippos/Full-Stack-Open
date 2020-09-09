/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
// import Person from './components/Person'
import { Table, Button } from 'react-bootstrap'
import {
  BrowserRouter as Router, Switch, Route, Link
} from 'react-router-dom'

// REDUX
import { useDispatch, useSelector } from 'react-redux'
import { addNewNotification, addLikeNotification, loginNotification, deleteBlogNotification } from './reducers/notificationReducer'
import { showAllBlogs, updateLikedBlog } from './reducers/blogReducer'
import { storeUser } from './reducers/loginReducer'
import { showAllPersons } from './reducers/personReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = React.createRef()
  const dispatch = useDispatch()

  const padding = {
    padding: 5
  }

  // alustukset
  useEffect(() => {
    dispatch(showAllBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(showAllPersons())
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
  const user = useSelector(({ login }) => { return login })
  const persons = useSelector(({ person }) => { return person })



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
            dispatch(showAllPersons())
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
              dispatch(showAllPersons())
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
  // näkymät
  const blogView = () => {
    if (blogs !== null) {
      return(
        <div id="blog-view">
          <h2>Blogs</h2>
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

  const personView = () => {
    if (persons !== null) {
      return(
        <div>
          <h2>Users</h2>
          <Table striped>
            <thead>
              <tr>
                <th>Name</th>
                <th>Blogs created</th>
              </tr>
            </thead>
            {persons.sort(function (a, b) {
              return b.blogs.length - a.blogs.length
            }).map(person =>
              <tbody>
                <tr>
                  <td>{person.name}</td>
                  <td>{person.blogs.length}</td>
                </tr>
              </tbody>
            )}
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
    <Router>
      <div className="container">
        <div>
          <Link to="/" style={padding}>blogs</Link>
          <Link to="/users" style={padding}>users</Link>
        </div>
        <Switch>
          <Route path="/users">
            {user === null ?
              loginForm() :
              <div>
                <p>Logged in as {user.name}</p>
                <Button onClick={handleLogout} variant="warning">Logout</Button>
                {personView()}
              </div>
            }
          </Route>
          <Route path="/">
            <Notification />
            {user === null ?
              loginForm() :
              <div>
                <p>Logged in as {user.name}</p>
                <Button onClick={handleLogout} variant="warning">Logout</Button>
                {blogForm()}
              </div>
            }
            <p/>
            {blogView()}
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App