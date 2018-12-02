const toggleSeriesAction = (isChecked, seriesItem) => dispatch => {
  return isChecked ? dispatch({type: 'ADD_SERIES', payload: seriesItem}) : dispatch({type: 'REMOVE_SERIES', payload: seriesItem});
}

export default toggleSeriesAction;