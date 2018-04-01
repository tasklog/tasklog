import { Meteor } from 'meteor/meteor'

Meteor.publish('userData', () => {
    return Meteor.users.find({ _id: Meteor.userId() })
})