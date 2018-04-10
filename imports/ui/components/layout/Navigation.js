import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { logout } from '/imports/utils/auth'
import { getDates } from '/imports/utils/date'

class Navigation extends Component {
    render() {
        const { day, week, month, year } = getDates()

        return (
            <nav className='navigation'>
                <ul>
                    <li className='profile'>
                        <img src={Meteor.user().services.google.picture} alt='profile image' />
                    </li>
                    <li>
                        <Link to={`/y/${year}`}>
                            This Year
                        </Link>
                    </li>
                    <li>
                        <Link to={`/m/${year}/${month}`}>
                            This Month
                        </Link>
                    </li>
                    <li>
                        <Link to={`/w/${year}/${week}`}>
                            This Week
                        </Link>
                    </li>
                    <li>
                        <Link to={`/w/${year}/${month}/${day}`}>
                            Today
                        </Link>
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