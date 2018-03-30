import React from 'react'
import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom'

import Auth from './components/Auth'
import Login from './components/Login'
import Logout from './components/Logout'

const App = () => (
  <Auth login={Login}>
    {() => (
      <>
        <Logout />
        <h3>hello {Meteor.user().services.google.email}</h3>
      </>
    )}
  </Auth>
)

Meteor.startup(() => {
  render(<App />, document.getElementById('render'));
})
