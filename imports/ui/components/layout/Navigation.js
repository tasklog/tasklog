import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

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
                            <NavLink className='navlink' to={`/y/${moment().year()}`}>
                                This Year
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className='navlink' to={`/m/${moment().year()}/${moment().month() + 1}`}>
                                This Month
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className='navlink' to={`/w/${moment().year()}/${moment().week()}`}>
                                This Week
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className='navlink' to={`/d/${moment().year()}/${moment().month() + 1}/${moment().date()}`}>
                                Today
                            </NavLink>
                        </li>
                    </ul>

                    <ul>
                        <li>
                            <NavLink className='navlink' to={`/productivity`}>
                                Your Productivity
                            </NavLink>
                        </li>
                        <li>
                            <a href='#' className='navlink' onClick={logout}>Logout</a>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default Navigation