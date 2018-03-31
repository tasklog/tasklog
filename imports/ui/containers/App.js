import React, { Component } from 'react'

import Auth from '/imports/ui/components/account/Auth'
import Login from '/imports/ui/components/account/Login'

import Container from '/imports/ui/components/layout/Container'
import Navigation from '/imports/ui/components/layout/Navigation'
import Page from '/imports/ui/containers/Page'

class App extends Component {
    render() {
        return (
            <Auth login={Login}>
                {() => (
                    <Container>
                        <Navigation />
                        <Page />
                    </Container>
                )}
            </Auth>
        )
    }
}

export default App