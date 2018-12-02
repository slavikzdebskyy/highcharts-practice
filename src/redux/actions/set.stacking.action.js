const setStackingAction = (stackingName) => dispatch => {
  return dispatch({type: 'SET_STACKING', payload: stackingName});
}

export default setStackingAction;
