import blogService from '../services/blogs'

const blogReducer = (state = null, action) => {
  switch(action.type) {
  case 'SHOW_BLOGS':
    return action.data
  case 'UPDATE_LIKED':
    return action.data
  default:
    return state
  }
}

export const showAllBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'SHOW_BLOGS',
      data: blogs
    })
  }
}

export const updateLikedBlog = (blog, returnedBlog) => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    blogs.map(b => b.id !== blog.id ? b : returnedBlog)

    dispatch({
      type: 'UPDATE_LIKED',
      data: blogs
    })
  }
}

export default blogReducer