import { Meteor } from 'meteor/meteor'

Meteor.publish('userData', () => {
    return Meteor.users.find({ _id: Meteor.userId() })
})

Meteor.publish(null, () => {
    return Meteor.users.find(this.userId, { fields: {
        'services.google.accessToken': 1,
        'services.google.expiresAt': 1
    }})
})