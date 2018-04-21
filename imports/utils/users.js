import { Meteor } from 'meteor/meteor'

export function findLastActiveUser() {
    return Meteor.users.findOne({}, {
        sort: {
            lastActive: -1
        }
    })
}