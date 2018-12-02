import { combineReducers } from 'redux';

import setDataReducer from './set.data.reducer';
import toggleSeriesReducer from './toggle.series.reducer';
import setChartOptions from './set.chart.options';

export default combineReducers ({
  data : setDataReducer,
  series: toggleSeriesReducer,
  chartOptions: setChartOptions
})
