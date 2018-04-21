import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Auth from '/imports/ui/components/account/Auth'
import Login from '/imports/ui/components/account/Login'

import Container from '/imports/ui/components/layout/Container'
import Navigation from '/imports/ui/components/layout/Navigation'
import Page from '/imports/ui/containers/Page'

import NoMatch from '/imports/ui/components/page/NoMatch'
import Graph from '/imports/ui/components/layout/Graph'

import DailyLog from '/imports/ui/components/log/DailyLog'
import WeeklyLog from '/imports/ui/components/log/WeeklyLog'
import MonthlyLog from '/imports/ui/components/log/MonthlyLog'
import YearlyLog from '/imports/ui/components/log/YearlyLog'


class App extends Component {
    render() {
        return (
            <Auth login={Login}>
                {() => (
                    <Router>
                        <Container>
                            <Navigation />
                            <Page>
                                <Switch>
                                    <Route exact path='/d/:year/:month/:day' component={DailyLog} />
                                    <Route exact path='/w/:year/:week' component={WeeklyLog} />
                                    <Route exact path='/m/:year/:month' component={MonthlyLog} />
                                    <Route exact path='/y/:year' component={YearlyLog} />
                                    <Route exact path='/graph' component={Graph} />
                                    <Route component={NoMatch} />
                                </Switch>
                            </Page>
                        </Container>
                    </Router>
                )}
            </Auth>
        )
    }
}

export default App