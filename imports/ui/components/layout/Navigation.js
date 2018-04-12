import { Link } from 'react-router-dom'
import React, { Component } from 'react'

import { logout } from '/imports/utils/auth'
import moment from 'moment'

const Navigation = () => (
    <nav className='navigation'>
        <ul>
            <li className='profile'>
                <img src={Meteor.user().services.google.picture} alt='profile image' />
            </li>
            <li>
                <Link to={`/y/${moment().year()}`}>
                    This Year
                </Link>
            </li>
            <li>
                <Link to={`/m/${moment().year()}/${moment().month() + 1}`}>
                    This Month
                </Link>
            </li>
            <li>
                <Link to={`/w/${moment().year()}/${moment().week()}`}>
                    This Week
                </Link>
            </li>
            <li>
                <Link to={`/d/${moment().year()}/${moment().month() + 1}/${moment().date()}`}>
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

export default Navigation