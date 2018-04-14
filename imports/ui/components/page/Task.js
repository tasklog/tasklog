import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'

import Title from '/imports/ui/components/page/Title'

class Task extends Component {
    onComplete = (id) => {
        Meteor.call('task.toggle', id)
    }

    render() {
        const { task } = this.props

        return (
            <li className='task'>
                <div className='round'>
                    <input
                        id={`checkbox-${task._id}`}
                        type='checkbox'
                        checked={task.status === 'COMPLETE'}
                        onChange={() => this.onComplete(task._id)}
                    />
                    <label htmlFor={`checkbox-${task._id}`}></label>
                </div>
                <span className={task.status === 'COMPLETE' ? 'completed' : ''}>
                    {task.text}
                </span>
                <span style={{ float: 'right' }}>×</span>
            </li>
        )
    }
}

export default Task