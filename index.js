/**
 * Entry Point into JS code.
 */
import * as d3 from 'd3';
import buildChart from './chart';
import { diffWords } from 'diff';

const selector = '#vis';

function processDiffs(diffs) {
  const newDiffs = [];
  let nested = false;
  let nest = { d: [] };

  diffs.forEach(diff => {
    if (!diff.added && !diff.removed) {
      if (nested) {
        newDiffs.push(nest);
      }
      newDiffs.push(diff);
      nested = false;
      nest = { d: [] };
    } else {
      nested = true;
      nest.d.push(diff);
    }
  });
  return newDiffs;
}

/**
 * Data cleaning and transformation
 *
 * @param {Array} data Raw data array
 */
function processData([kjv, asv]) {
  const verseCount = kjv.length;
  const diffs = [];
  for (let i = 0; i < verseCount; i++) {
    const wdiffs = diffWords(kjv[i].t, asv[i].t);

    diffs.push({ v: kjv[i].v, d: processDiffs(wdiffs) });
  }

  return diffs;
}

const dataPath1 = 'data/kjv_genesis.csv';
const dataPath2 = 'data/asv_genesis.csv';
Promise.all([d3.csv(dataPath1), d3.csv(dataPath2)])
  .then(processData)
  .then(d => buildChart(d, selector));
