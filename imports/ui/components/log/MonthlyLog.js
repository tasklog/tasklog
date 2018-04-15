import React, { Component } from 'react'
import moment from 'moment'

import Title from '/imports/ui/components/page/Title'
import Task from '/imports/ui/components/page/Task'

import Tasks from '/imports/ui/components/account/Tasks'

class MonthlyLog extends Component {
    get title() {
        const { year, month } = this.props.match.params
        return moment().year(year).month(month).format('MMMM YYYY')
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

export default MonthlyLog