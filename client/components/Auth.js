import React, { Component } from 'react'
import { Tracker } from 'meteor/tracker'

class Auth extends Component {
  static defaultProps = {
    showLoginAfter: 250
  }
  state = {
    loggedIn: false,
    displayLogin: false
  }
  componentDidMount() {
    Tracker.autorun(() => {
      const user = Meteor.user()
      this.setState({ loggedIn: !!(user && user.services.google.email) })
    })
    // give small delay so login content does not flash
    setTimeout(() => {
      this.setState({ displayLogin: true })
    }, this.props.showLoginAfter)
  }
  render() {
    if (this.state.loggedIn ) {
      return this.props.children()
    }
    if (!this.state.loggedIn && this.state.displayLogin) {
      return <this.props.login />
    }
    return null
  }
}

export default Auth