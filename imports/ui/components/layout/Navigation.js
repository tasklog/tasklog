import React, { Component } from 'react'

class Navigation extends Component {
    render() {
        return (
            <nav className='navigation'>
                <ul>
                    <li className='brand'>LOGO</li>
                    <li>This Year</li>
                    <li>This Month</li>
                    <li>Today</li>
                </ul>
            </nav>
        )
    }
}

export default Navigation