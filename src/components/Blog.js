import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

const Blog = ({ blog, user, addLike, deleteBlog }) => {
  const [blogVisible, setBlogVisible] = useState(false)
  const [removeVisible, setRemoveVisible] = useState(false)

  // tyylit
  const likedStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    // border: 'solid',
    // borderColor: 'green',
    borderWidth: 2,
    marginBottom: 5
  }

  const normalStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5
  }


  // handlerit
  const visibleHandler = () => {

    // tarkistetaan onko blogin lisääjän username sama kuin kirjautuneella käyttäjällä
    if (user !== null) {
      if (user.username !== blog.user.username) {
        setRemoveVisible(false)
      } else {
        setRemoveVisible(true)
      }
    }

    // bloginäkymän view/hide-toiminnallisuus
    if (blogVisible) {
      setBlogVisible(false)
    }
    else {
      setBlogVisible(true)
    }
  }

  const likeHandler = () => {
    addLike(blog)
  }

  const deleteHandler = () => {
    deleteBlog(blog)
  }

  // näkymä
  return (
    <div>
      { blogVisible ?
        <div style={likedStyle}>
          {blog.title}
          <Button onClick={visibleHandler}>
            hide
          </Button>
          <p/>
          {blog.author} <p/>
          {blog.url} <p/>
          likes: {blog.likes}
          <Button
            id="like-button"
            onClick={likeHandler}
            variant="success"
          >
            like
          </Button>
          <p/>
          { removeVisible ?
            <Button
              onClick={deleteHandler}
              variant="danger"
            >
              remove blog
            </Button> :
            null
          }
        </div> :
        <div style={normalStyle}>
          {blog.title} by: {blog.author}
          <Button
            id="view-button"
            onClick={visibleHandler}
          >
            view
          </Button>
        </div>
      }
    </div>
  )
}

export default Blog
