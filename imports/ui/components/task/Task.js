import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'

import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
import { formatDate, parseDate } from 'react-day-picker/moment'

import Title from '/imports/ui/components/page/Title'

class Task extends Component {
    state = {
        task: {},
        selectedDay: undefined
    }

    static getDerivedStateFromProps(props) {
        return {
            task: props.task,
            selectedDay: props.task.due !== null ? props.task.due : undefined
        }
    }

    onComplete = (id) => {
        Meteor.call('task.toggle', id)
    }

    onChangeDue = (day) => {
        Meteor.call('task.changeDue', this.state.task._id, day)
        this.setState({ selectedDay: day })
    }

    onDelete = (id) => {
        Meteor.call('task.delete', id)
    }

    render() {
        const { task, selectedDay } = this.state

        return (
            <li className='task'>
                <span>{task.order}</span>
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

                <span className='right'>
                    Due on &nbsp;
                    <DayPickerInput
                        formatDate={formatDate}
                        parseDate={parseDate}
                        format='LL'
                        placeholder='Choose Date'
                        value={selectedDay}
                        onDayChange={this.onChangeDue}
                    />
                    <span className='delete' aria-label='delete' onClick={() => this.onDelete(task._id)} />
                </span>
            </li>
        )
    }
}

export default Task