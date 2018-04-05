import { Meteor } from 'meteor/meteor'
import { Tasks } from '../tasks/tasks'

Meteor.methods({
    'seeds.all'(){
        Tasks.remove({
            userId: Meteor.userId()
        })
        Meteor.call('task.create', 'Buy milk')
        Meteor.call('task.create', 'Get gas')
        Meteor.call('task.create', 'Do work')
        Meteor.call('task.create', 'Rest')
    }
})