const blogReducer = (state = null, action) => {
  switch(action.type) {
  case 'SHOW_BLOGS':
    return action.data.content
  default:
    return state
  }
}

export const showAllBlogs = (content) => {
  return async dispatch => {
    dispatch({
      type: 'SHOW_BLOGS',
      data: { content }
    })
  }
}

export default blogReducer