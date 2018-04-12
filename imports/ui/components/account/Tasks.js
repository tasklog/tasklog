import { Component } from 'react'
import { Tasks as TasksCollection } from '/imports/api/tasks/tasks'
import { withTracker } from 'meteor/react-meteor-data'
import PropTypes from 'prop-types'

const Tasks = props => {
    return props.children(props.tasks)
}

Tasks.propTypes = {
    date: PropTypes.string,
    month: PropTypes.string,
    year: PropTypes.string,
    week: PropTypes.string
}

export default withTracker(props => {
    Meteor.subscribe('tasks')

    const query = {}

    if (props.day) {

    } else if (props.week) {

    } else if (props.month) {

    } else if (props.year) {

    }

    return { tasks: TasksCollection.find(query).fetch() }
})(Tasks)