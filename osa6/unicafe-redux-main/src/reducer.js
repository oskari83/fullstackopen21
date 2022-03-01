const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      let num = state.good + 1
      return {
        ...state,
        good: num
      }
    case 'OK':
      let num2 = state.ok + 1
      return {
        ...state,
        ok: num2
      }
    case 'BAD':
      let num3 = state.bad + 1
      return {
        ...state,
        bad: num3
      }
    case 'ZERO':
      return initialState
    default: return state
  }
  
}

export default counterReducer