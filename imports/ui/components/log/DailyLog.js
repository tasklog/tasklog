import { dateTitle } from '/imports/utils/time'
import { GoogleApi } from 'meteor/percolate:google-api'
import { Meteor } from 'meteor/meteor'
import AddTask from '/imports/ui/components/task/AddTask'
import Arrows from '/imports/ui/components/page/Arrows'
import moment from 'moment'
import React, { Component } from 'react'
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
        this.setState({ calendarEvents: [] })

        const thisDay = this.state.date
        const nextDay = thisDay.clone().add(1, 'days')

        const { items: calendarEvents } = await GoogleApi.get('calendar/v3/calendars/primary/events', {
            params: {
                timeMin: thisDay.format('YYYY-MM-DDTHH:mm:ssZ'),
                timeMax: nextDay.format('YYYY-MM-DDTHH:mm:ssZ')
            }
        })

        this.setState({ calendarEvents })
    }

    render() {
        return (
            <div>
                <Arrows title={dateTitle('day', this.state.date)} />
                <ul className='log'>
                    <AddTask period='day' {...this.props.match.params} />
                    {this.state.calendarEvents.map(event => (
                        <li className='event' key={event.id}>{event.summary}</li>
                    ))}
                    <Tasks {...this.props.match.params}>
                        {tasks => tasks.map(task => (
                            <Task key={task._id} task={task} tasks={tasks} />
                        ))}
                    </Tasks>
                </ul>
            </div>
        )
    }
}

export default DailyLog