import { dateTitle } from '/imports/utils/time'
import React, { Component } from 'react'
import moment from 'moment'

import Arrows from '/imports/ui/components/page/Arrows'
import AddTask from '/imports/ui/components/task/AddTask'
import Task from '/imports/ui/components/task/Task'

import Tasks from '/imports/ui/components/account/Tasks'

class WeeklyLog extends Component {
    get title() {
        const { year, week } = this.props.match.params
        return dateTitle('week', moment().day('Sunday').year(year).week(week))
    }

    render() {
        return (
            <div>
                <Arrows title={this.title} />
                <ul className='log'>
                    <AddTask period='week' {...this.props.match.params} />
                    <Tasks {...this.props.match.params}>
                        {tasks => tasks.map(task => (
                            <Task key={task._id} task={task} tasks={tasks} />
                        ))}
                    </Tasks>
                </ul>
            </div>
        )
    }
}

export default WeeklyLog