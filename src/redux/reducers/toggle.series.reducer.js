const toggleSeriesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_SERIES':      
      return [...state, action.payload];
    
    case 'REMOVE_SERIES':      
      return state.filter(item => item.name !== action.payload.name);

    default:
      return state;
  }
}
export default toggleSeriesReducer;