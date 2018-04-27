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

    const squares = parent.append('g')
    const text = parent.append('g')

    squares
        .selectAll('rect')
        .data(stats)
        .enter()
        .append('rect')
        .attr('width', visibleSize)
        .attr('height', visibleSize)
        .attr('fill', stat => stat.color)
        .style('outline', 0)
        .attr('y', (stat, i) => i % 7 * size + (margin / 2) + 20)
        .attr('x', (stat, i) => Math.floor(i / 7) * size + (margin / 2))
        .attr('title', stat => {
            const s = stat.count === 1 ? '' : 's'
            return `${moment(stat.date).format('ll')}<br><strong>${stat.count} task${s} completed</strong>`
        })
        .each(function (stat) {
            tippy.one(this, {
                arrow: true,
                duration: 0,
                delay: 0,
            })
            if (moment(stat.date).date() === Math.floor(moment(stat.date).daysInMonth() / 2)) {
                text
                    .append('text')
                    .style('text-anchor', 'middle')
                    .style('font-size', '13px')
                    .text(moment(stat.date).format('MMM'))
                    .attr('fill', 'rgba(0,0,0,0.33)')
                    .attr('x', +d3.select(this).attr('x') + size / 2)
                    .attr('y', 10)
            }
        })
}