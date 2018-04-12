import { Component } from 'react'
import { Tasks as TasksCollection } from '/imports/api/tasks/tasks'
import { withTracker } from 'meteor/react-meteor-data'
import moment from 'moment'
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

    const day = +props.day
    const week = +props.week
    const month = +props.month
    const year = +props.year

    const query = {}

    if (day) {
        query['scheduled.day'] = day
        query['scheduled.month'] = month
        query['scheduled.year'] = year
    } else if (week) {
        query['scheduled.day'] = { $type: 'double' }
        query['scheduled.week'] = week
        query['scheduled.year'] = year
    } else if (month) {
        const baseMoment = moment().year(year).month(month - 1)
        const firstMoment = baseMoment.clone().date(0)
        const lastMoment = baseMoment.clone().date(baseMoment.daysInMonth())
        query['scheduled.day'] = null
        query['scheduled.week'] = { $gte: firstMoment.week(), $lte: lastMoment.week() }
        query['scheduled.month'] = { $type: 'double' }
        query['scheduled.year'] = year
    } else if (year) {
        query['scheduled.week'] = null
        query['scheduled.month'] = { $type: 'double' }
        query['scheduled.year'] = year
    }

    const tasks = TasksCollection.find(query).fetch()

    return { tasks }
})(Tasks)