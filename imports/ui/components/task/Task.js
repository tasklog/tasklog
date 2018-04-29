import { decode } from 'base-64'
import { formatDate, parseDate } from 'react-day-picker/moment'
import { Meteor } from 'meteor/meteor'
import { notifier } from '/imports/utils/notifications'
import CheckIcon from 'react-icons/lib/io/checkmark'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import DeleteIcon from 'react-icons/lib/io/android-cancel'
import DueDateIcon from 'react-icons/lib/io/android-calendar'
import React, { Component, createRef } from 'react'
import RescheduleIcon from 'react-icons/lib/io/android-exit'
import Sortable from '/imports/ui/components/task/Sortable'
import TaskRescheduler from './TaskRescheduler'
import Title from '/imports/ui/components/page/Title'
import tippy from 'tippy.js'

class IconButton extends Component {
    button = createRef()
    componentDidMount() {
        if (!this.props.noTooltip) {
            tippy.one(this.button.current)
        }
    }
    render() {
        return (
            <button
                ref={this.button}
                className={`icon-button ${this.props.className}`}
                onClick={this.props.onClick}
                title={this.props.label}
                aria-label={this.props.label}
            >
                <this.props.icon />
            </button>
        )
    }
}

class Task extends Component {
    liRef = null

    state = {
        pickerOpen: false,
        reschedulerOpen: false
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

    reorderOnArrow = ({ key }) => {
        const { task, tasks } = this.props

        if (key === 'ArrowUp' && !!tasks[task.order - 1]) {
            Meteor.call('task.reorder', tasks[task.order - 1]._id, task._id)
        }

        if (key === 'ArrowDown' && !!tasks[task.order + 1]) {
            Meteor.call('task.reorder', task._id, tasks[task.order + 1]._id)
        }
    }

    togglePicker = (event) => {
        event.stopPropagation();
        this.setState(state => ({ pickerOpen: !state.pickerOpen }), () => {
            if (this.state.pickerOpen) {
                this.liRef.querySelector('.DayPickerInput input').focus()
            }
        })
    }

    handleRescheduleOpen = () => {
        this.setState({ reschedulerOpen: true })
    }

    handleRescheduleSave = (timestamp) => {
        this.setState({ reschedulerOpen: false }, () => {
            setTimeout(() => {
                Meteor.call('task.reschedule', this.props.task._id, timestamp)
            }, 250)
        })
    }

    handleRescheduleCancel = () => {
        this.setState({ reschedulerOpen: false })
    }

    render() {
        const { task } = this.props
        return (
            <Sortable index={this.props.task.order} id={this.props.task._id} reorder={this.reorder}>
                {opacity => (
                    <li className='task' style={{ opacity }} ref={ref => this.liRef = ref}>
                        <section aria-label={decode(task.text || '')} onKeyDown={this.reorderOnArrow}>

                            <IconButton
                                icon={CheckIcon}
                                className={this.isComplete ? 'complete' : 'incomplete'}
                                label={this.isComplete ? 'mark task as complete' : 'mark task as incomplete'}
                                onClick={this.onComplete}
                                noTooltip
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
                                    label='Due Date'
                                    onClick={this.togglePicker}
                                />
                            )}

                            <TaskRescheduler
                                open={this.state.reschedulerOpen}
                                onSave={this.handleRescheduleSave}
                                onCancel={this.handleRescheduleCancel}
                            >
                                <IconButton
                                    icon={RescheduleIcon}
                                    label='Reschedule'
                                    onClick={this.handleRescheduleOpen}
                                />
                            </TaskRescheduler>

                            <IconButton
                                icon={DeleteIcon}
                                label='Delete'
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