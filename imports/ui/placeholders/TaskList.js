import React, { Component } from 'react'
import Tasks from '../components/account/Tasks'

class TaskList extends Component {
    submit = (event) => {
        event.preventDefault()
        Meteor.call('task.create', event.target.text.value)
        event.target.reset()
    }
    click = (id) => {
        Meteor.call('task.delete', id)
    }
    render() {
        return (
            <form onSubmit={this.submit}>
                <input type='text' name='text' placeholder='Enter task text' />
                <button type='submit'>Create Task</button>
                <ul>
                    <Tasks>
                        {tasks => tasks.map(task => (
                            <li key={task._id} onClick={() => this.click(task._id)}>
                                {task.text}
                            </li>
                        ))}
                    </Tasks>
                </ul>
            </form>
        )
    }
}

export default TaskList