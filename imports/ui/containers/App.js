import React, { Component } from 'react'

import Auth from '../components/account/Auth'
import Login from '../components/account/Login'
import Logout from '../components/account/Logout'

import Container from '../components/layout/Container'
import Navigation from '../components/layout/Navigation'
import Page from './Page'

class App extends Component {
    render() {
        return (
            <Auth login={Login}>
                {() => (
                    <Container>
                        <Logout />
                        <h3>hello {Meteor.user().services.google.email}</h3>
                        <Navigation />
                        <Page />
                    </Container>
                )}
            </Auth>
        )
    }
}

export default App