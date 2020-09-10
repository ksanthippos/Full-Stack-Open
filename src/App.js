/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Person from './components/Person'
import { Table, Button, Navbar, Nav } from 'react-bootstrap'
import {
  BrowserRouter as Router, Switch, Route, Link, Redirect
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

  const addComment = (blog, content) => {
    blogService
      .comment(blog.id, content)
      .then(() => {
        blogService // näkymän päivitys
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
      dispatch(loginNotification(`Welcome ${user.name}!`, 3000))
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
        <div>
          <h2>Blogs</h2>
          <Table striped>
            <thead>
              <tr>
                <th>Title</th>
                <th>Likes</th>
              </tr>
            </thead>
            {blogs.sort(function (a, b) {
              return b.likes - a.likes
            }).map(blog =>
              <tbody>
                <tr>
                  <Link to={`/blogs/${blog.id}`}><td>{blog.title} by {blog.author}</td></Link>
                  <td>{blog.likes}</td>
                </tr>
              </tbody>
            )}
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
                  <Link to={`/users/${person.id}`}><td>{person.name}</td></Link>
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
    <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}
    />
  )

  return (
    <Router>
      <div className="container">
        <div>
          <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#" as="span">
                  <Link to="/blogs" style={padding}>Blogs</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  <Link to="/users" style={padding}>Users</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  { user
                    ? <em>{user.name} <Button onClick={handleLogout} variant="secondary" size="sm">Logout</Button></em>
                    : <Link to="/login">Login</Link>
                  }
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
        <div>
          <Notification />
        </div>
        <Switch>
          <Route path="/blogs/:id">
            { user
              ? <Blog
                allBlogs={blogs}
                addLike={addLike}
                createComment={addComment}
                loggedUser={user}
                deleteBlog={deleteBlog} />
              : <Redirect to="/login" />
            }
          </Route>
          <Route path="/users/:id">
            { user
              ? <Person allBlogs={blogs} />
              : <Redirect to="/login" />
            }
          </Route>
          <Route path="/blogs">
            { user
              ? blogForm()
              : null
            }
            <p/>
            {blogView()}
          </Route>
          <Route path="/users">
            { user
              ? personView()
              : <Redirect to="/login" />
            }
          </Route>
          <Route path="/login">
            { user
              ? <Redirect to="/blogs" />
              : loginForm()
            }
          </Route>
          <Route path="/">
            <Redirect to="/blogs" />
          </Route>
        </Switch>
        <div>
          <p/>
          <hr/>
          <em>React-app by ksanthippos (2020)</em>
        </div>
      </div>
    </Router>
  )
}

export default App