const notificationReducer = (state = 'EMPTY', action) => {
  switch (action.type) {
    case 'ALERT':
      return state.notification
    case 'EMPTY':
      return state.notification
    default:
      return state
  }
}

export const setNotification = (content) => {
  console.log('voted ', content)
  return {
    type: 'ALERT',
    data: { content }
  }
}

export const removeNotification = () => {
  console.log('empty set')
  return {
    type: 'EMPTY'
  }
}



export default notificationReducer