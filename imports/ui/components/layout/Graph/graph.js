import * as d3 from 'd3'

export default function (svg, data, width, height) {
    const container = d3.select(svg)

    // EXAMPLE: writing text to DOM, you should probably do something similar
    // with squares.

    container.selectAll('text')
                .data(data)
                .enter()
                .append('text')
                .attr('y', (data, i) => i * 14)
                .text(data => data.date + ' = ' + data.count)
}