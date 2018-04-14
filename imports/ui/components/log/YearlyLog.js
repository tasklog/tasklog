import React, { Component } from 'react'

import Title from '/imports/ui/components/page/Title'
import Task from '/imports/ui/components/page/Task'

import Tasks from '/imports/ui/components/account/Tasks'

class YearlyLog extends Component {
    render() {
        return (
            <div>
                <Title>2018</Title>
                <ul className='daily-log'>
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

export default YearlyLog