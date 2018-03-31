import React, { Component } from 'react'

import Day from '/imports/ui/components/log/Day'
import TaskList from '/imports/ui/placeholders/TaskList'

class Page extends Component {
    render() {
        return (
            <div className='page'>
                <Day />
                <TaskList />
            </div>
        )
    }
}

export default Page