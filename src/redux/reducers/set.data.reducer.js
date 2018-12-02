const setDataReducer = (state = [], action) => {
  return action.type === 'SET_DATA' ? [...state, action.payload] : state;
}

export default setDataReducer;