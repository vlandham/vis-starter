import * as d3 from 'd3';

/**
 * Build chart
 *
 * @param {Array} data Data to display
 * @param {String} selector D3 selector
 */
function buildChart(data, selector) {
  console.log(data);

  /**
   *
   * @param {*} data
   */
  const setup = data => {
    const width = 800;
    const height = 600;

    const xExtent = d3.extent(data, d => d.a);
    const yExtent = d3.extent(data, d => d.b);

    console.log(xExtent);

    const xScale = d3
      .scaleLinear()
      .domain(xExtent)
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain(yExtent)
      .range([0, height]);

    return {
      width,
      height,
      xScale,
      yScale,
    };
  };

  /**
   *
   * @param {*} data
   * @param {*} props
   */
  const display = (data, props) => {
    const { width, height, xScale, yScale } = props;
    const base = d3.select(selector);
    const svg = base
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const binding = svg.selectAll('.bar').data(data);

    const enter = binding
      .enter()
      .append('rect')
      .classed('bar', true);

    const merged = binding.merge(enter);

    merged
      .attr('x', d => xScale(d.a))
      .attr('y', d => yScale(d.b))
      .attr('width', 10)
      .attr('height', 10);
  };

  const props = setup(data);

  display(data, props);
}

export default buildChart;
