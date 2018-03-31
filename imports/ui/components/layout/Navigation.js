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
                    <li>
                        <a href='#'>This Year</a>
                    </li>
                    <li>
                        <a href='#'>This Month</a>
                    </li>
                    <li>
                        <a href='#'>Today</a>
                    </li>
                </ul>

                <ul>
                    <li>
                        <a href='#' onClick={logout}>Logout</a>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Navigation