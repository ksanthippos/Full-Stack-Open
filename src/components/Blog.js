import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

const Blog = ({ allBlogs }) => {
  // const [removeVisible, setRemoveVisible] = useState(false)
  const id = useParams().id

  if (!allBlogs) {
    return null
  }

  const blog = allBlogs.find(b => b.id === id)
  
/*   // tarkistetaan, onko oikeus nähdä delete-nappi
  if (user !== null) {
    if (user.username !== blog.user.username) {
      setRemoveVisible(false)
    } 
    else {
      setRemoveVisible(true)
    }
  }

  const likeHandler = () => {
    addLike(blog)
  }

  const deleteHandler = () => {
    deleteBlog(blog)
  } */

  return(
    <div>
      <h2>{blog.title}</h2>
      Author: {blog.author} <p/>
      Url:{blog.url} <p/>
      Likes: {blog.likes}
      
{/*       <h2>{blog.title}</h2>
          Author: {blog.author} <p/>
          Url:{blog.url} <p/>
          Likes: {blog.likes}
      <Button
        id="like-button"
        onClick={likeHandler}
        variant="success">
          Like
      </Button>
      { removeVisible ?
        <Button onClick={deleteHandler} variant="danger">
          remove blog
        </Button> :
        null
      } */}
    </div>
  )
}

export default Blog
