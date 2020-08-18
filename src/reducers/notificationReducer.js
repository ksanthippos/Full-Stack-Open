const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'ALERT':
      return 'voted for: ' + action.data.content
    case 'EMPTY':
      return null
    default:
      return state
  }
}

export const displayNotification = (content, delay) => {
  return async dispatch => {
    dispatch({
      type: 'ALERT',
      data: {content}
    })
    setTimeout(() => {
      dispatch({
        type: 'EMPTY'
      })
    }, delay)
  }
}

export default notificationReducer