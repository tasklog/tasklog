import { Meteor } from 'meteor/meteor'
import { Tasks } from '../tasks'

Meteor.publish('tasks', () => {
    return Tasks.find({ userId: Meteor.userId() })
})