import React, { Component } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';

import './App.scss';

class Cells extends Component {
  
    render () {
      return (
        this.props.arr.map((el, index)=> {  
          return (
            <span key = {index}>{el}</span>
          )               
      })
    )
  }
}

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      serial: [],
      requestes: ['react', 'wordpress', 'javascript', 'angular'],
      newRequest: '',
      type: 'area',
      stacking: 'normal'
    }
  }

  componentDidMount() {
    this.state.requestes.forEach(req => this.getData(req))    
  }

  getData = request => {
    const dataResult = {
      name: request,
      data: []
    };  
    const temporyObj = {
      forks : 0,
      open_issues : 0,
      score : 0
    };  
    const reqUrl = `https://api.github.com/search/repositories?q=${request}`;
    fetch(reqUrl)
    .then(data=>data.json())
    .then(dataReq=>{    
      dataReq.items.forEach(item => {
        temporyObj.forks += item.forks;
        temporyObj.open_issues += item.open_issues;
        temporyObj.score += item.score;
      })
      for(let key in temporyObj){
        dataResult.data.push(parseInt(temporyObj[key] / dataReq.items.length));
      }
      this.setState(prevState => ({
        data: [...prevState.data, dataResult]
      }))
    })
    .catch(err=>console.error(err));    
  }
  
  handleChangeToggleRequest = (event) => {
    const newArr = this.state.data.slice();
    if (event.target.checked) {
      const newEl = newArr.find(el=>el.name === event.target.name);
      this.setState(prevState =>({
        serial: [...prevState.serial, newEl]
      }))
    } else {
      const newSerial = this.state.serial.slice().filter(el=>el.name !== event.target.name);
      this.setState({
        serial: [...newSerial]
      })
    }
  }
  handleSubmitNewRequest = (event) => {
    event.preventDefault();    
    this.getData(this.state.newRequest)
    this.setState({newRequest: ''})
  }
  handleChangeNewRequest (event) {
    this.setState({newRequest: event.target.value})
  }
  handleChangeLayout = event => {
    this.setState({ type: event.target.value });
  };
  handleChangeStacking = event => {
    this.setState({ stacking: event.target.value });
  }
  
  

  render() {
    
    
    const options = {
      chart: {
        type: this.state.type
      },
      legend: {
        layout: 'horizontal',        
      },
      title: {
        text: 'I know how chart works ..'
      },
      plotOptions: {
        series: {
            stacking: this.state.stacking
        }
      },
      xAxis: {
        categories: ['Forks','Open issues', 'Score']
      },
      series: [...this.state.serial]
    }
    
    
    return (
      <div className="App">        
        <div className = "table">
          <div className = 'row title'>
            <span className = 'check'></span>
            <span>Name</span>
            <span>Forks</span>
            <span>Open issues</span>
            <span>Score</span>
          </div>
          {this.state.data.map((elem, index)=>{
            return (
              <div className = 'row' key = {index}>
                <span className = 'check'>
                <Checkbox
                  color= "primary"
                  name = {elem.name}
                  onChange={this.handleChangeToggleRequest}
                />
                </span>
                <span>{elem.name}</span>
                <Cells arr={elem.data} />
              </div>           
            )
          })}
        </div>

        <div className = 'forms-container'>          
          <form  noValidate autoComplete="off" onSubmit = {this.handleSubmitNewRequest}>
          <TextField 
            id = 'standard-dense'
            label = 'Enter new request ...'
            margin = 'dense'
            value = {this.state.newRequest}
            onChange = {this.handleChangeNewRequest.bind(this)}
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
        <HighchartsReact
            highcharts={Highcharts}
            constructorType={'chart'}
            options={options}
          />
      </div>
    ) 
  }  
}


export default App;
