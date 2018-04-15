import React, { Component } from 'react'
import moment from 'moment'

import Title from '/imports/ui/components/page/Title'
import AddTask from '/imports/ui/components/task/AddTask'
import Task from '/imports/ui/components/task/Task'

import Tasks from '/imports/ui/components/account/Tasks'

class YearlyLog extends Component {
    render() {
        return (
            <div>
                <Title>{this.props.match.params.year}</Title>
                <ul className='log'>
                    {moment.months().map((name, number) => (
                        <div key={number}>
                            <p>{name}</p>
                            <AddTask period='month' {...this.props.match.params} month={number.toString()} />
                            <Tasks {...this.props.match.params} month={number.toString()}>
                                {tasks => tasks.map(task => (
                                    <Task key={task._id} task={task} />
                                ))}
                            </Tasks>
                        </div>
                    ))}
                </ul>
            </div>
        )
    }
}

export default YearlyLog