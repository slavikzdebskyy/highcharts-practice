const setAreaAction = (areaName) => dispatch => {
  return dispatch({type: 'SET_AREA', payload: areaName});
}

export default setAreaAction;
