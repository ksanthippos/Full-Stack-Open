import personService from '../services/persons'
import blogService from '../services/blogs'

const personReducer = (state = null, action) => {
  switch(action.type) {
  case 'SHOW_PERSONS':
    return action.data
  case 'SHOW_USER_BLOGS':
    return action.data
  default:
    return state
  }
}

export const showAllPersons = () => {
  return async dispatch => {
    const persons = await personService.getAll()
    dispatch({
      type: 'SHOW_PERSONS',
      data: persons
    })
  }
}
/* 
export const showUserBlogs = (id, blogs) => {
  return async dispatch => {
    const userBlogs = blogs.map(blog => blog.id === id)
    dispatch({
      type: 'SHOW_USER_BLOGS',
      data: userBlogs
    })
  }
} */

export default personReducer