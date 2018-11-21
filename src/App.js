import React, { Component } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import Checkbox from '@material-ui/core/Checkbox';


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
      serial: []
    }
  }

  componentDidMount() {
    const requestes = ['react', 'wordpress', 'javascript', 'angular'];
    requestes.forEach(req => this.getData(req))    
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
  
  handleChange = (event) => {
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
  


  render() {
    
    
    const options = {
      chart: {
        type: 'bar'
      },
      legend: {
        layout: 'horizontal',        
      },
      title: {
        text: 'My stock chart'
      },
      plotOptions: {
        series: {
            stacking: 'normal'
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
                  onChange={this.handleChange}
                />
                </span>
                <span>{elem.name}</span>
                <Cells arr={elem.data} />
              </div>           
            )
          })}
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
