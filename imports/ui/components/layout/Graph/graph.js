import * as d3 from 'd3'
import tippy from 'tippy.js'
import moment from 'moment'

const COLOR_ACCENT = '#2699FB'
const COLOR_BASE = '#ebedf0'
const MARGIN = 0.2
const NUMBER_OF_WEEKS = 53

const interoplateAccent = d3.interpolateLab(COLOR_BASE, COLOR_ACCENT)


export default function (stats, element, width, height) {
    const parent = d3.select(element)

    const size = width / 53
    const margin = size * 0.2
    const visibleSize = size - margin

    const maxCount = stats.reduce((max, stat) => Math.max(max, stat.count), 0) || 1

    stats.forEach((stat) => {
        stat.color = interoplateAccent(stat.count / maxCount)
    })

    var test = parent
        .selectAll('rect')
        .data(stats)
        .enter()
        .append('rect')
        .attr('width', visibleSize)
        .attr('height', visibleSize)
        .attr('fill', stat => stat.color)
        .style('outline', 0)
        .attr('y', (stat, i) => i % 7 * size + (margin / 2))
        .attr('x', (stat, i) => Math.floor(i / 7) * size + (margin / 2))
        .attr('title', stat => {
            return `${moment(stat.date).format('ll')} - ${stat.count} tasks`
        })
        .each(function () {
            tippy.one(this, {
                arrow: true,
                duration: 0,
                delay: 0,
            })
        })
}