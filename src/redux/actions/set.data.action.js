const setDataAction = (requestData) => dispatch => {
  return dispatch({type: 'SET_DATA', payload: requestData})
}

export default setDataAction;