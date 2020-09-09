/* eslint-disable react/jsx-key */
import React from 'react'
import { useParams } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Person = ({ allBlogs }) => {
  const id = useParams().id
  let name

  if (!allBlogs) {
    return null
  }

  const blogs = allBlogs.filter(blog =>
    blog.user.id === id ?
      name = blog.user.name :
      null)

  return(
    <div>
      <h2>Blogs by {name}:</h2>
      <Table striped>
        <thead>
          <tr>
            <th>Title</th>
          </tr>
        </thead>
        {blogs.map(blog =>
          <tbody>
            <tr>
              <td>{blog.title}</td>
            </tr>
          </tbody>
        )}
      </Table>
    </div>
  )

}

export default Person