const notificationReducer = (state = 'ALERT', action) => {
  switch (action.type) {
    case 'ALERT':
      return state.notification
    default:
      return state
  }
}

export const setNotification = () => {

}

export default notificationReducer