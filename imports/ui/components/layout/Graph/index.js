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
            <div className='your-productivity'>
                <h2>Your Productivity</h2>
                <figure aria-label='A log visualizing the number of tasks completed per day'>
                    <svg aria-hidden style={{ width: '100%', height: '20rem' }} ref={this.element} />
                </figure>
            </div>
        )
    }
}

export default withTracker(() => {
    Meteor.subscribe('tasks')

    const date = moment()
    const data = []

    const total = 371
    const daysFromEnd = 6 - date.day()
    const numberDays = total - daysFromEnd

    date.subtract(numberDays, 'days')

    for (let i = 0; i < numberDays; i++) {
        date.add(1, 'day')
        const count = Tasks.find({
            completed: {
                $gte: date.clone().hour(0).minute(0).second(0).toDate(),
                $lt: date.clone().add(1, 'day').hour(0).minute(0).second(0).toDate()
            }
        }).count()
        data.push({ date: date.format('YYYY-MM-DD'), count })
    }

    return { data }
})(Graph)