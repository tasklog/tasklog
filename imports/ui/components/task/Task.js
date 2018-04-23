import 'react-day-picker/lib/style.css'
import { decode } from 'base-64'
import { formatDate, parseDate } from 'react-day-picker/moment'
import { Meteor } from 'meteor/meteor'
import { notifier } from '/imports/utils/notifications'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import React, { Component } from 'react'
import RescheduleIcon from 'react-icons/lib/fa/ellipsis-h'
import Sortable from '/imports/ui/components/task/Sortable'
import TaskRescheduler from './TaskRescheduler'
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

    onComplete = () => {
        Meteor.call('task.toggle', this.state.task._id)
    }

    onChangeDue = (day) => {
        Meteor.call('task.changeDue', this.state.task._id, day)
        this.setState({ selectedDay: day })
    }

    onDelete = (id) => {
        notifier.confirm('Are you sure you want to delete this task?', () => {
            Meteor.call('task.delete', id)
        })
        document.querySelector('#awn-confirm-ok').focus()
    }

    onTextChange = (event) => {
        Meteor.call('task.setText', this.state.task._id, event.target.value)
    }

    onKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.target.blur()
        }
    }

    reorder = (dragIndex, hoverIndex) => {
        const { tasks } = this.props
        Meteor.call('task.reorder', tasks[dragIndex]._id, tasks[hoverIndex]._id)
    }

    render() {
        const { task, selectedDay } = this.state

        return (
            <Sortable
                index={this.props.task.order}
                id={this.props.task._id}
                reorder={this.reorder}
            >
                {opacity => (
                    <li className='task' style={{ opacity }}>
                        <article tabIndex='0' aria-label={decode(task.text || '')}>
                            <div className='round'>
                                <input
                                    tabIndex='0'
                                    id={`checkbox-${task._id}`}
                                    type='checkbox'
                                    checked={task.status === 'COMPLETE'}
                                    onChange={this.onComplete}
                                />
                                <label htmlFor={`checkbox-${task._id}`}></label>
                            </div>

                            <input
                                type='text'
                                className={task.status === 'COMPLETE' ? 'completed' : ''}
                                value={decode(task.text || '')}
                                onChange={this.onTextChange}
                                onKeyPress={this.onKeyPress}
                            />

                            <div className='spacer' />

                            <span className='date-picker'>
                                Due on &nbsp;
                                <DayPickerInput
                                    formatDate={formatDate}
                                    parseDate={parseDate}
                                    format='LL'
                                    placeholder='Choose Date'
                                    value={selectedDay}
                                    onDayChange={this.onChangeDue}
                                />
                            </span>

                            <span
                                className='delete'
                                aria-label='delete'
                                onClick={() => this.onDelete(task._id)}
                            />

                            <TaskRescheduler task={task}>
                                <RescheduleIcon className='reschedule' />
                            </TaskRescheduler>
                        </article>
                    </li>
                )}
            </Sortable>
        )
    }
}

export default Task