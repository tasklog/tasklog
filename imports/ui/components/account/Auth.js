import { withTracker } from 'meteor/react-meteor-data'
import has from 'lodash.has'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

const Auth = (props) => {
    if (!props.isLoggedIn) {
        return React.createElement(props.login)
    }
    if (props.isLoggingIn) {
        return props.loading ? React.createElement(props.loading) : null
    }
    return props.children()
}

Auth.propTypes = {
    login: PropTypes.func.isRequired,
    loading: PropTypes.func
}

export default withTracker(() => {
    Meteor.subscribe('userData')
    const user = Meteor.user()
    const isLoggedIn = has(user, 'services.google.accessToken')
    return {
        isLoggedIn,
        isLoggingIn: Meteor.loggingIn() || (user && !isLoggedIn)
    }
})(Auth)