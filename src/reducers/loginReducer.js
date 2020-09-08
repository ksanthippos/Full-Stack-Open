// import loginService from '../services/login'

const loginReducer = (state = null, action) => {
  switch(action.type) {
  case 'LOGIN':
    return action.data
  default:
    return state
  }
}

export const storeUser = (user) => {
  console.log('user inside reducer: ', user)
  return async dispatch => {
    dispatch({
      type: 'LOGIN',
      data: user
    })
  }
}

export default loginReducer