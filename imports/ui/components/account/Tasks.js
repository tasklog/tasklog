import { buildScheduledQuery } from '/imports/utils/time'
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

    const query = buildScheduledQuery({ day, week, month, year })
    const options = {
        sort: {
            order: 1
        }
    }
    const tasks = TasksCollection.find(query, options).fetch()

    return { tasks }
})(Tasks)