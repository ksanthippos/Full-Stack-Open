import personService from '../services/persons'

const personReducer = (state = null, action) => {
  switch(action.type) {
  case 'SHOW_PERSONS':
    return action.data
  default:
    return state
  }
}

export const showAllPersons = () => {
  return async dispatch => {
    const persons = await personService.getAll()
    dispatch({
      type: 'SHOW_PERSONS',
      data: persons
    })
  }
}

export default personReducer