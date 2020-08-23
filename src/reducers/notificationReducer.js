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

let timeoutID = undefined

export const displayNotification = (content, delay) => {

  /*
  jos äänestetään useampaa anekdoottia alle 5 sek aikana, tällä varmistetaan
  notifikaation näkyminen 5 sek viimeisimmän anekdootin kohdalla
  */
  if (typeof timeoutID === 'number')
    window.clearTimeout(timeoutID)

  return async dispatch => {
    dispatch({
      type: 'ALERT',
      data: {content}
    })
    timeoutID = window.setTimeout(() => {
      dispatch({
        type: 'EMPTY'
      })
    }, delay)
  }
}





export default notificationReducer