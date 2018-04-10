import { Meteor } from 'meteor/meteor'
import { Tasks } from '../tasks/tasks'

Meteor.methods({
    'seeds.all'(){
        Tasks.remove({
            userId: Meteor.userId()
        })
        Meteor.call('task.create', 'day', { year: 2018, month: 4, day: 10 })
        Meteor.call('task.create', 'week', { year: 2018, month: 4, day: 12 })
        Meteor.call('task.create', 'month', { year: 2018, month: 4 })
        Meteor.call('task.create', 'year', { year: 2018 })
    }
})