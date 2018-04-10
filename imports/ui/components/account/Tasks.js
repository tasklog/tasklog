import { Component } from 'react'
import { Tasks as TasksCollection } from '/imports/api/tasks/tasks'
import { withTracker } from 'meteor/react-meteor-data'
import PropTypes from 'prop-types'

const Tasks = props => {
    return props.children(props.tasks)
}

Tasks.propTypes = {
    day: PropTypes.string,
    month: PropTypes.string,
    year: PropTypes.string,
    week: PropTypes.string
}

export default withTracker(props => {
    Meteor.subscribe('tasks')
    const query = {}

    const day = +props.day
    const week = +props.week
    const month = +props.month
    const year = +props.year

    if (props.day) {
        query['scheduled.day'] = day
        query['scheduled.month'] = month
        query['scheduled.year'] = year
    } else if (props.week) {
        console.log('week')
        // TODO: move this to utils
        const yearStart = new Date(Date.UTC(year, 0, 1))
        const days = ((week - 1) * 7) - yearStart.getUTCDay()
        const newDate = new Date(yearStart.setUTCDate(yearStart.getUTCDate() + days))
        query['scheduled.day'] = {
            $gte: newDate.getUTCDate(),
            $lt: newDate.getUTCDate() + 7
        }
        query['scheduled.month'] = newDate.getUTCMonth() + 1
        query['scheduled.year'] = year
    } else if (props.month) {
        query['scheduled.day'] = null
        query['scheduled.month'] = month
        query['scheduled.year'] = year
    } else if (props.year) {
        query['scheduled.day'] = null
        query['scheduled.month'] = null
        query['scheduled.year'] = year
    }

    console.log(query)
    return {
        tasks: TasksCollection.find(query).fetch()
    }
})(Tasks)