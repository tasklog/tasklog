import { Meteor } from 'meteor/meteor'
import React, { Component, createRef } from 'react'
import moment from 'moment'
import { createScheduledTimestamp } from '/imports/utils/time'

class AddTask extends Component {
    input = createRef()

    handleSubmit(event) {
        event.preventDefault()

        const text = this.input.current.value.trim()

        const { period, year, month, week, day } = this.props
        const m = moment()

        switch (period) {
            case 'month':
                m.year(year).month(month)
            case 'week':
                m.day('Sunday').month(month)
            case 'day':
                m.date(day)
        }

        Meteor.call('task.create', text, createScheduledTimestamp(period, m))

        this.input.current.value = ''
    }

    render() {
        return (
            <form className='new-task' onSubmit={this.handleSubmit.bind(this)} >
                <input
                    type='text'
                    ref={this.input}
                    placeholder='Type to add a new task'
                />
            </form>
        )
    }
}

export default AddTask