import React, { Component } from 'react';
import { connect } from 'react-redux';

import setDataAction from '../redux/actions/set.data.action';
import getData from '../getData';

import Charts from './charts';
import TableComponent from './table.component';
import FormsComponent from './forms.component';
import './app.component.scss';



class AppComponenet extends Component {
  constructor (props) {
    super (props)
    this.state = {
      // data: [],
      // serial: [],
      requestes: ['react', 'wordpress', 'javascript', 'angular'],
      // newRequest: '',
      // type: 'area',
      // stacking: 'normal'
    }
  }  

  componentDidMount() {
    this.state.requestes.forEach(req => getData(req, this.props.setData))    
  }

  render() {    
    return (
      <div className="App"> 
        <TableComponent />
        <FormsComponent />
        <Charts />
      </div>
    ) 
  }  
}

const mapStateToProps = store => {
  return {};
}
const mapDispatchToProps = dispatch => ({
  setData: (request) => {
    dispatch(setDataAction(request));
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(AppComponenet);