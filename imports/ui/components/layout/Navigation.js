import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { logout } from '/imports/utils/auth'
import moment from 'moment'

class Navigation extends Component {
    state = { isActive: false }

    showMobileNav = () => {
        this.setState({ isActive: true })
    }

    hideMobileNav = () => {
        this.setState({ isActive: false })
    }

    render() {
        return (
            <div className='navigation'>
                <a className='open hide-on-desktop' onClick={this.showMobileNav}>&#9776; Menu</a>

                <nav className={`nav-menu ${this.state.isActive ? 'active' : null}`}>
                    <a className='close hide-on-desktop' onClick={this.hideMobileNav}>&times;</a>
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
            </div>
        )
    }
}

export default Navigation