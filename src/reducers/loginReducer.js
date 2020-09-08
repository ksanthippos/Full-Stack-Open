
const loginReducer = (state = null, action) => {
  switch(action.type) {
  case 'STORE_USER':
    return action.data
  default:
    return state
  }
}

export const storeUser = (user) => {
  return async dispatch => {
    dispatch({
      type: 'STORE_USER',
      data: user
    })
  }
}

export default loginReducer