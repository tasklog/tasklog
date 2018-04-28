import { dateTitle, weeksOf } from '/imports/utils/time'
import React, { Component } from 'react'
import moment from 'moment'

import Arrows from '/imports/ui/components/page/Arrows'
import AddTask from '/imports/ui/components/task/AddTask'
import Task from '/imports/ui/components/task/Task'

import Tasks from '/imports/ui/components/account/Tasks'


class MonthlyLog extends Component {
    get title() {
        const { year, month } = this.props.match.params
        return dateTitle('month', moment().year(year).month(month - 1))
    }

    render() {
        const { year, month } = this.props.match.params
        const weeks = weeksOf(month - 1, year)
        return (
            <div>
                <Arrows title={this.title} />
                <ul className='log'>
                    {weeks.map((week, i) => (
                        <div key={week.weekNumber}>
                            <p>{`Week of ${week.startDate.format('MMMM D, YYYY')}`}</p>
                            <AddTask period='week' {...this.props.match.params} week={week.weekNumber} />
                            <Tasks {...this.props.match.params} week={week.weekNumber.toString()}>
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

export default MonthlyLog