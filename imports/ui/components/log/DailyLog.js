import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'

import Title from '/imports/ui/components/page/Title'
import Task from '/imports/ui/components/page/Task'

import Tasks from '/imports/ui/components/account/Tasks'
import { importGoogleCalendar } from '/imports/utils/gcal'
import moment from 'moment'

class DailyLog extends Component {
    state = {
        isCalendarLoaded: false,
        calendarEvents: []
    }

    async componentDidMount() {
        const cal = await importGoogleCalendar()
        const res = await cal.events.list({ calendarId: 'primary' })
        const { year, month, day } = this.props.match.params
        this.setState({
            calendarEvents: res.result.items.filter(event => {
                return moment(new Date(year, month - 1, day)).isSame(event.start.dateTime, 'day')
            })
        })
    }

    onComplete = (id) => {
        Meteor.call('task.toggle', id)
    }

    render() {
        return (
            <div>
                <Title>March 31, 2018</Title>
                <ul className='log'>
                    {this.state.calendarEvents.map(event => (
                        <li className='event' key={event.id}>{event.summary}</li>
                    ))}
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