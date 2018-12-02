import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from 'react-redux';


import toggleSeriesAction from '../redux/actions/toggle.series.action';

import Cells from './cells';

class TableComponent extends Component {

  toggleChecked =  event => {
    const item = this.props.data.find(item=>item.name === event.target.name);
    this.props.toggleSeries(event.target.checked, item);    
  }

  render () {
    return (  
      <div className = "table">  
        <div className = 'row title'>
          <span className = 'check'></span>
          <span>Name</span>
          <span>Forks</span>
          <span>Open issues</span>
          <span>Score</span>
        </div>
        {this.props.data.map((elem, index)=>{
          return (
            <div className = 'row' key = {index}>
              <span className = 'check'>
              <Checkbox
                color= "primary"
                name = {elem.name}
                onChange={event => this.toggleChecked(event)}
              />
              </span>
              <span>{elem.name}</span>
              <Cells valuesArray={elem.data} />
            </div>           
          )
        })}
      </div>  
    )
  }
}

const mapStateToProps = store => {
  return {data: store.data}
}
const mapDispatchToProps = dispatch => ({
  toggleSeries: (isChecked, seriesItem) => {
    dispatch(toggleSeriesAction(isChecked, seriesItem))
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(TableComponent);
