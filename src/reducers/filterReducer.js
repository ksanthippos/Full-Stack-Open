const filterReducer = (state = null, action) => {

  switch (action.type) {
    case 'SEARCH':
      return action.filter
    case 'EMPTY':
      return null
    default:
      return state
  }
}

export const setSearch = filter => {
  console.log(filter)
  console.log('search')
  return {
    type: 'SEARCH',
    data: { filter }
  }
}

export const setEmpty = () => {
  console.log('empty')
  return {
    type: 'EMPTY'
  }
}


export default filterReducer