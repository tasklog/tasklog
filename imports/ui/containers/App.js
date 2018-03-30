import React, { Component } from 'react'

import Container from '../components/layout/Container'
import Navigation from '../components/layout/Navigation'
import Page from './Page'

class App extends Component {
    render() {
        return (
            <Container>
                <Navigation />
                <Page />
            </Container>
        )
    }
}

export default App