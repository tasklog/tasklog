import React, { Component } from 'react'
import { Tracker } from 'meteor/tracker'

class Auth extends Component {
    state = {
        loggedIn: false,
        loggingIn: false
    }
    componentDidMount() {
        Tracker.autorun(() => {
            this.setState({
                loggedIn: !!Meteor.user(),
                loggingIn: Meteor.loggingIn()
            })
        })
    }
    render() {
        if (this.state.loggingIn) {
            return null
        }
        if (this.state.loggedIn) {
            return this.props.children()
        }
        return <this.props.login />
    }
}

export default Auth