import { dateTitle } from '/imports/utils/time'
import React, { Component } from 'react'
import moment from 'moment'

import Arrows from '/imports/ui/components/page/Arrows'
import AddTask from '/imports/ui/components/task/AddTask'
import Task from '/imports/ui/components/task/Task'

import Tasks from '/imports/ui/components/account/Tasks'

class WeeklyLog extends Component {
    get date() {
        const { year, week } = this.props.match.params
        return moment().day('Sunday').year(year).week(week).clone()
    }

    get title() {
        return dateTitle('week', this.date)
    }

    getParamsForDay(i) {
        const date = this.date.add(i, 'day')
        return { day: date.date(), month: date.month() + 1 }
    }

    render() {
        return (
            <div>
                <Arrows title={this.title} />
                <ul className='log'>
                    {moment.weekdays().map((day, i) => (
                        <div key={day}>
                            <p>{day}</p>
                            <AddTask period='day' {...this.props.match.params} {...this.getParamsForDay(i)} />
                            <Tasks {...this.props.match.params} {...this.getParamsForDay(i)}>
                                {tasks => tasks.map(task => (
                                    <Task key={task._id} task={task} tasks={tasks} />
                                ))}
                            </Tasks>
                        </div>
                    ))}
                </ul>
            </div>
        )
    }
}

export default WeeklyLog