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

export const setNotification = (content) => {
  return {
    type: 'ALERT',
    data: { content }
  }
}

export const removeNotification = () => {
  return {
    type: 'EMPTY'
  }
}



export default notificationReducer