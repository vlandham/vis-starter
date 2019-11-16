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
    return {};
  };

  /**
   *
   * @param {*} data
   * @param {*} props
   */
  const display = (data, props) => {
    const { width, height, xScale, yScale } = props;
    const base = d3.select(selector);

    const binding = base.selectAll('.verse').data(data);
    const enter = binding
      .enter()
      .append('div')
      .classed('verse', true);

    const merged = binding.merge(enter);

    function displayText(d) {
      if (d.d) {
        // console.log(d);

        d3.select(this)
          .classed('group', true)
          .selectAll('.dd')
          .data(d => d.d)
          .enter()
          .append('span')
          .classed('dd', true)
          .classed('added', d => d.added)
          .classed('removed', d => d.removed)
          .html(d => (d.value === ' ' ? '&nbsp;' : d.value));
      }
    }

    const dBinding = merged.selectAll('.d').data(d => d.d);
    const dEnter = dBinding
      .enter()
      .append('span')
      .classed('d', true)
      .html(d => (d.value === ' ' ? '&nbsp;' : d.value))
      .each(displayText);

    const dMerge = dBinding.merge(dEnter);
    // dMerge
    //   .selectAll('.dd')
    //   .data(d => d => d.d)
    //   .enter()
    //   .append('span')
    //   .text(d => d.value);

    // const svg = base
    //   .append('svg')
    //   .attr('width', width)
    //   .attr('height', height);

    // const binding = svg.selectAll('.bar').data(data);

    // const enter = binding
    //   .enter()
    //   .append('rect')
    //   .classed('bar', true);

    // const merged = binding.merge(enter);

    // merged
    //   .attr('x', d => xScale(d.a))
    //   .attr('y', d => yScale(d.b))
    //   .attr('width', 10)
    //   .attr('height', 10);
  };

  const props = setup(data);

  display(data, props);
}

export default buildChart;
