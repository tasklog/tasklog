import { withTracker } from 'meteor/react-meteor-data'
import { Tasks } from '/imports/api/tasks/tasks'
import React, { Component, createRef } from 'react'
import moment from 'moment'
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory'

const Graph = (props) => (
    <VictoryChart theme={VictoryTheme.material}>
        <VictoryLine
            style={{
                data: { stroke: "#c43a31" },
                parent: { border: "1px solid #ccc"}
            }}
            data={props.tasks}
        />
    </VictoryChart>
)

export default withTracker(() => {
    Meteor.subscribe('tasks')

    const taskMap = Tasks
        .find({
            status: 'COMPLETE',
            completed: {
                $gt: moment().add(-1, 'month').toDate(),
                $lt: moment().toDate()
            }
        })
        .fetch()
        .reduce((dates, task) => {
            const date = moment(task.completed).format('YYYY-MM-DD')
            const count = (dates[date] || 0) + 1
            return { ...dates, [date]: count }
        }, {})

    const tasks = Object
        .entries(taskMap)
        .sort((a, b) => {
            return a[0] - b[0]
        })
        .map(([ x, y ]) => {
            return { x, y: moment(y).toDate() }
        })

    return { tasks }
})(Graph)