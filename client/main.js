import React from 'react'
import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom'

import App from '/imports/ui/containers/App'

import '/imports/api/tasks/methods'

Meteor.startup(() => {
    render(<App />, document.getElementById('render'))
})
