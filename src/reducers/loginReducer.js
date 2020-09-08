import loginService from '../services/login'

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
    const login = await loginService.login(user)
    dispatch({
      type: 'LOGIN',
      data: login
    })
  }
}

export default loginReducer