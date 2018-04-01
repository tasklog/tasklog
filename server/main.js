import { Meteor } from 'meteor/meteor'

import '/imports/api/tasks/methods'
import '/imports/api/tasks/server/publications'
import '/imports/api/users/server/publications'

Meteor.startup(() => {
    if (!ServiceConfiguration.configurations.findOne({ service: 'google' })) {
        ServiceConfiguration.configurations.insert({
            service: 'google',
            clientId: '1026154799197-2fht9b4u943775lmaokpi8ijk8boio19.apps.googleusercontent.com',
            loginStyle: 'popup',
            secret: 'SDrISTVcyKLDQiZmHzyRae4C'
        })
    }
})
