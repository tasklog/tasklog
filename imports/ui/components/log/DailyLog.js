import { Meteor } from 'meteor/meteor'
import moment from 'moment'
import React, { Component } from 'react'

import { importGoogleCalendar } from '/imports/utils/gcal'

import Title from '/imports/ui/components/page/Title'
import Task from '/imports/ui/components/page/Task'
import Tasks from '/imports/ui/components/account/Tasks'

class DailyLog extends Component {
    state = {
        calendarEvents: []
    }
    static getDerivedStateFromProps(props) {
        const { year, month, day } = props.match.params
        return {
            date: moment(new Date(year, month - 1, day))
        }
    }
    componentDidMount() {
        this.getEvents()
    }
    componentDidUpdate(props, state) {
        if (!this.state.date.isSame(state.date)) {
            this.getEvents()
        }
    }
    getEvents = async () => {
        const cal = await importGoogleCalendar()
        const res = await cal.events.list({ calendarId: 'primary' })
        this.setState({
            calendarEvents: res.result.items.filter(event => {
                if (!event.start) return false
                return this.state.date.isSame(event.start.dateTime, 'day')
            })
        })
    }
    render() {
        return (
            <div>
                <Title>{this.state.date.format('MMMM D, YYYY')}</Title>
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