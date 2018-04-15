import React, { Component } from 'react'
import moment from 'moment'

import Title from '/imports/ui/components/page/Title'
import Task from '/imports/ui/components/page/Task'

import Tasks from '/imports/ui/components/account/Tasks'

class WeeklyLog extends Component {
    get title() {
        const { year, week } = this.props.match.params
        const date = moment().day('Sunday').year(year).week(week)
        return `Week of ${date.format('MMMM D, YYYY')}`
    }

    render() {
        return (
            <div>
                <Title>{this.title}</Title>
                <ul className='log'>
                    <Tasks {...this.props.match.params}>
                        {tasks => tasks.map(task => (
                            <Task key={task._id} task={task} />
                        ))}
                    </Tasks>
                </ul>
            </div>
        )
    }
}

export default WeeklyLog