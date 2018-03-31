import React, { Component } from 'react'

import { logout } from '../../../utils/auth'

class Navigation extends Component {
    render() {
        return (
            <nav className='navigation'>
                <ul>
                    <li className='profile'>
                        <img src={Meteor.user().services.google.picture} alt='profile image' />
                    </li>
                    <li>This Year</li>
                    <li>This Month</li>
                    <li>Today</li>
                </ul>

                <ul>
                    <li onClick={logout}>Logout</li>
                </ul>
            </nav>
        )
    }
}

export default Navigation