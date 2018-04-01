import React from 'react'
import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom'

import App from '/imports/ui/containers/App'
import { Tracker } from 'meteor/tracker'

Meteor.startup(() => {
    Tracker.autorun(() => {
        console.log(Meteor.loggingIn())
    })
    render(<App />, document.getElementById('render'))
})
