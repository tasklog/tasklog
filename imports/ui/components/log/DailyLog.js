import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import moment from 'moment'

import { importGoogleCalendar } from '/imports/utils/gcal'

import Title from '/imports/ui/components/page/Title'
import AddTask from '/imports/ui/components/task/AddTask'
import Task from '/imports/ui/components/task/Task'
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
        // const cal = await importGoogleCalendar()
        // const thisDay = this.state.date
        // const nextDay = thisDay.clone().add(1, 'days')

        // const res = await cal.events.list({
        //     calendarId: 'primary',
        //     timeMin: thisDay.format('YYYY-MM-DDTHH:mm:ssZ'),
        //     timeMax: nextDay.format('YYYY-MM-DDTHH:mm:ssZ')
        // })

        // this.setState({
        //     calendarEvents: res.result.items
        // })
    }
    render() {
        return (
            <div>
                <Title>{this.state.date.format('MMMM D, YYYY')}</Title>
                <ul className='log'>
                    <AddTask period='day' {...this.props.match.params} />
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