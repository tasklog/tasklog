import { Component } from 'react'
import { Tasks as TasksCollection } from '/imports/api/tasks/tasks'
import { Tracker } from 'meteor/tracker'
import PropTypes from 'prop-types'

class Tasks extends Component {
    static propTypes = {
        day: PropTypes.number,
        month: PropTypes.number,
        year: PropTypes.number
    }
    state = {
        tasks: []
    }
    componentDidMount() {
        this.tracker = Tracker.autorun(() => {
            const query = {}
            Array('day', 'month', 'year').forEach(interval => {
                if (this.props[interval] !== undefined) {
                    query[`scheduled.${interval}`] = +this.props[interval]
                }
            })
            this.setState({ tasks: TasksCollection.find(query).fetch() })
        })
    }
    componentWillUnmount() {
        this.tracker.stop()
    }
    render() {
        console.log(this.state.tasks)
        return this.props.children(this.state.tasks)
    }
}

export default Tasks