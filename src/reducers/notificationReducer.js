const notificationReducer = (state = null, action) => {
  switch (action.type) {
  case 'ADD':
    return 'Created new blog: ' + action.data.content
  case 'LOGOUT':
    return action.data.content
  case 'EMPTY':
    return null
  default:
    return state
  }
}

export const displayNotification = (content, notetype, delay) => {
  switch(notetype) {
  case 'add new':
    return async dispatch => {
      dispatch({
        type: 'ADD',
        data: { content }
      })
      setTimeout(() => {
        dispatch({
          type: 'EMPTY'
        })
      }, delay)
    }
  case 'logout':
    return async dispatch => {
      dispatch({
        type: 'LOGOUT',
        data: { content }
      })
      setTimeout(() => {
        dispatch({
          type: 'EMPTY'
        })
      }, delay)
    }

  }
}

export default notificationReducer