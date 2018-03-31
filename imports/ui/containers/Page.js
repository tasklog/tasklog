import React, { Component } from 'react'

import Day from '/imports/ui/components/log/Day'

class Page extends Component {
    render() {
        return (
            <div className='page'>
                <Day />
            </div>
        )
    }
}

export default Page