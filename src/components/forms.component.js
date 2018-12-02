import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import { connect } from 'react-redux';

import setDataAction from '../redux/actions/set.data.action';
import setAreaAction from '../redux/actions/set.area.action';
import setStackingAction from '../redux/actions/set.stacking.action';

import getData from '../getData';

class FormsComponent extends Component {
  constructor (props) {
    super (props)
    this.state = {     
      newRequest: '',
      type: 'area',
      stacking: 'normal'
    }
  }

  submitNewRequest = (event) => {
    event.preventDefault();    
    getData(this.state.newRequest, this.props.setData)
    this.setState({newRequest: ''})
  }
  changeNewRequest = (event) => {
    this.setState({newRequest: event.target.value})    
  }
  handleChangeLayout = event => {
    this.props.setArea(event.target.value);
    this.setState({type: event.target.value})
  };
  handleChangeStacking = event => {
    this.props.setStacking(event.target.value);
    this.setState({stacking: event.target.value})
  }

  render () {
    return (
      <div className = 'forms-container'>          
        <form  noValidate autoComplete="off" onSubmit = {this.submitNewRequest}>
          <TextField 
            id = 'standard-dense'
            label = 'Enter new request ...'
            margin = 'dense'
            value = {this.state.newRequest}
            onChange = {this.changeNewRequest}
            />        
        </form> 
        <div className = 'radio-group'>
          <span className = 'label'>STACKING</span>
          <div className = 'radio-conainer'>
            <Radio
              checked={this.state.stacking === 'normal'}
              onChange={this.handleChangeStacking}
              value = 'normal'             
            />
            Join
          </div>
          <div className = 'radio-conainer'>
            <Radio
              checked={this.state.stacking === ''}
              onChange={this.handleChangeStacking}
              value = ''          
            />
            Split
          </div> 
        </div> 
        <div className = 'radio-group'>
          <span className = 'label'>TYPE</span>
          <div className = 'radio-conainer'>
            <Radio
              checked={this.state.type === 'bar'}
              onChange={this.handleChangeLayout}
              value = 'bar'
              label = 'Bar'
              name = 'bar'             
            />
            Bar
          </div>
          <div className = 'radio-conainer'>
            <Radio
              checked={this.state.type === 'area'}
              onChange={this.handleChangeLayout}
              value = 'area'             
            />
            Area
          </div>
          <div className = 'radio-conainer'>
            <Radio
              checked={this.state.type === 'column'}
              onChange={this.handleChangeLayout}
              value = 'column'          
            />
            Column
          </div> 
        </div>         
      </div>
    )
  }
}



const mapStateToProps = store => {
  return {type: store.chartOptions.type, stacking: store.chartOptions.stacking}
}
const mapDispatchToProps = dispatch => ({
  setData: request => {
    dispatch(setDataAction(request));
  },
  setArea: areaName => {
    dispatch(setAreaAction(areaName));
  },
  setStacking: stackingName => {
    dispatch(setStackingAction(stackingName));
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(FormsComponent);