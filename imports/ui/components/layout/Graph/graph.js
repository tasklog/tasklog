import * as d3 from 'd3'

export default function (stats, element, width, height) {
    const parent = d3.select(element)

    const size = (width / 53)

    const max = stats.reduce((max, stat) => Math.max(max, stat.count), 0)

    const interpolater = d3.interpolateLab('#EDEEF0', '#2699FB')

    stats.forEach((stat) => {
        stat.color = interpolater(stat.count / max)
    })

    parent.selectAll('rect')
        .data(stats)
        .enter()
        .append('rect')
        .attr('width', size)
        .attr('height', size)
        .attr('fill', stat => stat.color)
        .attr('y', (stat, i) => (i % 7) * size)
        .attr('x', (stat, i) =>  Math.floor(i / 7) * size)



}