const notificationReducer = (state = null, action) => {
  switch (action.type) {
  case 'ADD_NEW':
    return 'Created new blog: ' + action.data.content
  case 'ADD_LIKE':
    return 'You liked blog ' + action.data.content
  case 'LOGIN':
    return action.data.content
  case 'EMPTY':
    return null
  default:
    return state
  }
}

export const addNewNotification = (content, delay) => {
  return async dispatch => {
    dispatch({
      type: 'ADD_NEW',
      data: { content }
    })
    setTimeout(() => {
      dispatch({
        type: 'EMPTY'
      })
    }, delay)
  }
}

export const addLikeNotification = (content, delay) => {
  return async dispatch => {
    dispatch({
      type: 'ADD_LIKE',
      data: { content }
    })
    setTimeout(() => {
      dispatch({
        type: 'EMPTY'
      })
    }, delay)
  }
}

export const loginNotification = (content, delay) => {
  return async dispatch => {
    dispatch({
      type: 'LOGIN',
      data: { content }
    })
    setTimeout(() => {
      dispatch({
        type: 'EMPTY'
      })
    }, delay)
  }
}

export default notificationReducer