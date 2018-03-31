import { Meteor } from 'meteor/meteor'

Meteor.startup(() => {
    ServiceConfiguration.configurations.insert({
        service: 'google',
        clientId: '1026154799197-2fht9b4u943775lmaokpi8ijk8boio19.apps.googleusercontent.com',
        loginStyle: 'popup',
        secret: 'SDrISTVcyKLDQiZmHzyRae4C'
    })
})
