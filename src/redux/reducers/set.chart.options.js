const initialState = {stacking: 'normal', type: 'area'}

const setChartOptions = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_STACKING':  
      state.stacking = action.payload;
      return state;
    
    case 'SET_AREA':      
      state.type = action.payload;
      return state;

    default:
      return state;
  }
}
export default setChartOptions;