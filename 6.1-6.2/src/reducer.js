const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  const currentState = {...state}
  switch (action.type) {
    case 'GOOD':
      currentState.good++
      return currentState
    case 'OK':
      currentState.ok++
      return currentState
    case 'BAD':
      currentState.bad++
      return currentState
    case 'ZERO':
      currentState.good = 0
      currentState.ok = 0
      currentState.bad = 0
      return currentState
    default: return state
  }
  
}

export default counterReducer