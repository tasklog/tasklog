import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'

import Title from '/imports/ui/components/page/Title'
import Task from '/imports/ui/components/page/Task'

import Tasks from '/imports/ui/components/account/Tasks'

class DailyLog extends Component {
    onComplete = (id) => {
        Meteor.call('task.toggle', id)
    }

    render() {
        return (
            <div>
                <Title>March 31, 2018</Title>
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

export default DailyLog