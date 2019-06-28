import * as d3 from 'd3';

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const randomCircles = (svg, width, height) => {
  const data = [];
  for (let i = 0; i < 200; i++) {
    data.push({
      r: randomIntFromInterval(4, 50),
      x: randomIntFromInterval(0, width),
      y: randomIntFromInterval(0, height),
    });
  }

  const circles = svg
    .append('g')
    .attr('id', '#circles')
    .attr('clip-path', 'url(#zclip)');

  circles
    .selectAll('.circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('r', d => d.r)
    .attr('cx', d => d.x)
    .attr('cy', d => d.y);
};

const shitNetwork = (svg, width, height) => {
  const data = [];
  for (let i = 0; i < 200; i++) {
    data.push({
      r: randomIntFromInterval(4, 50),
      x: randomIntFromInterval(0, width),
      y: randomIntFromInterval(0, height),
    });
  }
  const circles = svg
    .append('g')
    .attr('id', '#circles')
    .attr('clip-path', 'url(#zclip)');

  const simulation = d3
    .forceSimulation(data)
    // .force('charge', d3.forceManyBody())
    .force('collision', d3.forceCollide().radius(d => d.r));

  const circle = circles
    .selectAll('.circle')
    .data(data)
    .enter()
    .append('circle')
    .classed('circle', true)
    .attr('r', d => d.r)
    .attr('cx', d => d.x)
    .attr('cy', d => d.y);

  simulation.on('tick', () => {
    circle.attr('cx', d => d.x).attr('cy', d => d.y);
  });
};

const shitNetworkLinks = (svg, width, height) => {
  const data = [];
  for (let i = 0; i < 300; i++) {
    data.push({
      r: randomIntFromInterval(4, 20),
      x: randomIntFromInterval(0, width),
      y: randomIntFromInterval(0, height),
    });
  }

  const links = [];
  for (let i = 0; i < 280; i++) {
    links.push({
      source: randomIntFromInterval(0, data.length - 1),
      target: randomIntFromInterval(0, data.length - 1),
    });
  }
  const linksG = svg
    .append('g')
    .attr('id', '#links')
    .attr('clip-path', 'url(#zclip)');

  const circles = svg
    .append('g')
    .attr('id', '#circles')
    .attr('clip-path', 'url(#zclip)');

  const simulation = d3
    .forceSimulation(data)
    .force('charge', d3.forceManyBody().strength(5))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collision', d3.forceCollide().radius(d => d.r * 2))
    // .force('charge', d3.forceManyBody())
    // .force('collision', d3.forceCollide().radius(d => d.r))
    .force('links', d3.forceLink(links));

  const circle = circles
    .selectAll('.circle')
    .data(data)
    .enter()
    .append('circle')
    .classed('circle', true)
    .attr('r', d => d.r)
    .attr('cx', d => d.x)
    .attr('cy', d => d.y);

  const link = linksG
    .selectAll('.link')
    .data(links)
    .enter()
    .append('line')
    .classed('line', true)
    .attr('stroke-width', 1)
    .attr('stroke', 'black');

  simulation.on('tick', () => {
    circle.attr('cx', d => d.x).attr('cy', d => d.y);
    link
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);
  });
};

/**
 * Build chart
 *
 * @param {Array} data Data to display
 * @param {String} selector D3 selector
 */
function buildChart(zSvg, selector) {
  console.log(zSvg.documentElement);
  document.body.appendChild(zSvg.documentElement);

  /**
   *
   * @param {*} data
   */
  const setup = data => {
    const width = 800;
    const height = 600;

    return {
      width,
      height,
    };
  };

  /**
   *
   * @param {*} data
   * @param {*} props
   */
  const display = props => {
    const svg = d3.select('svg');
    const defs = svg.append('defs');
    const width = +svg.attr('width').replace('px', '');
    const height = +svg.attr('height').replace('px', '');
    console.log(height);
    const zG = svg.select('#z');
    defs
      .append('clipPath')
      .attr('id', 'zclip')
      .each(function() {
        this.appendChild(zG.selectAll('rect,polygon').node());
        this.appendChild(zG.selectAll('polygon').node());
        this.appendChild(zG.selectAll('polygon').node());
      });

    // randomCircles(svg, width, height);
    shitNetwork(svg, width, height);
    // shitNetworkLinks(svg, width, height);

    // zG.selectAll('rect,polygon').attr('fill', 'red');
  };

  const props = setup();

  display(props);
}

export default buildChart;
