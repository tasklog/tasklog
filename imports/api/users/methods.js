import { Meteor } from 'meteor/meteor'

Meteor.afterAllMethods(() => {
    if (Meteor.userId()) {
        Meteor.users.update(Meteor.userId(), {
            $set: {
                lastActive: new Date()
            }
        })
    }
})