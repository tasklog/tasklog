import { Tasks } from '/imports/api/tasks/tasks'
import { withTracker } from 'meteor/react-meteor-data'
import graph from './graph'
import moment from 'moment'
import random from 'random-seed'
import React, { Component, createRef } from 'react'

class Graph extends Component {
    element = createRef()

    componentDidMount() {
        this.draw()
    }

    componentDidUpdate() {
        this.draw()
    }

    draw() {
        this.element.current.innerHTML = ''
        const { width, height } = this.element.current.getBoundingClientRect()
        graph(this.props.data, this.element.current, width, height)
    }

    render() {
        return (
            <svg style={{ width: '100%', height: '20rem' }} ref={this.element} />
        )
    }
}

export default withTracker(() => {
    const gen = random('⚛︎')
    const data = []

    const date = moment()
    const yearFromNow = date.clone().add(1, 'year')

    while (date < yearFromNow) {
        data.push({
            date: date.format('YYYY-MM-DD'),
            count: Math.max(0, gen.intBetween(-3, 10))
        })
        date.add(1, 'day')
    }

    return { data }
})(Graph)