/**
 * Entry Point into JS code.
 */
import * as d3 from 'd3';
import buildChart from './chart';

const dataPath = 'data/test.csv';
const selector = '#vis';

/**
 * Data cleaning and transformation
 *
 * @param {Array} data Raw data array
 */
function processData(data) {
  data.forEach(datum => {
    const numCols = ['a', 'b', 'c'];
    numCols.forEach(col => {
      datum[col] = +datum[col];
    });
  });

  return data;
}

d3.csv(dataPath)
  .then(processData)
  .then(data => buildChart(data, selector));
