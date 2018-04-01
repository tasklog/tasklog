import { Component } from 'react'
import { Tasks as TasksCollection } from '/imports/api/tasks/tasks'
import { withTracker } from 'meteor/react-meteor-data'
import PropTypes from 'prop-types'

const Tasks = props => {
    return props.children(props.tasks)
}

Tasks.propTypes = {
    day: PropTypes.number,
    month: PropTypes.number,
    year: PropTypes.number
}

export default withTracker(props => {
    const query = {}

    Array('day', 'month', 'year').forEach(interval => {
        if (props[interval] !== undefined) {
            query[`scheduled.${interval}`] = +props[interval]
        }
    })

    return {
        tasks: TasksCollection.find(query).fetch()
    }
})(Tasks)