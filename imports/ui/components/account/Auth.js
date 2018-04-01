import { withTracker } from 'meteor/react-meteor-data'
import React, { Component } from 'react'

const Auth = (props) => {
    if (props.isLoggedIn) {
        return props.children()
    }
    if (props.isLoggingIn) {
        return null
    }
    if (!props.isLoggingIn && !props.isLoggedIn) {
        return <props.login />
    }
}

export default withTracker(() => {
    return {
        isLoggedIn: !!Meteor.user(),
        isLoggingIn: Meteor.loggingIn()
    }
})(Auth)