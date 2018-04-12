import { Meteor } from 'meteor/meteor'
import { Tasks } from '../tasks/tasks'

Meteor.methods({
    'seeds.all'(){
        Tasks.remove({ userId: Meteor.userId() })
        Meteor.call('task.create', 'today', { year: 2018, month: 4, week: 15, day: 12 })
        Meteor.call('task.create', 'tomorrow', { year: 2018, month: 4, week: 15, day: 13 })
        Meteor.call('task.create', 'this week', { year: 2018, month: 4, week: 15 })
        Meteor.call('task.create', 'next week', { year: 2018, month: 4, week: 16 })
        Meteor.call('task.create', 'a week in last month whose week ends in this month', { year: 2018, month: 3, week: 13 })
        Meteor.call('task.create', 'a week in next month whose week starts in this month', { year: 2018, month: 5, week: 16 })
        Meteor.call('task.create', 'this month', { year: 2018, month: 4 })
        Meteor.call('task.create', 'next month', { year: 2018, month: 5 })
    }
})