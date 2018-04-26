import 'react-day-picker/lib/style.css'
import { decode } from 'base-64'
import { formatDate, parseDate } from 'react-day-picker/moment'
import { Meteor } from 'meteor/meteor'
import { notifier } from '/imports/utils/notifications'
import CheckIcon from 'react-icons/lib/io/checkmark'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import DeleteIcon from 'react-icons/lib/io/android-cancel'
import DueDateIcon from 'react-icons/lib/io/android-calendar'
import React, { Component } from 'react'
import RescheduleIcon from 'react-icons/lib/io/android-exit'
import Sortable from '/imports/ui/components/task/Sortable'
import TaskRescheduler from './TaskRescheduler'
import Title from '/imports/ui/components/page/Title'

const IconButton = ({ icon: Icon, label, onClick, className }) => (
    <button className={`icon-button ${className}`} onClick={onClick} aria-label={label}>
        <Icon />
    </button>
)

class Task extends Component {
    liRef = null

    state = {
        pickerOpen: false
    }

    get isComplete() {
        return this.props.task.status === 'COMPLETE'
    }

    onComplete = () => {
        Meteor.call('task.toggle', this.props.task._id)
    }

    onChangeDue = (day) => {
        Meteor.call('task.changeDue', this.props.task._id, day)
    }

    onDelete = (id) => {
        notifier.confirm('Are you sure you want to delete this task?', () => {
            Meteor.call('task.delete', id)
        })
        document.querySelector('#awn-confirm-ok').focus()
    }

    onTextChange = (event) => {
        Meteor.call('task.setText', this.props.task._id, event.target.value)
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

    togglePicker = (event) => {
        event.stopPropagation();
        this.setState(state => ({ pickerOpen: !state.pickerOpen }), () => {
            if (this.state.pickerOpen) {
                this.liRef.querySelector('.DayPickerInput input').focus()
            }
        })
    }

    render() {
        const { task } = this.props
        return (
            <Sortable index={this.props.task.order} id={this.props.task._id} reorder={this.reorder}>
                {opacity => (
                    <li className='task' style={{ opacity }} ref={ref => this.liRef = ref}>
                        <section aria-label={decode(task.text || '')} onKeyDown={e => console.log(e.key)}>

                            <IconButton
                                icon={CheckIcon}
                                className={this.isComplete ? 'complete' : 'incomplete'}
                                label={this.isComplete ? 'mark task as complete' : 'mark task as incomplete'}
                                onClick={this.onComplete}
                            />

                            <input
                                type='text'
                                className={task.status === 'COMPLETE' ? 'completed' : ''}
                                value={decode(task.text || '')}
                                onChange={this.onTextChange}
                                onKeyPress={this.onKeyPress}
                            />

                            {(task.due || this.state.pickerOpen) ? (
                                <span className='date-picker hide-on-mobile'>
                                    Due on &nbsp;
                                    <DayPickerInput
                                        formatDate={formatDate}
                                        parseDate={parseDate}
                                        format='LL'
                                        placeholder='Choose Date'
                                        value={task.due || undefined}
                                        onDayChange={this.onChangeDue}
                                    />
                                </span>
                            ) : (
                                <IconButton
                                    className='hide-on-mobile'
                                    icon={DueDateIcon}
                                    label='select a due date'
                                    onClick={this.togglePicker}
                                />
                            )}

                            <TaskRescheduler task={task}>
                                <IconButton
                                    icon={RescheduleIcon}
                                    label='reschedule'
                                />
                            </TaskRescheduler>

                            <IconButton
                                icon={DeleteIcon}
                                label='delete'
                                onClick={() => this.onDelete(task._id)}
                            />

                        </section>
                    </li>
                )}
            </Sortable>
        )
    }
}

export default Task