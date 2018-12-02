import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { connect } from 'react-redux';

const Charts = (props) => {
  const options = {
    chart: {
      type: props.type
    },
    legend: {
      layout: 'horizontal',        
    },
    title: {
      text: 'I know how chart works ..'
    },
    plotOptions: {
      series: {
          stacking: props.stacking
      }
    },
    xAxis: {
      categories: ['Forks','Open issues', 'Score']
    },
    series: [...props.series]
  };
  
  return (
  <HighchartsReact
  highcharts={Highcharts}
  constructorType={'chart'}
  options={options}
/>
)}

const mapStateToProps = store => {
  return {series: store.series, 
          type: store.chartOptions.type, 
          stacking: store.chartOptions.stacking}
}

export default connect(mapStateToProps)(Charts);