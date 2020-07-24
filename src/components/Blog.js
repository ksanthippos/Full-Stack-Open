import React, {useState} from 'react'
const Blog = ({ blog }) => {

  const [blogVisible, setBlogVisible] = useState(false)

  const likedStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 3,
    marginBottom: 5
  }

  const normalStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const visibleHandler = () => {
    if (blogVisible) {
      setBlogVisible(false)
    }
    else {
      setBlogVisible(true)
    }
  }

  if (blogVisible) {
    return (
        <div style={likedStyle}>
          {blog.title} <p/>
          {blog.author} <p/>
          {blog.url} <p/>
          likes: {blog.likes} <button>like</button> <p/>
          <button onClick={visibleHandler}>hide</button>
        </div>
    )
  }
  else {
    return (
        <div style={normalStyle}>
          {blog.title} by: {blog.author}
          <button onClick={visibleHandler}>show</button>
        </div>
    )
  }
}

export default Blog
