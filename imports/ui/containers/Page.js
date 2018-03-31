import React, { Component } from 'react'
import Tasks from '../components/account/Tasks'

class Page extends Component {
    render() {
        return (
            <div className='page'>
                {/* BEGIN EXAMPLE (remove if wanted) */}
                <ul>
                    <Tasks>
                        {tasks => tasks.map(task => (
                            <li key={task._id}>
                                {task.text}
                            </li>
                        ))}
                    </Tasks>
                </ul>
                {/* END EXAMPLE */}
            </div>
        )
    }
}

export default Page