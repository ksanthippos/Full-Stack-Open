const filterReducer = (state = 'EMPTY', action) => {
  switch (action.type) {
    case 'SEARCH':
      return action.search
    case 'EMPTY':
      return action.type
    default:
      return state
  }
}

export const setSearch = search => {
  return {
    type: 'SEARCH',
    search
  }
}

export const setEmpty = () => {
  return {
    type: 'EMPTY',
  }
}


export default filterReducer