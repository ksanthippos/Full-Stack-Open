import React from 'react'

const Person = ({ person }) => {

  return(
    <div>
      {person.name} has {person.blogs.length} blogs
    </div>
  )
}

export default Person